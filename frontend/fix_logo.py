import sys
from PIL import Image

def fix_logo_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGB")
    pixels = img.load()
    
    width, height = img.size
    
    # Create a new RGBA image
    out_img = Image.new("RGBA", (width, height))
    out_pixels = out_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            
            # Estimate alpha from the Red channel
            alpha_f = min(1.0, max(0.0, r / 250.0))
            
            if alpha_f > 0:
                # Un-premultiply alpha
                new_r = min(255, int(r / alpha_f))
                new_g = min(255, int(g / alpha_f))
                new_b = min(255, int(b / alpha_f))
                out_pixels[x, y] = (new_r, new_g, new_b, int(alpha_f * 255))
            else:
                out_pixels[x, y] = (0, 0, 0, 0)
                
    out_img.save(output_path)

if __name__ == "__main__":
    fix_logo_transparent(sys.argv[1], sys.argv[2])
