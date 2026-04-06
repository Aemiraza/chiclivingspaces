from PIL import Image
import os
from PIL import ImageOps
import glob

# Search for the recently generated png files
pattern = r"C:\Users\Raza Ansari\.gemini\antigravity\brain\1992f023-9725-4c87-904a-b8c74c53fdea\*.png"
files = glob.glob(pattern)

# Output mapping
output_dir = r"C:\Users\Raza Ansari\OneDrive\Desktop\AntiGravity\ChicLivingSpaces\images"
os.makedirs(output_dir, exist_ok=True)

for file in files:
    # Get base name to map
    basename = os.path.basename(file)
    if "bd_bed" in basename:
        out_name = "bd-bed.webp"
    elif "bd_nightstand" in basename:
        out_name = "bd-nightstand.webp"
    elif "bd_vanity" in basename:
        out_name = "bd-vanity.webp"
    elif "kt_cabinets" in basename:
        out_name = "kt-cabinets.webp"
    elif "kt_island" in basename:
        out_name = "kt-island.webp"
    elif "kt_counter" in basename:
        out_name = "kt-counter.webp"
    elif "bt_tub" in basename:
        out_name = "bt-tub.webp"
    elif "bt_vanity" in basename:
        out_name = "bt-vanity.webp"
    else:
        continue # Skip others
        
    output_path = os.path.join(output_dir, out_name)
    try:
        img = Image.open(file)
        processed = ImageOps.fit(img, (600, 750), method=Image.Resampling.LANCZOS)
        processed.save(output_path, "WEBP", quality=82, method=6)
        print(f"Processed: {output_path}")
    except Exception as e:
        print(f"Failed to process {file}. Error: {e}")
