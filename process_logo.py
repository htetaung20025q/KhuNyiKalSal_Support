from PIL import Image, ImageDraw

img = Image.open('assets/khunyikalsal-logo.png').convert("RGBA")
width, height = img.size

# Find bounds of the non-white pixels (logo mark + text)
# We know the text is at the bottom. We want only the top part.
# The logo has a black square and a red cross.
# We'll just extract the top part and put it on a white circle/squircle.
datas = img.getdata()
newData = []
for item in datas:
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)
img.putdata(newData)

# Find top and bottom bounds of the logo mark
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

left = width
right = 0
for y in range(top, bottom_of_mark + 1):
    for x in range(width):
        if img.getpixel((x, y))[3] > 0:
            if x < left: left = x
            if x > right: right = x

# Crop the logo mark
logo_mark = img.crop((left, top, right, bottom_of_mark))

# Create a squircle / rounded rect background
mw = right - left
mh = bottom_of_mark - top
size = max(mw, mh)
padding = int(size * 0.2)
full_size = size + padding * 2

bg = Image.new("RGBA", (full_size, full_size), (255, 255, 255, 0))
draw = ImageDraw.Draw(bg)

# Draw a white rounded rectangle (squircle)
radius = int(full_size * 0.25)
draw.rounded_rectangle((0, 0, full_size, full_size), radius=radius, fill=(255, 255, 255, 255))

# Paste the logo mark into the center
paste_x = (full_size - mw) // 2
paste_y = (full_size - mh) // 2
bg.paste(logo_mark, (paste_x, paste_y), logo_mark)

bg.save('favicon_base.png')
bg.resize((32, 32), Image.Resampling.LANCZOS).save('favicon-32x32.png')
bg.resize((16, 16), Image.Resampling.LANCZOS).save('favicon-16x16.png')
bg.resize((180, 180), Image.Resampling.LANCZOS).save('apple-touch-icon.png')
print("Favicons generated successfully.")
