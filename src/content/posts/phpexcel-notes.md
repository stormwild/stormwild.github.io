---
# layout: '@layouts/markdown-post-layout.astro'
title: 'PHPExcel Notes'
published: 2016-09-23
description: 'PHPExcel Notes'
image: '@assets/posts/placeholder-red-circle.png'
tags: ["default"]
---

Notes from initial research on [PHPExcel](https://github.com/PHPOffice/PHPExcel).

```php
<?php

$excel = PHPExcel_IOFactory::load($full_path);

$worksheet = $excel->getActiveSheet();

$sheetCount = $excel->getSheetCount();

$sheetNames = $excel->getSheetNames();

$datasheet = $excel->getSheetByName('data'); // returns null if name does not exist
```
