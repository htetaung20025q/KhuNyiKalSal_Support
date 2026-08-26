import base64
from io import BytesIO
from PIL import Image

bg = Image.open('favicon_base.png')
size = bg.width

# We already have favicon_base.png which is perfectly composed.
# But if we embed it in SVG, the background is rasterized.
# To make a crisp SVG, we can just embed favicon_base.png in an SVG container,
# or we can extract just the logo and draw the rect in SVG.
# Since we already have the optically centered composite image, let's just embed it.
# Wait, user said: "If using a rounded rectangle: <rect x="0" y="0" width="64" height="64" rx="14" />"
# This implies they want the SVG vector code for the background!

# We can re-extract the logo mark from the previous script and base64 it.
# Actually, the python script earlier saved `favicon_base.png`. Let's just create an SVG with the base64 of `favicon_base.png` inside it? No, let's embed the transparent logo mark, not the background.

img = Image.open('assets/khunyikalsal-logo.png').convert("RGBA")
width, height = img.size

datas = img.getdata()
newData = []
for item in datas:
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)
img.putdata(newData)

# Find bounds
rows = [any(img.getpixel((x, y))[3] > 0 for x in range(width)) for y in range(height)]
top = next(i for i, v in enumerate(rows) if v)
bottom = top
gap = 0
while bottom < height:
    if not rows[bottom]:
        gap += 1
        if gap > 20: break
    else: gap = 0
    bottom += 1

bottom_mark = bottom - gap
left_mark = width
right_mark = 0
for y in range(top, bottom_mark + 1):
    for x in range(width):
        if img.getpixel((x, y))[3] > 0:
            left_mark = min(left_mark, x)
            right_mark = max(right_mark, x)

logo_mark = img.crop((left_mark, top, right_mark, bottom_mark))

# Find black bounds
left_b, right_b, top_b, bottom_b = logo_mark.width, 0, logo_mark.height, 0
for y in range(logo_mark.height):
    for x in range(logo_mark.width):
        r, g, b, a = logo_mark.getpixel((x, y))
        if a > 0 and r < 100 and g < 100 and b < 100:
            left_b = min(left_b, x)
            right_b = max(right_b, x)
            top_b = min(top_b, y)
            bottom_b = max(bottom_b, y)

cx_black = (left_b + right_b) / 2.0
cy_black = (top_b + bottom_b) / 2.0
size_black = max(right_b - left_b, bottom_b - top_b)
full_size = int(size_black * 1.6)

# Scale down logo_mark for the SVG to save file size (64x64 SVG viewport)
svg_size = 128
scale = svg_size / full_size

new_w = int(logo_mark.width * scale)
new_h = int(logo_mark.height * scale)
logo_mark_resized = logo_mark.resize((new_w, new_h), Image.Resampling.LANCZOS)

cx_black_scaled = cx_black * scale
cy_black_scaled = cy_black * scale

paste_x = (svg_size / 2.0) - cx_black_scaled
paste_y = (svg_size / 2.0) - cy_black_scaled

buffer = BytesIO()
logo_mark_resized.save(buffer, format="PNG")
b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

svg = f'''<svg width="{svg_size}" height="{svg_size}" viewBox="0 0 {svg_size} {svg_size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="{svg_size}" height="{svg_size}" rx="{svg_size * 0.25}" fill="#ffffff" />
    <image x="{paste_x}" y="{paste_y}" width="{new_w}" height="{new_h}" href="data:image/png;base64,{b64}" />
</svg>'''

with open('favicon.svg', 'w') as f:
    f.write(svg)
print("favicon.svg generated!")
