---
# layout: '@layouts/markdown-post-layout.astro'
title: Selection Sort
published: 2017-09-18
description: 'Implementation and application of Selection Sort in PHP'
image: '@assets/posts/placeholder-globules.png'
tags: ["Selection Sort", "Sorting", "Algorithms", "PHP"]
---

## Display the sorted array of the given array

```
// you can write to stdout for debugging purposes, e.g.
// print "this is a debug message\n";
function getHighest(& $list, $lo, $hi) {
    $large = $lo;
    for($h = $lo + 1; $h <= $hi; $h++) {
        if($list[$h] > $list[$large]) {
            $large = $h;
        }
    }
    return $large;
}

function swap(& $list, $i, $j) {
    $hold = $list[$i];
    $list[$i] = $list[$j];
    $list[$j] = $hold;
}

function selectionSort(& $list, $lo, $hi) {
    for($h = $lo; $h < $hi; $h++) {
        swap($list, $h, getHighest($list, $h, $hi));
    }    
}

function solution($N) {
    // write your code in PHP7.0
    $n = str_split($N);
    $len = count($n);
    $max = $n;
    selectionSort($max, 0, $len -1);
    $m = +(join('', $max));
    
    if($m > 100000000) {
        return -1;
    }
    return $m;
}
```

## Get the difference between the sorted and original array

```
// you can write to stdout for debugging purposes, e.g.
// print "this is a debug message\n";

function getSmallest(& $list, $lo, $hi) {
    $small = $lo;
    for($h = $lo + 1; $h <= $hi; $h++) {
        if($list[$h] < $list[$small]) {
            $small = $h;
        }
    }
    return $small;
}

function swap(& $list, $i, $j) {
    $hold = $list[$i];
    $list[$i] = $list[$j];
    $list[$j] = $hold;
}

function equal($a, $b) {
    return ($a === $b);
}

function selectionSort(& $list, $lo, $hi) {
    for($h = $lo; $h < $hi; $h++) {
        swap($list, $h, getSmallest($list, $h, $hi));
    }     
}

function solution($A) {
    // write your code in PHP7.0
    $len = count($A);
    $list = $A;
    selectionSort($list, 0, $len - 1);
    if(equal($list, $A)) {
        return true;
    } 
    $diff = 0;
    for($i = 0; $i < $len; $i++) {
        if($list[$i] !== $A[$i]) {
            $diff++;
        }
    }
    // if more than two elements are different return false
    return ($diff <= 2);
}
```
