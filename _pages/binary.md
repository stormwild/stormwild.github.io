---
layout: material-home
title: Binary
permalink: binary
---

Notes on understanding binary, decimal, hexadecimal numbers and conversions.

## Learning Objectives

- Convert from binary to decimal and vice versa
- Convert from binary to hexadecimal and vice versa
- Convert from hexadecimal to decimal and vice versa

### Decimals or Base 10

Decimal system uses 10 as a base and the numbers range from 0 to 9.

```
129 = 100 + 20 + 9

9 = 9 * 10^0 (Note that 10^0 is equal to 1)
20 = 2 * 10^1
100 = 1 * 10^2

Powers of ten

10^0 = 1
10^1 = 10
10^2 = 100
10^3 = 1000
```

### Binary or Base 2

Binary numbers are base 2 numbers and have only two values: 0 and 1.

```
Binary 101 has 1 in the units column, 0 in the 2s column and 1 in the 4s column.

1 = 1 * 2^0 units
0 = 0 * 2^1 twos
1 = 1 * 2^2 fours

2^0 = 1
2^1 = 2
2^2 = 4
2^3 = 8
```

### Binary To Decimal Conversion

Convert ```101``` to decimal

```
(1 * 1) + (0 * 2) + (1 * 4) = 5
```

Convert ```111``` to decimal

```
(1 * 1) + (1 * 2) + (1 * 4) = 7
```

8 bits equals 1 byte

```
  0   0   0   0  0  0  0  0
128  64  32  16  8  4  2  1
```

Resources

[Binary Numbers Explained – Beginners Guide](http://www.steves-internet-guide.com/binary-numbers-explained/)