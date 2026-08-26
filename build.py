import os

PAGES = [
    {"id": "index", "title": "Home", "file": "index.html"},
    {"id": "getting-started", "title": "Getting Started", "file": "getting-started.html"},
    {"id": "how-to-use", "title": "How to Use", "file": "how-to-use.html"},
    {"id": "features", "title": "Features", "file": "features.html"},
    {"id": "account-profile", "title": "Account & Profile", "file": "account-profile.html"},
    {"id": "permissions", "title": "Permissions", "file": "permissions.html"},
    {"id": "safety-guide", "title": "Safety Guide", "file": "safety-guide.html"},
    {"id": "emergency-information", "title": "Emergency Information", "file": "emergency-information.html"},
    {"id": "faq", "title": "FAQ", "file": "faq.html"},
    {"id": "about", "title": "About Us", "file": "about.html"},
    {"id": "troubleshooting", "title": "Troubleshooting", "file": "troubleshooting.html"},
    {"id": "contact-support", "title": "Contact Support", "file": "contact-support.html"}
]

SIDEBAR_GROUPS = [
    {"title": "DOCUMENTATION", "items": ["getting-started", "how-to-use", "features", "account-profile", "permissions"]},
    {"title": "SAFETY", "items": ["safety-guide", "emergency-information"]},
    {"title": "HELP", "items": ["faq", "troubleshooting", "contact-support"]}
]

def render_sidebar(current_id):
    links = ""
    for group in SIDEBAR_GROUPS:
        links += f'<h6 class="px-3 mt-4 mb-2 fw-bold text-muted text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.5px;">{group["title"]}</h6>\n'
        for item_id in group["items"]:
            p = next(page for page in PAGES if page["id"] == item_id)
            active = "active" if p['id'] == current_id else ""
            links += f'<a class="nav-link {active}" href="{p["file"]}">{p["title"]}</a>\n'
    return links

def render_breadcrumbs(current_title):
    if current_title == "Home":
        return ""
    return f"""
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-muted">Home</a></li>
        <li class="breadcrumb-item active text-dark fw-medium" aria-current="page">{current_title}</li>
      </ol>
    </nav>
    """

def render_pagination(current_id):
    if current_id == "index" or current_id == "about": return ""
    idx = next(i for i, p in enumerate(PAGES) if p["id"] == current_id)
    prev_link = ""
    next_link = ""
    
    if idx > 1:
        prev_p = PAGES[idx-1]
        prev_link = f'<a href="{prev_p["file"]}" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> Previous: {prev_p["title"]}</a>'
    elif idx == 1:
        prev_link = f'<a href="index.html" class="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> Previous: Home</a>'
        
    if idx < len(PAGES) - 1:
        next_p = PAGES[idx+1]
        next_link = f'<a href="{next_p["file"]}" class="btn btn-brand-red">Next: {next_p["title"]} <i class="bi bi-arrow-right"></i></a>'
        
    return f"""
    <div class="d-flex justify-content-between mt-5 pt-4 border-top">
        <div>{prev_link}</div>
        <div>{next_link}</div>
    </div>
    """

def render_page(p, content):
    is_home = p["id"] == "index"
    
    sidebar = render_sidebar(p["id"])
    breadcrumbs = render_breadcrumbs(p["title"])
    pagination = render_pagination(p["id"])
    
    offcanvas_toggle = ""
    if not is_home and p["id"] != "about":
        offcanvas_toggle = """
        <button class="btn btn-light border d-lg-none me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">
            <i class="bi bi-list"></i>
        </button>
        """
        
    nav_active = {p_id: "" for p_id in [x["id"] for x in PAGES]}
    nav_active[p["id"]] = "active"
    
    template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{p["title"]} - KHUNYIKALSAL Support Center</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg?v=2">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png?v=2">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png?v=2">
    <link rel="apple-touch-icon" href="apple-touch-icon.png?v=2">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <script type="text/javascript">
       (function(){{
          emailjs.init({{
            publicKey: "kAxjlSzNpoe7n_4wf",
          }});
       }})();
    </script>
</head>
<body>

    <nav class="navbar navbar-expand-lg bg-white sticky-top py-2 border-bottom">
        <div class="container">
            {offcanvas_toggle}
            <a class="navbar-brand d-flex align-items-center" href="index.html">
                <img src="assets/khunyikalsal-logo.png" alt="KHUNYIKALSAL" class="brand-logo">
                <span class="brand-name">KHUNYIKALSAL</span>
                <span class="brand-support">Support</span>
            </a>
            
            <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="mainNavbar">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('index', '')}" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('getting-started', '')}" href="getting-started.html">Getting Started</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('how-to-use', '')}" href="how-to-use.html">How to Use</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('features', '')}" href="features.html">Features</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('safety-guide', '')}" href="safety-guide.html">Safety Guide</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('faq', '')}" href="faq.html">FAQ</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('about', '')}" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link spa-link {nav_active.get('contact-support', '')}" href="contact-support.html">Contact Support</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="page-content" class="page-transition flex-grow-1 d-flex flex-column">
"""
    
    if is_home:
        template += content
    elif p["id"] == "about":
        template += f"""
    <div class="container my-5 py-4 flex-grow-1">
        <h1 class="mb-5 fw-bold">{p["title"]}</h1>
        {content}
    </div>
"""
    else:
        template += f"""
    <div class="container my-4 flex-grow-1">
        <div class="row">
            <!-- Desktop Sidebar -->
            <aside class="col-lg-3 d-none d-lg-block">
                <nav class="sidebar sidebar-nav nav flex-column pt-0">
                    {sidebar}
                </nav>
            </aside>
            
            <!-- Mobile Offcanvas Sidebar -->
            <div class="offcanvas offcanvas-start sidebar-offcanvas d-lg-none" tabindex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
                <div class="offcanvas-header bg-light border-bottom">
                    <h5 class="offcanvas-title fw-bold" id="sidebarOffcanvasLabel"><i class="bi bi-journal-text me-2"></i>Menu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body p-0">
                    <nav class="sidebar-nav nav flex-column pb-4">
                        {sidebar}
                    </nav>
                </div>
            </div>

            <!-- Main Content -->
            <main class="col-lg-9 doc-content">
                {breadcrumbs}
                <h1 class="mb-5 fw-bold">{p["title"]}</h1>
                {content}
                {pagination}
            </main>
        </div>
    </div>
"""

    template += """
    </div> <!-- end page-content -->
    <footer class="py-5 mt-auto">
        <div class="container">
            <div class="row mb-4">
                <div class="col-md-5 mb-4 mb-md-0">
                    <h5 class="fw-bold mb-3 text-dark">
                        <i class="bi bi-shield-plus text-brand-red me-1"></i> KHUNYIKALSAL Support
                    </h5>
                    <p class="pe-md-5">Emergency Help. Connected Community. Safer Myanmar.</p>
                </div>
                <div class="col-md-7">
                    <div class="row">
                        <div class="col-6 col-sm-4 mb-3">
                            <h6 class="fw-bold text-dark mb-3">Help Center</h6>
                            <ul class="list-unstyled footer-links">
                                <li><a href="getting-started.html">Getting Started</a></li>
                                <li><a href="how-to-use.html">How to Use</a></li>
                                <li><a href="safety-guide.html">Safety Guide</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-sm-4 mb-3">
                            <h6 class="fw-bold text-dark mb-3">Support</h6>
                            <ul class="list-unstyled footer-links">
                                <li><a href="faq.html">FAQ</a></li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="contact-support.html">Contact Support</a></li>
                            </ul>
                        </div>
                        <div class="col-12 col-sm-4 mb-3">
                            <h6 class="fw-bold text-dark mb-3">Legal</h6>
                            <ul class="list-unstyled footer-links">
                                <li><a href="emergency-information.html">Privacy Policy</a></li>
                                <li><a href="emergency-information.html">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-4 border-top text-center small">
                &copy; 2026 KHUNYIKALSAL. All rights reserved.
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
"""
    return template

CONTENT_INDEX = """
<header class="hero-section text-center">
    <i class="bi bi-shield-plus hero-bg-icon"></i>
    <div class="container hero-content">
        <h6 class="text-brand-red fw-bold tracking-wide text-uppercase mb-3">KHUNYIKALSAL Support</h6>
        <h1 class="display-5 fw-bold mb-3 text-dark">How can we help you?</h1>
        <p class="lead mb-5 text-muted">Find guides, instructions and answers about using KHUNYIKALSAL.</p>
        
        <div class="search-bar-hero input-group input-group-lg d-flex align-items-center">
            <i class="bi bi-search text-muted ps-3"></i>
            <input type="text" class="form-control" placeholder="Search help articles..." aria-label="Search">
        </div>
    </div>
</header>

<section class="container my-5 py-4 flex-grow-1">
    
    <div class="mb-5 pb-3">
        <h4 class="fw-bold mb-4">Popular Guides</h4>
        <div class="row g-4">
            <div class="col-md-6 col-lg-3">
                <a href="how-to-use.html#send-sos" class="clean-card p-4 d-flex flex-column h-100">
                    <div class="clean-card-icon icon-bg-red mb-3">
                        <i class="bi bi-bell-fill"></i>
                    </div>
                    <h5 class="fw-bold fs-6">How to Send an SOS</h5>
                    <p class="text-muted small mb-3 flex-grow-1">Learn how to send an emergency request quickly.</p>
                    <div class="text-end text-brand-red mt-auto"><i class="bi bi-arrow-right"></i></div>
                </a>
            </div>
            <div class="col-md-6 col-lg-3">
                <a href="getting-started.html" class="clean-card p-4 d-flex flex-column h-100">
                    <div class="clean-card-icon icon-bg-blue mb-3">
                        <i class="bi bi-rocket-takeoff-fill"></i>
                    </div>
                    <h5 class="fw-bold fs-6">Getting Started</h5>
                    <p class="text-muted small mb-3 flex-grow-1">Set up your account and configure the app properly.</p>
                    <div class="text-end text-brand-red mt-auto"><i class="bi bi-arrow-right"></i></div>
                </a>
            </div>
            <div class="col-md-6 col-lg-3">
                <a href="account-profile.html" class="clean-card p-4 d-flex flex-column h-100">
                    <div class="clean-card-icon icon-bg-green mb-3">
                        <i class="bi bi-people-fill"></i>
                    </div>
                    <h5 class="fw-bold fs-6">Emergency Contacts</h5>
                    <p class="text-muted small mb-3 flex-grow-1">Add and manage people who can be notified in an emergency.</p>
                    <div class="text-end text-brand-red mt-auto"><i class="bi bi-arrow-right"></i></div>
                </a>
            </div>
            <div class="col-md-6 col-lg-3">
                <a href="permissions.html" class="clean-card p-4 d-flex flex-column h-100">
                    <div class="clean-card-icon icon-bg-yellow mb-3">
                        <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    <h5 class="fw-bold fs-6">Location Permissions</h5>
                    <p class="text-muted small mb-3 flex-grow-1">Understand why location access is important and how to enable it.</p>
                    <div class="text-end text-brand-red mt-auto"><i class="bi bi-arrow-right"></i></div>
                </a>
            </div>
        </div>
    </div>

    <div class="bg-light rounded-4 p-4 p-md-5 mb-5 border">
        <h4 class="fw-bold mb-4 text-center">Browse Help Topics</h4>
        <div class="row g-4">
            <div class="col-md-6 col-lg-4">
                <a href="getting-started.html" class="clean-card p-4 h-100 d-flex align-items-start gap-3">
                    <div class="clean-card-icon icon-bg-blue flex-shrink-0">
                        <i class="bi bi-rocket-takeoff-fill"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">Getting Started</h6>
                        <p class="text-muted small mb-0">Install, register and set up KHUNYIKALSAL.</p>
                    </div>
                </a>
            </div>
            <div class="col-md-6 col-lg-4">
                <a href="how-to-use.html" class="clean-card p-4 h-100 d-flex align-items-start gap-3">
                    <div class="clean-card-icon icon-bg-red flex-shrink-0">
                        <i class="bi bi-journal-medical"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">How to Use</h6>
                        <p class="text-muted small mb-0">Learn how to use the main emergency features.</p>
                    </div>
                </a>
            </div>
            <div class="col-md-6 col-lg-4">
                <a href="features.html" class="clean-card p-4 h-100 d-flex align-items-start gap-3">
                    <div class="clean-card-icon icon-bg-purple flex-shrink-0">
                        <i class="bi bi-grid-fill"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">Features</h6>
                        <p class="text-muted small mb-0">Explore all features and what they can do.</p>
                    </div>
                </a>
            </div>
            <div class="col-md-6 col-lg-4">
                <a href="safety-guide.html" class="clean-card p-4 h-100 d-flex align-items-start gap-3">
                    <div class="clean-card-icon icon-bg-green flex-shrink-0">
                        <i class="bi bi-shield-check"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">Safety Guide</h6>
                        <p class="text-muted small mb-0">Important safety information and best practices.</p>
                    </div>
                </a>
            </div>
            <div class="col-md-6 col-lg-4">
                <a href="faq.html" class="clean-card p-4 h-100 d-flex align-items-start gap-3">
                    <div class="clean-card-icon icon-bg-yellow flex-shrink-0">
                        <i class="bi bi-question-circle-fill"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">FAQ</h6>
                        <p class="text-muted small mb-0">Find answers to common questions.</p>
                    </div>
                </a>
            </div>
            <div class="col-md-6 col-lg-4">
                <a href="troubleshooting.html" class="clean-card p-4 h-100 d-flex align-items-start gap-3">
                    <div class="clean-card-icon icon-bg-gray flex-shrink-0">
                        <i class="bi bi-wrench"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-1">Troubleshooting</h6>
                        <p class="text-muted small mb-0">Find solutions to common problems.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>
"""

CONTENT_GETTING_STARTED = """
<p class="lead text-muted mb-5">Follow these simple steps to set up KHUNYIKALSAL on your mobile device so you're ready when an emergency happens.</p>

<div class="step-item">
    <div class="step-number">01</div>
    <div>
        <h4 class="fw-bold mb-2">Download and Install KHUNYIKALSAL</h4>
        <p class="mb-0 text-muted">Download the official KHUNYIKALSAL app from the Google Play Store (for Android) or Apple App Store (for iOS). Beware of fake applications; ensure the publisher is listed as the official KHUNYIKALSAL organization.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">02</div>
    <div>
        <h4 class="fw-bold mb-2">Create an Account</h4>
        <p class="mb-0 text-muted">Open the app and select "Sign Up". You will need to provide your phone number, which will serve as your primary identifier. Setting up an account is mandatory to prevent spam and ensure responders have accurate information.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">03</div>
    <div>
        <h4 class="fw-bold mb-2">Verify Your Account</h4>
        <p class="mb-0 text-muted">A verification code (OTP) will be sent to your phone via SMS. Enter this code into the app to verify your identity.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">04</div>
    <div>
        <h4 class="fw-bold mb-2">Complete Your Profile</h4>
        <p class="mb-0 text-muted">Enter your full name, blood type, and any critical medical conditions. This information is securely shared with emergency responders if you send an SOS.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">05</div>
    <div>
        <h4 class="fw-bold mb-2">Add Emergency Contacts</h4>
        <p class="mb-0 text-muted">Navigate to <strong>Profile &gt; Emergency Contacts</strong>. Add up to 3 trusted family members or friends. These contacts can be notified automatically if you trigger an emergency request.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">06</div>
    <div>
        <h4 class="fw-bold mb-2">Enable Required Permissions</h4>
        <p class="mb-0 text-muted">The app will prompt you for certain permissions. For the SOS feature to work, you <strong>must</strong> allow Location access. Learn more on the <a href="permissions.html" class="text-brand-red text-decoration-none fw-bold">Permissions</a> page.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">07</div>
    <div>
        <h4 class="fw-bold mb-2">Enable Notifications</h4>
        <p class="mb-0 text-muted">Enable push notifications so you can receive status updates on your emergency requests and get real-time disaster alerts in your area.</p>
    </div>
</div>

<div class="step-item">
    <div class="step-number">08</div>
    <div>
        <h4 class="fw-bold mb-2">You're Ready</h4>
        <p class="mb-0 text-muted">Familiarize yourself with the interface, but <strong>do not send a fake SOS</strong>. Read the <a href="how-to-use.html" class="text-brand-red text-decoration-none fw-bold">How to Use</a> guide to understand exactly what happens when you press the emergency buttons.</p>
    </div>
</div>
"""

CONTENT_ABOUT = """
<div class="row g-5">
    <div class="col-lg-7">
        <p class="lead text-muted mb-5">KHUNYIKALSAL is an emergency assistance platform designed to help people access emergency support, important information, and community-based assistance when they need it.</p>
        
        <h3 class="fw-bold mb-4">Our Purpose</h3>
        <p class="text-muted mb-5">KHUNYIKALSAL aims to make emergency assistance easier to access and help users understand what to do during emergency situations. We bridge the gap between people in need and the resources that can save lives.</p>

        <h3 class="fw-bold mb-4">What We Provide</h3>
        <div class="row g-4 mb-5">
            <div class="col-md-6">
                <div class="bg-light p-4 rounded-4 h-100 border">
                    <h6 class="fw-bold"><i class="bi bi-broadcast text-brand-red me-2"></i>Emergency Assistance</h6>
                    <p class="small text-muted mb-0">Quickly alert responders and trusted contacts when you are in danger.</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-light p-4 rounded-4 h-100 border">
                    <h6 class="fw-bold"><i class="bi bi-info-circle-fill text-brand-red me-2"></i>Emergency Information</h6>
                    <p class="small text-muted mb-0">Access crucial guides and standard procedures for various emergencies.</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-light p-4 rounded-4 h-100 border">
                    <h6 class="fw-bold"><i class="bi bi-geo-alt-fill text-brand-red me-2"></i>Location-Based Assistance</h6>
                    <p class="small text-muted mb-0">Share exact coordinates with rescue teams to reduce response times.</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-light p-4 rounded-4 h-100 border">
                    <h6 class="fw-bold"><i class="bi bi-droplet-half text-brand-red me-2"></i>Blood Donation Support</h6>
                    <p class="small text-muted mb-0">Connect patients with urgent blood needs to available donors nearby.</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-light p-4 rounded-4 h-100 border">
                    <h6 class="fw-bold"><i class="bi bi-shield-check text-brand-red me-2"></i>Safety Information</h6>
                    <p class="small text-muted mb-0">Receive early disaster warnings and educational safety content.</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-light p-4 rounded-4 h-100 border">
                    <h6 class="fw-bold"><i class="bi bi-people-fill text-brand-red me-2"></i>Community Assistance</h6>
                    <p class="small text-muted mb-0">Empower local communities to report missing persons and help each other.</p>
                </div>
            </div>
        </div>

        <h3 class="fw-bold mb-4">Why KHUNYIKALSAL?</h3>
        <p class="text-muted mb-5">To make emergency assistance and safety information easier to understand and access.</p>

        <h3 class="fw-bold mb-4">Our Vision</h3>
        <p class="text-muted mb-5">Building safer communities through connected, accessible, and rapid emergency assistance for everyone.</p>
    </div>

    <div class="col-lg-5">
        <div class="bg-light p-4 p-md-5 rounded-4 border sticky-top" style="top: 100px;">
            <h4 class="fw-bold mb-2">Have a Concern?</h4>
            <p class="text-muted small mb-4">Send feedback, report a problem, or file a complaint directly to our team.</p>

            <div id="alertSuccess" class="alert alert-success d-none shadow-sm border-0" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i> Thank you. Your message has been sent successfully.
            </div>
            <div id="alertError" class="alert alert-danger d-none shadow-sm border-0" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i> Sorry, we couldn't send your message. Please try again later.
            </div>

            <form id="complaintForm" novalidate>
                <div class="mb-3">
                    <label for="from_name" class="form-label text-muted small fw-bold">FULL NAME <span class="text-danger">*</span></label>
                    <input type="text" class="form-control bg-white" id="from_name" required>
                    <div class="invalid-feedback">Please enter your name.</div>
                </div>
                <div class="mb-3">
                    <label for="from_email" class="form-label text-muted small fw-bold">EMAIL ADDRESS <span class="text-danger">*</span></label>
                    <input type="email" class="form-control bg-white" id="from_email" required>
                    <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label text-muted small fw-bold">CATEGORY</label>
                    <select class="form-select bg-white" id="category">
                        <option value="General Feedback" selected>General Feedback</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Technical Problem">Technical Problem</option>
                        <option value="Emergency Feature Issue">Emergency Feature Issue</option>
                        <option value="Account Problem">Account Problem</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="subject" class="form-label text-muted small fw-bold">SUBJECT <span class="text-danger">*</span></label>
                    <input type="text" class="form-control bg-white" id="subject" required>
                    <div class="invalid-feedback">Please enter a subject.</div>
                </div>
                <div class="mb-4">
                    <label for="message" class="form-label text-muted small fw-bold">MESSAGE <span class="text-danger">*</span></label>
                    <textarea class="form-control bg-white" id="message" rows="4" required></textarea>
                    <div class="invalid-feedback">Please enter your message.</div>
                </div>
                <button type="submit" id="submitBtn" class="btn btn-brand-red w-100 py-3 fw-bold">Send Message</button>
            </form>
        </div>
    </div>
</div>
"""

CONTENT_HOW_TO_USE = """
<p class="lead text-muted">Detailed guides on using the core functions of the KHUNYIKALSAL application safely and effectively.</p>

<div class="row mt-5">
    <div class="col-12 col-xl-9 pe-xl-5">

        <section id="send-sos" class="doc-section pb-4 border-bottom">
            <h3 class="fw-bold"><i class="bi bi-broadcast text-brand-red me-2"></i>How to Send an SOS</h3>
            <p><strong>Purpose:</strong> To immediately request emergency assistance from official responders.</p>
            <p><strong>When to use it:</strong> Only in genuine emergencies (medical, fire, crime, natural disaster, traffic accident) where life, safety, or property is at risk.</p>
            
            <h5 class="mt-4 fw-bold">Step-by-step instructions:</h5>
            <ol class="mb-4 text-muted">
                <li class="mb-2">Open the KHUNYIKALSAL app.</li>
                <li class="mb-2">Tap the large red <strong>SOS</strong> button on the home screen.</li>
                <li class="mb-2"><strong>Select an emergency type:</strong> Choose from Medical, Fire, Accident, Disaster, etc.</li>
                <li class="mb-2"><strong>Share your location:</strong> The app will attempt to grab your GPS coordinates. If GPS is weak, you may be prompted to adjust the pin on a map manually.</li>
                <li class="mb-2"><strong>Provide details (Optional but recommended):</strong> Attach a photo or type a short note about the situation.</li>
                <li class="mb-2"><strong>Swipe to Confirm:</strong> Swipe the confirmation bar to finalize sending the SOS.</li>
            </ol>
            
            <div class="bg-light p-4 rounded-3 border mb-4">
                <strong><i class="bi bi-info-circle-fill text-muted me-2"></i> Important notes:</strong> Ensure you are in a safe location if possible before sending the SOS. Do not put yourself in further danger just to get a better GPS signal or photo.
            </div>
        </section>

        <section id="cancel-request" class="doc-section py-4 border-bottom">
            <h3 class="fw-bold"><i class="bi bi-x-circle text-brand-red me-2"></i>How to Cancel an Emergency Request</h3>
            <p><strong>Purpose:</strong> To notify responders that the emergency has been resolved or the request was accidental.</p>
            <p><strong>When to use it:</strong> If you accidentally swiped the SOS button, or if the situation was safely resolved before responders arrived.</p>
            <h5 class="mt-4 fw-bold">Step-by-step instructions:</h5>
            <ol class="mb-4 text-muted">
                <li class="mb-2">Go to the active emergency tracking screen.</li>
                <li class="mb-2">Scroll to the bottom and tap <strong>Cancel Request</strong>.</li>
                <li class="mb-2">Select a reason for cancellation (e.g., "Accidental trigger", "Resolved").</li>
                <li class="mb-2">Confirm cancellation.</li>
            </ol>
            <div class="bg-light p-4 rounded-3 border mb-4">
                <strong><i class="bi bi-info-circle-fill text-muted me-2"></i> Important notes:</strong> Excessive false alarms or cancellations may result in a temporary block on your account to prevent abuse of emergency resources.
            </div>
        </section>

        <section id="blood" class="doc-section py-4 border-bottom">
            <h3 class="fw-bold"><i class="bi bi-droplet-half text-brand-red me-2"></i>Blood Donation &amp; Requests</h3>
            
            <h5 class="mt-4 fw-bold">How to Request Blood:</h5>
            <ol class="mb-4 text-muted">
                <li class="mb-2">Tap the <strong>Blood Bank</strong> icon on the home screen.</li>
                <li class="mb-2">Select <strong>Request Blood</strong>.</li>
                <li class="mb-2">Enter the patient's name, required blood type, hospital location, and urgency.</li>
                <li class="mb-2">Submit the request. Notifications will be sent to registered donors matching that blood type nearby.</li>
            </ol>

            <h5 class="mt-4 fw-bold">How to Become a Blood Donor:</h5>
            <ol class="mb-4 text-muted">
                <li class="mb-2">Go to <strong>Profile &gt; Blood Donor Status</strong>.</li>
                <li class="mb-2">Toggle the switch to <strong>Available to Donate</strong>.</li>
                <li class="mb-2">Ensure your correct blood type is saved in your profile. You will now receive alerts when someone nearby urgently needs your blood type.</li>
            </ol>
        </section>
        
        <section id="missing-person" class="doc-section pt-4 border-bottom">
            <h3 class="fw-bold"><i class="bi bi-person-bounding-box text-brand-red me-2"></i>How to Report a Missing Person</h3>
            <p><strong>Purpose:</strong> To quickly mobilize the community and rescue teams to find a missing individual.</p>
            <ol class="mb-4 text-muted">
                <li class="mb-2">Tap <strong>Missing Person</strong> on the dashboard.</li>
                <li class="mb-2">Tap <strong>Report New</strong>.</li>
                <li class="mb-2">Upload a clear, recent photo of the person.</li>
                <li class="mb-2">Provide identifying details: Name, Age, Height, Last Seen Location, and Clothing Description.</li>
                <li class="mb-2">Submit. The report will be reviewed and broadcasted to users and responder teams in the relevant area.</li>
            </ol>
        </section>
        
        <section id="other" class="doc-section pt-4">
            <h3 class="fw-bold"><i class="bi bi-compass text-brand-red me-2"></i>Other Features</h3>
            <p><strong>How to find nearby help / hospitals:</strong> Open the <strong>Nearby</strong> tab on the bottom navigation. Allow location access to view a map of registered hospitals and rescue stations.</p>
            <p><strong>How to view weather / alerts:</strong> Open the <strong>Weather</strong> tab. Active natural disaster warnings will appear as red banners at the top of the screen.</p>
        </section>

    </div>
    <div class="col-3 d-none d-xl-block border-start ps-4">
        <nav id="toc" class="sticky-top" style="top: 100px;">
            <strong class="text-muted text-uppercase small mb-3 d-block tracking-wide">On this page</strong>
            <ul class="nav flex-column gap-2">
                <li class="nav-item"><a class="nav-link px-0 py-1 text-muted" href="#send-sos">Send an SOS</a></li>
                <li class="nav-item"><a class="nav-link px-0 py-1 text-muted" href="#cancel-request">Cancel a Request</a></li>
                <li class="nav-item"><a class="nav-link px-0 py-1 text-muted" href="#blood">Blood Requests</a></li>
                <li class="nav-item"><a class="nav-link px-0 py-1 text-muted" href="#missing-person">Missing Person</a></li>
                <li class="nav-item"><a class="nav-link px-0 py-1 text-muted" href="#other">Other Features</a></li>
            </ul>
        </nav>
    </div>
</div>
"""

CONTENT_FEATURES = """
<p class="lead mb-5 text-muted">Explore the comprehensive safety and emergency features built into KHUNYIKALSAL.</p>

<div class="accordion border rounded-4 overflow-hidden" id="featuresAccordion">
  
  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#feat-sos">
        <i class="bi bi-broadcast text-brand-red me-3 fs-5"></i> SOS Emergency
      </button>
    </h2>
    <div id="feat-sos" class="accordion-collapse collapse show" data-bs-parent="#featuresAccordion">
      <div class="accordion-body text-muted px-4 py-4 bg-light">
        <p><strong>What it does:</strong> Instantly alerts nearby emergency responders and your emergency contacts that you are in danger.</p>
        <p><strong>How it works:</strong> Captures your GPS coordinates and broadcasts them to the nearest available rescue teams along with your profile information.</p>
        <p><strong>How to use it:</strong> Tap the large SOS button on the home screen, select emergency type, and swipe to confirm.</p>
        <p class="mb-0"><strong>Important notes:</strong> Requires an active internet connection and location permissions. Abuse of this feature is strictly prohibited.</p>
      </div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#feat-med">
        <i class="bi bi-heart-pulse text-brand-red me-3 fs-5"></i> Medical Emergency &amp; Nearby Hospitals
      </button>
    </h2>
    <div id="feat-med" class="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
      <div class="accordion-body text-muted px-4 py-4 bg-light">
        <p><strong>What it does:</strong> Specifically requests an ambulance and paramedics. The app also features a "Nearby Hospitals" map.</p>
        <p><strong>How it works:</strong> Filters alerts directly to medical responder units. The hospital map uses mapping integration to show operating clinics and hospitals near you.</p>
        <p class="mb-0"><strong>Important notes:</strong> Always ensure your medical history in your profile is accurate.</p>
      </div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#feat-fire">
        <i class="bi bi-fire text-brand-red me-3 fs-5"></i> Fire Emergency &amp; Traffic Accident
      </button>
    </h2>
    <div id="feat-fire" class="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
      <div class="accordion-body text-muted px-4 py-4 bg-light">
        <p><strong>What it does:</strong> Specialized alerts for fire outbreaks or vehicle collisions.</p>
        <p><strong>How to use it:</strong> Select these specific categories after pressing SOS. For fire, it routes to local fire stations. For traffic, it alerts traffic police and ambulance services.</p>
        <p class="mb-0"><strong>Important notes:</strong> If a vehicle is on fire, select Fire as the primary emergency.</p>
      </div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#feat-disaster">
        <i class="bi bi-cloud-lightning-rain text-brand-red me-3 fs-5"></i> Natural Disaster Alerts &amp; Weather
      </button>
    </h2>
    <div id="feat-disaster" class="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
      <div class="accordion-body text-muted px-4 py-4 bg-light">
        <p><strong>What it does:</strong> Provides early warnings for natural disasters (floods, earthquakes, storms) and general weather info.</p>
        <p><strong>How it works:</strong> Pushes notifications based on official meteorological data. The Weather tab shows current conditions and forecasts for your registered region.</p>
        <p class="mb-0"><strong>Important notes:</strong> [To be confirmed] specific meteorological sources used for data.</p>
      </div>
    </div>
  </div>
  
  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#feat-blood">
        <i class="bi bi-droplet text-brand-red me-3 fs-5"></i> Blood Donation &amp; Request
      </button>
    </h2>
    <div id="feat-blood" class="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
      <div class="accordion-body text-muted px-4 py-4 bg-light">
        <p><strong>What it does:</strong> Connects patients needing blood with willing donors nearby.</p>
        <p class="mb-0"><strong>How to use it:</strong> Use the Blood Request form to ask for help, or register as a donor in your profile settings.</p>
      </div>
    </div>
  </div>

  <div class="accordion-item border-0">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#feat-volunteer">
        <i class="bi bi-person-hearts text-brand-red me-3 fs-5"></i> Volunteer / Responder Features
      </button>
    </h2>
    <div id="feat-volunteer" class="accordion-collapse collapse" data-bs-parent="#featuresAccordion">
      <div class="accordion-body text-muted px-4 py-4 bg-light">
        <p><strong>What it does:</strong> A specialized interface for registered rescue organizations and certified volunteers.</p>
        <p><strong>How it works:</strong> Allows responders to receive incoming SOS requests, view the victim's location on a map, and accept the rescue mission.</p>
        <p class="mb-0"><strong>Important notes:</strong> Requires official verification by KHUNYIKALSAL administrators to activate this mode.</p>
      </div>
    </div>
  </div>

</div>
"""

CONTENT_ACCOUNT_PROFILE = """
<p class="lead mb-5 text-muted">Managing your KHUNYIKALSAL account securely and keeping your profile up-to-date.</p>

<div class="row g-4">
    <div class="col-md-6">
        <div class="bg-light p-4 p-md-5 rounded-4 h-100 border">
            <h5 class="fw-bold mb-4 text-dark"><i class="bi bi-person-plus me-2 text-brand-red"></i>Account Basics</h5>
            
            <h6 class="fw-bold mt-2">Create an Account</h6>
            <p class="small text-muted mb-4">Use a valid phone number. Verification via SMS OTP is required.</p>
            
            <h6 class="fw-bold">Login / Logout</h6>
            <p class="small text-muted mb-4">Log in using your registered phone number. To logout, go to <strong>Profile &gt; Settings &gt; Logout</strong>.</p>
            
            <h6 class="fw-bold">Forgot Password</h6>
            <p class="small text-muted mb-4">Tap "Forgot Password" on the login screen. You will receive an SMS OTP to reset your password or PIN.</p>
            
            <h6 class="fw-bold">Account Security</h6>
            <p class="small text-muted mb-0">Never share your OTP with anyone. The support team will never ask for your PIN or OTP.</p>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="bg-light p-4 p-md-5 rounded-4 h-100 border">
            <h5 class="fw-bold mb-4 text-dark"><i class="bi bi-person-lines-fill me-2 text-brand-red"></i>Profile Information</h5>
            
            <h6 class="fw-bold mt-2">Edit Profile</h6>
            <p class="small text-muted mb-4">Keep your name, blood type, and medical notes accurate. This info is sent to responders during an SOS.</p>
            
            <h6 class="fw-bold">Update Personal Information</h6>
            <p class="small text-muted mb-4">[To be confirmed] whether changing the primary phone number requires creating a new account or can be done in-app via OTP.</p>
            
            <h6 class="fw-bold">Add Emergency Contacts</h6>
            <p class="small text-muted mb-0">Navigate to <strong>Profile &gt; Emergency Contacts</strong>. Add up to 3 trusted contacts. These contacts receive an automated SMS (subject to carrier availability) when you trigger an SOS.</p>
        </div>
    </div>
</div>
"""

CONTENT_PERMISSIONS = """
<p class="lead mb-4 text-muted">Why KHUNYIKALSAL asks for permissions and how to manage them.</p>
<p class="mb-5 text-muted">To provide life-saving services, the app requires access to certain features on your phone. We respect your privacy and only use these permissions for emergency functionalities.</p>

<div class="bg-light p-4 p-md-5 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3"><i class="bi bi-geo-alt-fill text-brand-red me-2"></i>Location Permission</h5>
    <p class="text-muted"><strong>Why it is needed:</strong> To send your exact coordinates to rescue teams when you press SOS. It is also used to show you nearby hospitals and relevant disaster alerts.</p>
    <p class="text-muted"><strong>What happens if it is denied:</strong> The SOS button cannot automatically share where you are, drastically reducing response efficiency. Responders won't know where to find you.</p>
    <div class="bg-white p-3 rounded-3 mt-4 border">
        <p class="small mb-2 text-muted"><strong>How to enable it on Android:</strong> Settings &gt; Apps &gt; KHUNYIKALSAL &gt; Permissions &gt; Location &gt; Allow only while using the app (or Allow all the time).</p>
        <p class="small mb-0 text-muted"><strong>How to enable it on iOS:</strong> Settings &gt; KHUNYIKALSAL &gt; Location &gt; While Using the App.</p>
    </div>
</div>

<div class="bg-light p-4 p-md-5 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3"><i class="bi bi-bell-fill text-brand-red me-2"></i>Notification Permission</h5>
    <p class="text-muted"><strong>Why it is needed:</strong> To alert you about severe weather, natural disasters, blood requests near you, and updates on your SOS request status.</p>
    <p class="text-muted mb-0"><strong>What happens if it is denied:</strong> You will miss critical disaster warnings and updates from rescue teams.</p>
</div>

<div class="bg-light p-4 p-md-5 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3"><i class="bi bi-telephone-fill text-brand-red me-2"></i>Phone Permission</h5>
    <p class="text-muted"><strong>Why it is needed:</strong> To allow you to directly call emergency services or responders from within the app without manually dialing the numbers.</p>
    <p class="text-muted mb-0"><strong>What happens if it is denied:</strong> You will have to manually copy and paste numbers into your phone dialer.</p>
</div>

<div class="bg-light p-4 p-md-5 rounded-4 border">
    <h5 class="fw-bold text-dark mb-3"><i class="bi bi-camera-fill text-brand-red me-2"></i>Camera &amp; Microphone Permission (If Required)</h5>
    <p class="text-muted"><strong>Why it is needed:</strong> To attach photos of an accident scene to your SOS request, or to upload a photo for a Missing Person report.</p>
    <p class="text-muted mb-0"><strong>What happens if it is denied:</strong> You can still send an SOS, but you won't be able to attach live pictures.</p>
</div>
"""

CONTENT_SAFETY_GUIDE = """
<p class="lead mb-5 text-muted">Important guidelines for staying safe during an emergency and using KHUNYIKALSAL responsibly.</p>

<div class="row g-4 mb-5">
    <div class="col-md-6">
        <div class="bg-light p-4 rounded-4 h-100 border">
            <h5 class="fw-bold mb-4 text-dark"><i class="bi bi-exclamation-triangle-fill text-brand-red me-2"></i>Before Sending an SOS</h5>
            <ul class="mb-0 ps-3 text-muted">
                <li class="mb-3"><strong>Make sure you are in a safe location when possible:</strong> If you are in a burning building or on a busy highway, prioritize moving to safety first over using your phone.</li>
                <li class="mb-3"><strong>Select the correct emergency type:</strong> This ensures the right type of responders are dispatched.</li>
                <li class="mb-3"><strong>Check that your location is available:</strong> Ensure your GPS/Location is turned on.</li>
                <li><strong>Provide accurate information:</strong> Do not exaggerate the situation; provide factual details.</li>
            </ul>
        </div>
    </div>
    <div class="col-md-6">
        <div class="bg-light p-4 rounded-4 h-100 border">
            <h5 class="fw-bold mb-4 text-dark"><i class="bi bi-check-circle-fill text-brand-red me-2"></i>After Sending an SOS</h5>
            <ul class="mb-0 ps-3 text-muted">
                <li class="mb-3"><strong>Stay available for communication:</strong> Responders may call you to verify details or get exact directions. Keep your phone line free.</li>
                <li class="mb-3"><strong>Follow instructions from responders:</strong> Listen carefully to any advice given by emergency dispatchers.</li>
                <li class="mb-3"><strong>Avoid putting yourself in additional danger:</strong> Do not try to play hero or move severely injured persons unless necessary.</li>
                <li><strong>Keep your phone accessible:</strong> Try to conserve battery if rescue might take time.</li>
            </ul>
        </div>
    </div>
</div>

<div class="border-top pt-5">
    <h5 class="fw-bold mb-3">Emergency Preparedness</h5>
    <p class="mb-4 text-muted">Do not wait for an emergency to set up your app. Ensure your profile, medical details, and emergency contacts are filled out today. Familiarize yourself with local evacuation routes and standard emergency numbers.</p>

    <h5 class="fw-bold mb-3">Personal Safety</h5>
    <p class="mb-4 text-muted">Your personal safety always comes first. Do not place yourself in physical danger simply to record an incident or to test the app features.</p>
    
    <h5 class="fw-bold mb-3">Privacy and Emergency Information</h5>
    <p class="mb-4 text-muted">KHUNYIKALSAL takes your privacy seriously. Your location is <strong>only</strong> shared when you actively trigger an SOS or enable specific sharing features. Your data is encrypted and only accessible by authorized responder organizations.</p>

    <h5 class="fw-bold mb-3">False or Accidental Emergency Requests</h5>
    <p class="mb-5 text-muted">If you accidentally trigger an SOS, use the <strong>Cancel Request</strong> feature immediately. Repeated intentional false alarms consume critical rescue resources and will result in account suspension and possible legal action depending on local laws.</p>

    <div class="bg-light rounded-4 p-4 p-md-5 border text-center">
        <h5 class="fw-bold mb-4"><i class="bi bi-telephone-inbound-fill text-brand-red me-2"></i> Important Emergency Information</h5>
        <p class="mb-4 text-muted">If the app is unavailable or you have no internet access, dial these direct numbers:</p>
        <div class="d-flex justify-content-center gap-4 flex-wrap">
            <div class="px-4 py-3 bg-white border rounded-3 text-dark fw-bold shadow-sm">
                <span class="text-brand-red me-2">199</span> Police
            </div>
            <div class="px-4 py-3 bg-white border rounded-3 text-dark fw-bold shadow-sm">
                <span class="text-brand-red me-2">191</span> Fire Dept
            </div>
            <div class="px-4 py-3 bg-white border rounded-3 text-dark fw-bold shadow-sm">
                <span class="text-brand-red me-2">192</span> Ambulance
            </div>
        </div>
    </div>
</div>
"""

CONTENT_FAQ = """
<p class="lead mb-5 text-muted">Find answers to common questions about the KHUNYIKALSAL application.</p>

<div class="accordion border rounded-4 overflow-hidden" id="faqAccordion">

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">What is KHUNYIKALSAL?</button></h2>
    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">KHUNYIKALSAL is a Myanmar emergency assistance mobile application designed to connect users quickly with rescue teams, medical services, and emergency contacts during critical situations.</div>
    </div>
  </div>
  
  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">Who can use KHUNYIKALSAL?</button></h2>
    <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Anyone with a smartphone and a valid phone number in supported regions of Myanmar can download and use the app. Verified rescue organizations can register as responders.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">How do I send an SOS?</button></h2>
    <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Open the app, tap the large SOS button, select the emergency type, ensure your location is accurate, and swipe to confirm.</div>
    </div>
  </div>
  
  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">Does KHUNYIKALSAL need my location?</button></h2>
    <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Yes. For the SOS feature to function correctly, the app needs access to your device's GPS to tell responders exactly where to go.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">What happens after I send an SOS?</button></h2>
    <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Your location, profile, and emergency type are broadcasted to nearby verified responder teams. Your emergency contacts will also be notified. A responder will accept the request and may contact you.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">Can I cancel an SOS request?</button></h2>
    <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Yes, if the situation is resolved or accidental, you can cancel the request from the active emergency screen. Please do this promptly so responders can attend to other emergencies.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq7">Why is my location not detected?</button></h2>
    <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">This usually happens if Location Services/GPS is turned off on your device, or you haven't granted the app Location permissions. Check your device settings.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq8">What happens if my internet connection is unavailable?</button></h2>
    <div id="faq8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">KHUNYIKALSAL requires an internet connection (mobile data or Wi-Fi) to transmit data to responders. If you have no internet, you should use your phone's standard dialer to call local emergency numbers. [To be confirmed] if the app supports SMS fallback.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq9">How do I add an emergency contact?</button></h2>
    <div id="faq9" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Go to Profile &gt; Emergency Contacts and tap "Add New". Enter their name and phone number.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq10">How do I become a blood donor?</button></h2>
    <div id="faq10" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Toggle your donor status in your profile settings to "Available to Donate" to receive alerts when someone needs your blood type.</div>
    </div>
  </div>

  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq11">How do I request blood?</button></h2>
    <div id="faq11" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Use the "Blood Bank" feature from the main menu and fill out the blood request form.</div>
    </div>
  </div>
  
  <div class="accordion-item border-0 border-bottom">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq12">How do I report a problem?</button></h2>
    <div id="faq12" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">You can report a problem via our <a href="about.html" class="text-brand-red text-decoration-none">About Us</a> page using the feedback form.</div>
    </div>
  </div>

  <div class="accordion-item border-0">
    <h2 class="accordion-header"><button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq13">How do I contact support?</button></h2>
    <div id="faq13" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body text-muted bg-light px-4 py-4">Visit our <a href="contact-support.html" class="text-brand-red text-decoration-none">Contact Support</a> page on this website.</div>
    </div>
  </div>

</div>
"""

CONTENT_TROUBLESHOOTING = """
<p class="lead mb-5 text-muted">Find solutions to common technical issues you might experience with the app.</p>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3">Cannot log in / Verification code not received</h5>
    <p class="text-muted small mb-2"><strong>Possible Cause:</strong> Weak cellular signal, incorrect phone number format, or carrier blocking automated SMS.</p>
    <p class="mb-3 text-muted"><strong>Solution:</strong> Check your cellular signal. Ensure you entered your phone number correctly without the leading zero if the country code is provided. Wait 60 seconds and tap "Resend Code".</p>
    <p class="mb-0 text-brand-red small"><i class="bi bi-info-circle me-1"></i> <strong>When to Contact Support:</strong> If you still do not receive the OTP after 3 attempts.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3">SOS cannot be sent / App cannot connect to server</h5>
    <p class="text-muted small mb-2"><strong>Possible Cause:</strong> No internet connection or strict firewall rules.</p>
    <p class="mb-3 text-muted"><strong>Solution:</strong> Verify that mobile data or Wi-Fi is turned on and working by opening a web browser. Disable any VPNs temporarily.</p>
    <p class="mb-0 text-brand-red small"><i class="bi bi-info-circle me-1"></i> <strong>When to Contact Support:</strong> If your internet works but the app displays "Server Error" repeatedly.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3">Location unavailable / Permission denied</h5>
    <p class="text-muted small mb-2"><strong>Possible Cause:</strong> GPS is turned off on your phone, or you denied location permissions during setup.</p>
    <p class="mb-0 text-muted"><strong>Solution:</strong> Turn on Location/GPS from your phone's quick settings panel. Go to your phone Settings &gt; Apps &gt; KHUNYIKALSAL &gt; Permissions and allow Location access.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3">Notifications not working / Emergency request status not updating</h5>
    <p class="text-muted small mb-2"><strong>Possible Cause:</strong> Battery saver mode is restricting background apps, or notifications are blocked.</p>
    <p class="mb-0 text-muted"><strong>Solution:</strong> Ensure notifications are enabled for the app in phone settings. Turn off battery optimization for KHUNYIKALSAL so it can receive real-time updates.</p>
</div>
    
<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold text-dark mb-3">App is slow or unresponsive</h5>
    <p class="text-muted small mb-2"><strong>Possible Cause:</strong> Outdated app version or low device memory.</p>
    <p class="mb-0 text-muted"><strong>Solution:</strong> Force close the app and reopen it. Check the Play Store or App Store for updates. Restart your phone.</p>
</div>

<div class="bg-light p-4 rounded-4 border">
    <h5 class="fw-bold text-dark mb-3">Forgot password</h5>
    <p class="text-muted small mb-2"><strong>Possible Cause:</strong> Memory lapse.</p>
    <p class="mb-0 text-muted"><strong>Solution:</strong> Tap "Forgot Password" on the login screen, enter your registered phone number, and follow the SMS OTP instructions to reset it.</p>
</div>
"""

CONTENT_CONTACT_SUPPORT = """
<div class="mb-5 mt-2">
    <h2 class="fw-bold">Need More Help?</h2>
    <p class="lead text-muted">Can't find the answer you're looking for? Contact the KHUNYIKALSAL support team.</p>
</div>

<div class="row g-4">
    <div class="col-md-6">
        <a href="mailto:support@khunyikalsal.com" class="clean-card p-4 p-md-5 h-100 text-center d-flex flex-column align-items-center justify-content-center">
            <div class="clean-card-icon icon-bg-red mb-4">
                <i class="bi bi-envelope-fill"></i>
            </div>
            <h5 class="fw-bold text-dark mb-2">Contact Support</h5>
            <p class="text-muted small mb-0">[placeholder] support@khunyikalsal.com</p>
        </a>
    </div>
    
    <div class="col-md-6">
        <a href="about.html" class="clean-card p-4 p-md-5 h-100 text-center d-flex flex-column align-items-center justify-content-center">
            <div class="clean-card-icon icon-bg-blue mb-4">
                <i class="bi bi-bug-fill"></i>
            </div>
            <h5 class="fw-bold text-dark mb-2">Report a Problem</h5>
            <p class="text-muted small mb-0">Found a bug in the app? Let us know.</p>
        </a>
    </div>

    <div class="col-md-6">
        <a href="about.html" class="clean-card p-4 p-md-5 h-100 text-center d-flex flex-column align-items-center justify-content-center">
            <div class="clean-card-icon icon-bg-green mb-4">
                <i class="bi bi-chat-heart-fill"></i>
            </div>
            <h5 class="fw-bold text-dark mb-2">Send Feedback</h5>
            <p class="text-muted small mb-0">Share your thoughts on how we can improve.</p>
        </a>
    </div>

    <div class="col-md-6">
        <a href="#" class="clean-card p-4 p-md-5 h-100 text-center d-flex flex-column align-items-center justify-content-center">
            <div class="clean-card-icon icon-bg-purple mb-4">
                <i class="bi bi-facebook"></i>
            </div>
            <h5 class="fw-bold text-dark mb-2">Social Media</h5>
            <p class="text-muted small mb-0">[placeholder] Official KHUNYIKALSAL Facebook Page</p>
        </a>
    </div>
</div>
"""

CONTENT_PRIVACY_SAFETY = """
<p class="lead mb-5 text-muted">Understanding how KHUNYIKALSAL protects your data and privacy.</p>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-person-badge text-brand-red me-2"></i>Personal Information</h5>
    <p class="mb-0 text-muted">We collect essential information such as your phone number, name, and medical details (blood type, conditions). This data is strictly used to identify you and assist medical responders in an emergency.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-geo-alt text-brand-red me-2"></i>Location Information</h5>
    <p class="mb-0 text-muted">Your location is NOT constantly tracked. GPS coordinates are only captured and transmitted when you actively initiate an SOS request, report a missing person, or use specific location-based features like the hospital map.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-file-medical text-brand-red me-2"></i>Emergency Information</h5>
    <p class="mb-0 text-muted">Information provided during an SOS (type of emergency, photos, notes) is temporarily stored and shared securely only with responding units and your pre-selected emergency contacts.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-bar-chart text-brand-red me-2"></i>Data Usage &amp; User Privacy</h5>
    <p class="mb-0 text-muted">We do not sell your personal data to advertisers. Emergency data is only accessible to verified responder organizations and KHUNYIKALSAL administrators.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-shield-check text-brand-red me-2"></i>Data Security</h5>
    <p class="mb-0 text-muted">All data transmitted between your device and our servers is encrypted in transit using industry-standard protocols.</p>
</div>

<div class="bg-light p-4 rounded-4 border mb-4">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-share text-brand-red me-2"></i>Third-party Services</h5>
    <p class="mb-0 text-muted">[To be confirmed] We may utilize third-party mapping services (e.g., Google Maps) to display locations. Please refer to their respective privacy policies regarding map usage.</p>
</div>

<div class="bg-light p-4 rounded-4 border">
    <h5 class="fw-bold mb-3 text-dark"><i class="bi bi-trash text-brand-red me-2"></i>Data Retention</h5>
    <p class="mb-0 text-muted">[To be confirmed] Emergency logs and reports are retained for official record-keeping and dispute resolution. If you wish to delete your account and personal data, you may contact support.</p>
</div>
"""

CONTENTS = {
    "index": CONTENT_INDEX,
    "getting-started": CONTENT_GETTING_STARTED,
    "how-to-use": CONTENT_HOW_TO_USE,
    "features": CONTENT_FEATURES,
    "account-profile": CONTENT_ACCOUNT_PROFILE,
    "permissions": CONTENT_PERMISSIONS,
    "safety-guide": CONTENT_SAFETY_GUIDE,
    "faq": CONTENT_FAQ,
    "about": CONTENT_ABOUT,
    "troubleshooting": CONTENT_TROUBLESHOOTING,
    "contact-support": CONTENT_CONTACT_SUPPORT,
    "emergency-information": CONTENT_PRIVACY_SAFETY
}

if __name__ == "__main__":
    os.makedirs("css", exist_ok=True)
    os.makedirs("js", exist_ok=True)
    
    for p in PAGES:
        html_content = render_page(p, CONTENTS[p["id"]])
        with open(p["file"], "w", encoding="utf-8") as f:
            f.write(html_content)
    
    print("Build complete.")
