import os

directory = r'c:\Users\Raza Ansari\OneDrive\Desktop\AntiGravity\ChicLivingSpaces'
base_url = 'https://chiclivingspaces.com/'

html_files = [f for f in os.listdir(directory) if f.endswith('.html')]
updated = 0

for filename in html_files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '<link rel="canonical"' in content:
        continue # Already has canonical
        
    url_path = '' if filename == 'index.html' else filename
    canonical_tag = f'\n    <link rel="canonical" href="{base_url}{url_path}">\n'
    
    # Insert right before </head>
    new_content = content.replace('</head>', canonical_tag + '</head>', 1)
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(new_content)
    updated += 1

print(f'Added canonical tags to {updated} out of {len(html_files)} HTML files.')
