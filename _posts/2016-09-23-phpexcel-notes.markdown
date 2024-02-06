---
title: PHPExcel Notes
permalink: phpexcel-notes
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