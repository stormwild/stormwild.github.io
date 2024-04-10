#!/bin/bash

for file in *.md; do
    #mv "$file" "${file%.markdown}.md"
    newname=$(echo "$file" | sed 's/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//;s/\.markdown$/.md/')
    echo "$file"
    echo "$newname"
    echo "--------------"
    mv "$file" "$newname"
done
