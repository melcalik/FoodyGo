import sys
from PIL import Image

def process_logo(input_path, output_path, bg_color_hex, fg_color_hex):
    # Convert hex to RGB
    bg_color = tuple(int(bg_color_hex.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
    fg_color = tuple(int(fg_color_hex.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))

    # Open the image
    img = Image.open(input_path).convert("RGBA")
    
    # Create a solid background
    bg = Image.new("RGBA", img.size, bg_color + (255,))
    
    # Extract alpha channel to use as mask
    alpha = img.split()[3]
    
    # Create a solid foreground image
    fg = Image.new("RGBA", img.size, fg_color + (255,))
    
    # Composite foreground over background using the original alpha as mask
    result = Image.composite(fg, bg, alpha)
    
    # Save the result as RGB (no transparency) since it's for iOS App Icon
    result.convert("RGB").save(output_path)

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python process_logo.py <input> <output> <bg_hex> <fg_hex>")
        sys.exit(1)
        
    process_logo(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
