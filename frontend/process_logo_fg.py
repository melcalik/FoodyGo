import sys
from PIL import Image

def process_logo_fg(input_path, output_path, fg_color_hex):
    # Convert hex to RGB
    fg_color = tuple(int(fg_color_hex.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))

    # Open the image
    img = Image.open(input_path).convert("RGBA")
    
    # Extract alpha channel to use as mask
    alpha = img.split()[3]
    
    # Create a solid foreground image
    fg = Image.new("RGBA", img.size, fg_color + (255,))
    
    # Put alpha back into the new foreground
    fg.putalpha(alpha)
    
    # Save the result as PNG to preserve transparency
    fg.save(output_path)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python process_logo_fg.py <input> <output> <fg_hex>")
        sys.exit(1)
        
    process_logo_fg(sys.argv[1], sys.argv[2], sys.argv[3])
