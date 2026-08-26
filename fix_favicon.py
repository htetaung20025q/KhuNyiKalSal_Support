from PIL import Image, ImageDraw

# Open original logo
img = Image.open('assets/khunyikalsal-logo.png').convert("RGBA")
width, height = img.size

# Step 1: Make white transparent and keep all non-white
datas = img.getdata()
newData = []
for item in datas:
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)
img.putdata(newData)

# Step 2: Find bounds of the top logo mark (ignoring the text at the bottom)
rows = []
for y in range(height):
    has_pixels = any(img.getpixel((x, y))[3] > 0 for x in range(width))
    rows.append(has_pixels)

top = 0
while top < height and not rows[top]: top += 1

bottom = top
gap_size = 0
while bottom < height:
    if not rows[bottom]:
        gap_size += 1
        if gap_size > 20:
            break
    else:
        gap_size = 0
    bottom += 1

bottom_of_mark = bottom - gap_size

# Left and Right of all pixels in the mark
left_mark = width
right_mark = 0
for y in range(top, bottom_of_mark + 1):
    for x in range(width):
        if img.getpixel((x, y))[3] > 0:
            if x < left_mark: left_mark = x
            if x > right_mark: right_mark = x

# Crop the full mark
logo_mark = img.crop((left_mark, top, right_mark, bottom_of_mark))

# Step 3: Find the bounds of the BLACK pixels in the mark (this is the main square anchor)
# We will use this to optically center the favicon.
left_b = logo_mark.width
right_b = 0
top_b = logo_mark.height
bottom_b = 0

for y in range(logo_mark.height):
    for x in range(logo_mark.width):
        r, g, b, a = logo_mark.getpixel((x, y))
        if a > 0 and r < 100 and g < 100 and b < 100:
            if x < left_b: left_b = x
            if x > right_b: right_b = x
            if y < top_b: top_b = y
            if y > bottom_b: bottom_b = y

cx_black = (left_b + right_b) / 2.0
cy_black = (top_b + bottom_b) / 2.0
size_black = max(right_b - left_b, bottom_b - top_b)

# Step 4: Create the squircle background
# Make the full favicon size 1.6x the size of the black square for nice padding
full_size = int(size_black * 1.6)

bg = Image.new("RGBA", (full_size, full_size), (255, 255, 255, 0))
draw = ImageDraw.Draw(bg)

# Draw white rounded rectangle (squircle)
radius = int(full_size * 0.25)
draw.rounded_rectangle((0, 0, full_size, full_size), radius=radius, fill=(255, 255, 255, 255))

# Step 5: Paste the logo_mark such that cx_black and cy_black align with the center of the squircle
center = full_size / 2.0
paste_x = int(center - cx_black)
paste_y = int(center - cy_black)

bg.paste(logo_mark, (paste_x, paste_y), logo_mark)

# Save the final favicons
bg.save('favicon_base.png')
bg.resize((32, 32), Image.Resampling.LANCZOS).save('favicon-32x32.png')
bg.resize((16, 16), Image.Resampling.LANCZOS).save('favicon-16x16.png')
bg.resize((180, 180), Image.Resampling.LANCZOS).save('apple-touch-icon.png')
print("Optically centered favicons generated successfully.")
