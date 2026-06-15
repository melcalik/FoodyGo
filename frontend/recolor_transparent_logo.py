import sys
from PIL import Image

def recolor_transparent_logo(input_path, output_path, fg_color_hex):
    # Convert hex to RGB
    fg_color = tuple(int(fg_color_hex.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
    
    img = Image.open(input_path).convert("RGBA")
    pixels = img.load()
    
    width, height = img.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Replace the color, keep the original alpha
                pixels[x, y] = (fg_color[0], fg_color[1], fg_color[2], a)
                
    img.save(output_path)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python recolor_transparent_logo.py <input> <output> <fg_hex>")
        sys.exit(1)
        
    recolor_transparent_logo(sys.argv[1], sys.argv[2], sys.argv[3])
