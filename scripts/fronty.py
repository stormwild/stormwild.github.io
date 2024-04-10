import glob
import re
from datetime import datetime

# Updated pattern to match the existing YAML frontmatter in the Markdown files,
# including an optional excerpt and redirect_from.
frontmatter_pattern = re.compile(
    r'^---\ntitle: (.+)\npermalink: (.+?)(?:\nexcerpt: (.*?))?(?:\nredirect_from: (.*?))?\n---',
    re.MULTILINE | re.DOTALL
)

# Function to replace the frontmatter
def replace_frontmatter(content, title, permalink, excerpt):
    # Use the title as the description if excerpt is None or empty
    description = excerpt if excerpt else title
    new_frontmatter = f"""---
# layout: '@layouts/markdown-post-layout.astro'
title: '{title}'
published: {datetime.now().strftime('%Y-%m-%d')}
description: '{description}'
image: '@assets/posts/placeholder-alien-city.png'
tags: ["default"]
---"""
    return re.sub(frontmatter_pattern, new_frontmatter, content)

# Iterate over all markdown files in the current directory
for filepath in glob.glob('*.md'):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if the file contains the YAML frontmatter
    match = frontmatter_pattern.search(content)
    if match:
        title, permalink, excerpt, _ = match.groups()  # _ ignores the redirect_from field
        new_content = replace_frontmatter(content, title, permalink, excerpt)
        
        # Write the modified content back to the file
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Updated frontmatter in {filepath}')
