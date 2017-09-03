---
title: Metaprogramming in ES6 Symbols
permalink: metaprogramming-in-es6-symbols
excerpt: One feature in metaprogramming provided in ES6 is Symbols
---

> [Metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming) is a programming technique in which computer programs have the ability to treat programs as their data. It means that a program can be designed to read, generate, analyse or transform other programs, and even modify itself while running.[1][2] In some cases, this allows programmers to minimize the number of lines of code to express a solution, and thus reducing the development time.[3] It also allows programs greater flexibility to efficiently handle new situations without recompilation.

One aspect of metaprogramming is code generation, in JavaScript `eval` is used to evaluate or execute expressions or statements from string arguments.

> If the argument of [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) is not a string, `eval()` returns the argument unchanged.

> ```js
> eval(new String('2 + 2')); // returns a String object containing "2 + 2"
> eval('2 + 2');             // returns 4
> ```

> You can work around this limitation in a generic fashion by using toString().

> ```js
> var expression = new String('2 + 2');
> eval(expression.toString());
> ```

> Don't use eval needlessly

> `eval()` is a dangerous function, which executes the code it's passed with the privileges of the caller. If you run `eval()` with a string that could be affected by a malicious party, you may end up running malicious code on the user's machine with the permissions of your webpage / extension.

