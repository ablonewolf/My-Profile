"""Regenerate the SVG's AB monogram as browser-compatible raster icons (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
scale = 16
image = Image.new('RGB', (64 * scale, 64 * scale), '#2563eb')
draw = ImageDraw.Draw(image)
def line(points):
    points = [(round(x * scale), round(y * scale)) for x, y in points]
    draw.line(points, fill='white', width=5 * scale, joint='curve')
    for x, y in points:
        draw.ellipse((x-2.5*scale,y-2.5*scale,x+2.5*scale,y+2.5*scale),fill='white')
def curve(start, a, b, end):
    return [tuple((1-t)**3*start[j]+3*(1-t)**2*t*a[j]+3*(1-t)*t*t*b[j]+t**3*end[j] for j in range(2)) for t in [i/100 for i in range(101)]]
line([(12,43),(21,20),(30,43)])
line([(16,34),(26,34)])
line([(37,20),(37,43)])
line([(37,20),(44,20)]+curve((44,20),(54,20),(54,31),(44,31))+[(37,31)])
line([(37,31),(44,31)]+curve((44,31),(55,31),(55,43),(44,43))+[(37,43)])
for size, name in [(48,'favicon-48.png'),(192,'favicon-192.png'),(180,'apple-touch-icon.png')]:
    image.resize((size,size), Image.Resampling.LANCZOS).save(root/'public'/name)
image.resize((64,64), Image.Resampling.LANCZOS).save(root/'public/favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64)])
