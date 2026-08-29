#!/usr/bin/env python3
"""
Unit and Integration Test Suite for Antigravity SDLC OS v2 Engine
================================================================
Tests phase registry, command normalization, template generation,
gatekeeper validation, presets, CLI commands, and skill link integrity.
"""

import sys
import os
import io
import json
import unittest
import tempfile
from pathlib import Path
from unittest.mock import patch

# Add parent directory to sys.path to import engine
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
import engine


class TestPhaseRegistry(unittest.TestCase):
    """Test registry completeness, indexing, and command normalization."""

    def test_phases_count(self):
        """Must have exactly 10 phases numbered 0 to 9."""
        self.assertEqual(len(engine.PHASES), 10)
        for idx, p in enumerate(engine.PHASES):
            self.assertEqual(p["phase"], idx)
            self.assertTrue(p["command"].startswith("/"))
            self.assertTrue(len(p["name"]) > 0)
            self.assertTrue(len(p["presets"]) > 0)
            self.assertTrue(len(p["flags"]) > 0)

    def test_normalize_commands(self):
        """Verify normalization of aliases, numbers, and slashed commands."""
        test_cases = [
            ("0", "brainstorm"),
            ("/brainstorm", "brainstorm"),
            ("brainstorm", "brainstorm"),
            ("ideation", "brainstorm"),
            ("1", "analyze"),
            ("/analyze", "analyze"),
            ("requirement-analysis", "analyze"),
            ("2", "proj-init"),
            ("/proj-init", "proj-init"),
            ("project_init_agile", "proj-init"),
            ("3", "ui-ux"),
            ("/ui-ux", "ui-ux"),
            ("ui-ux-promax", "ui-ux"),
            ("4", "design"),
            ("/design", "design"),
            ("system-design", "design"),
            ("5", "plan"),
            ("/plan", "plan"),
            ("agile-plan-engineering", "plan"),
            ("6", "build"),
            ("/build", "build"),
            ("code-generation", "build"),
            ("7", "test"),
            ("/test", "test"),
            ("qa", "test"),
            ("production-testing", "test"),
            ("8", "debug"),
            ("/debug", "debug"),
            ("auto-debug", "debug"),
            ("9", "publish"),
            ("/publish", "publish"),
            ("devops", "publish"),
            ("publish-skill", "publish"),
        ]
        for inp, expected in test_cases:
            with self.subTest(inp=inp, expected=expected):
                self.assertEqual(engine.normalize_cmd(inp), expected)

    def test_get_phase_by_id(self):
        """Verify fetching phase metadata by ID or alias."""
        p0 = engine.get_phase_by_id("/brainstorm")
        self.assertIsNotNone(p0)
        self.assertEqual(p0["id"], "brainstorm")

        p3 = engine.get_phase_by_id("ui-ux-promax")
        self.assertIsNotNone(p3)
        self.assertEqual(p3["id"], "ui-ux")

        invalid = engine.get_phase_by_id("non_existent_phase")
        self.assertIsNone(invalid)


class TestTemplateGeneration(unittest.TestCase):
    """Test starter template generation across all 10 phases."""

    def test_all_10_templates_exist(self):
        """Ensure all 10 canonical phases have markdown templates."""
        for p in engine.PHASES:
            phase_id = p["id"]
            self.assertIn(phase_id, engine.TEMPLATES)
            template = engine.TEMPLATES[phase_id]
            self.assertTrue(len(template) > 300)
            self.assertIn("# ", template)
            self.assertIn("## ", template)

    def test_generate_template_to_file(self):
        """Test template generator writing to a file with variable substitutions."""
        with tempfile.TemporaryDirectory() as tmpdir:
            out_file = Path(tmpdir) / "test_design.md"
            engine.generate_template("design", str(out_file), project_name="KhuNyiKalSalApp")
            self.assertTrue(out_file.exists())
            content = out_file.read_text(encoding="utf-8")
            self.assertIn("KhuNyiKalSalApp", content)
            self.assertIn("CREATE TABLE", content)


class TestGatekeeperValidation(unittest.TestCase):
    """Test 10-point gatekeeper validation on artifacts."""

    def test_generated_templates_pass_validation(self):
        """All built-in templates must score >= 70 and be APPROVED."""
        with tempfile.TemporaryDirectory() as tmpdir:
            for p in engine.PHASES:
                phase_id = p["id"]
                out_file = Path(tmpdir) / f"{phase_id}.md"
                engine.generate_template(phase_id, str(out_file), project_name="KhuNyiTest")
                
                # Test validate function directly
                approved = engine.validate_artifact(phase_id, str(out_file), as_json=False)
                self.assertTrue(approved, f"Phase {phase_id} failed gatekeeper validation")

    def test_json_validation_output(self):
        """Verify JSON output mode for CI/CD pipelines."""
        with tempfile.TemporaryDirectory() as tmpdir:
            out_file = Path(tmpdir) / "brainstorm.md"
            engine.generate_template("brainstorm", str(out_file), project_name="KhuNyiTest")

            saved_stdout = sys.stdout
            try:
                sys.stdout = io.StringIO()
                approved = engine.validate_artifact("brainstorm", str(out_file), as_json=True)
                output = sys.stdout.getvalue()
                data = json.loads(output)
                self.assertTrue(approved)
                self.assertEqual(data["score"], 100)
                self.assertTrue(data["approved"])
                self.assertEqual(len(data["checks"]), 8)
            finally:
                sys.stdout = saved_stdout

    def test_missing_file_validation(self):
        """Validation on non-existent file must fail gracefully."""
        approved = engine.validate_artifact("design", "/path/does/not/exist.md", as_json=False)
        self.assertFalse(approved)


class TestSkillsIntegrity(unittest.TestCase):
    """Verify markdown skill files and link integrity."""

    def test_all_skill_files_exist_on_disk(self):
        """All skill files declared in registry must exist."""
        for p in engine.PHASES:
            skill_path = engine.SKILLS_DIR / p["file"]
            self.assertTrue(skill_path.exists(), f"Skill file {skill_path} does not exist")

    def test_zero_hardcoded_user_links(self):
        """Ensure zero references to local user home directories in any markdown file."""
        skills_dir = engine.SKILLS_DIR
        for root, dirs, files in os.walk(skills_dir):
            for file in files:
                if file.endswith(".md"):
                    fp = Path(root) / file
                    content = fp.read_text(encoding="utf-8", errors="ignore")
                    self.assertNotIn("Users/linlinaung", content, f"Hardcoded path in {fp}")
                    self.assertNotIn("Skill_Set_Train", content, f"Hardcoded path in {fp}")


class TestCLIOutputs(unittest.TestCase):
    """Test CLI commands list, pipeline, presets, audit."""

    def test_list_skills(self):
        saved_stdout = sys.stdout
        try:
            sys.stdout = io.StringIO()
            engine.list_skills()
            out = sys.stdout.getvalue()
            self.assertIn("Phase 0: /brainstorm", out)
            self.assertIn("Phase 9: /publish", out)
        finally:
            sys.stdout = saved_stdout

    def test_show_pipeline(self):
        saved_stdout = sys.stdout
        try:
            sys.stdout = io.StringIO()
            engine.show_pipeline()
            out = sys.stdout.getvalue()
            self.assertIn("SDLC CONTROL PLANE", out)
            self.assertIn("/brainstorm", out)
            self.assertIn("/publish", out)
        finally:
            sys.stdout = saved_stdout

    def test_show_presets(self):
        saved_stdout = sys.stdout
        try:
            sys.stdout = io.StringIO()
            engine.show_presets("brainstorm")
            out = sys.stdout.getvalue()
            self.assertIn("EMERGENCY_SOS", out)
            self.assertIn("KhuNyiKalSal Emergency SOS", out)
        finally:
            sys.stdout = saved_stdout

    def test_audit_workspace(self):
        saved_stdout = sys.stdout
        try:
            sys.stdout = io.StringIO()
            engine.audit_workspace(str(engine.ROOT_DIR))
            out = sys.stdout.getvalue()
            self.assertIn("SDLC OS v2 - WORKSPACE HEALTH & PHASE AUDIT", out)
            self.assertIn("Antigravity Customization Integrity", out)
        finally:
            sys.stdout = saved_stdout


if __name__ == "__main__":
    unittest.main()
