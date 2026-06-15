import sys
from PIL import Image

def process_logo_bg(input_path, output_path, bg_color_hex):
    # Convert hex to RGB
    bg_color = tuple(int(bg_color_hex.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))

    # Open the image
    img = Image.open(input_path).convert("RGBA")
    
    # Create a solid background
    bg = Image.new("RGBA", img.size, bg_color + (255,))
    
    # Composite foreground (original image) over background
    result = Image.alpha_composite(bg, img)
    
    # Save the result as RGB (no transparency)
    result.convert("RGB").save(output_path)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python process_logo_bg.py <input> <output> <bg_hex>")
        sys.exit(1)
        
    process_logo_bg(sys.argv[1], sys.argv[2], sys.argv[3])
