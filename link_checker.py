import os
import re

directory = r'c:\Users\Raza Ansari\OneDrive\Desktop\AntiGravity\ChicLivingSpaces'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

broken_links = []

for filename in html_files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check internal hrefs
    hrefs = re.findall(r'href="(?!http|mailto|tel|#)([^"]+)"', content)
    for href in hrefs:
        # Some are like index.html#categories, so strip url hash
        base_href = href.split('#')[0]
        if not base_href: continue
            
        target = os.path.join(directory, base_href)
        if not os.path.exists(target):
            broken_links.append((filename, href))
            
    # Check internal src
    srcs = re.findall(r'src="(?!http)([^"]+)"', content)
    for src in srcs:
        target = os.path.join(directory, src)
        if not os.path.exists(target):
            broken_links.append((filename, src))

if broken_links:
    print("Found broken links:")
    for doc, link in set(broken_links):
        print(f"{doc}: points to non-existent '{link}'")
else:
    print("All internal links and image sources are 100% valid!")
