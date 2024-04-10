---
# layout: '@layouts/markdown-post-layout.astro'
title: 'Flow'
published: 2017-09-02
description: 'Flow is a static type checker for your JavaScript code.'
image: '@assets/posts/placeholder-globules.png'
tags: ["default"]
---

## Notes on [Flow](https://flow.org/en/)

A copy paste of selections from the documentation.

> Flow is a static type checker for your JavaScript code.

You can write type annotations on your code to allow Flow to check your code for errors.

For example:

```js
// @flow
function square(n: number): number {
    return n * n;
    
}

square("2"); // Error!
```

## Setup

To allow Flow to check this code for type errors, configure your project to use Flow:

1. Install Flow and a compiler to strip away type annotations

    Babel or flow-remove-types can be installed to remove the type annotations from your code.

    When using babel, install `babel-cli` and `babel-preset-flow`

    ```
    npm install babel-cli babel-preset-flow
    ```

    Add flow to your babel presets array in `.babelrc`

    ```
    {
      "presets": ["flow"]
    }
    ```

2. Add flow

    ```
    npm install --save-dev flow-bin
    ```

    Add a flow script to your `package.json`

    ```
    {
      "name": "my-flow-project",
      "version": "1.0.0",
      "devDependencies": {
        "flow-bin": "^0.41.0"
      },
      "scripts": {
        "flow": "flow"
      }
    }
    ```

3. Configure the project to use Flow

    ```
    npm run flow init
    ```

    This creates a [`.flowconfig`](https://flow.org/en/docs/config/) file which allows you to configure and customize Flow such as the path to the code.

4. Run flow to check for type errors

    ```
    npm run flow
    ```

    This is equivalent to `flow status`

    ```
    npm run flow status
    ```

    Which runs flow as a background process.

    Only one instance of the background process regardless of how many times `flow status` is called

    To stop the background process

    ```
    npm run flow stop
    ```

    Flow will check source code files for error if the file begins with flow flag:

    ```js
    // @flow
    /* @flow */
    ```

    It will skip files without the flag unless `flow check --all` is called.

## Writing Flow

You can now begin to write JavaScript code with type annotations.

```js
// @flow

function foo(x: ?number): string {
  if (x) {
    return x;
  }
  return "default string";
}
```

For the code above running flow will yield the following:

```
test.js:5
  5:     return x;
                ^ number. This type is incompatible with the expected return type of
  3: function foo(x: ?number): string {
                               ^^^^^^ string
```

## Primitive Types

Primitive types can be literal values `true "hello" 3.14 null undefined` or constructed wrapper objects `new Boolean(false) new String("world")`.

Types for literal values are lowercase and wrapper objects are capitalized.

Boolean values need to be explicitly converted to boolean using `Boolean(x) or !!x`.

## Maybe Types

Maybe types are for places where a value is optional and you can create them by adding a question mark in front of the type such as `?string` or `?number`.

## Optional Object Properties

Object types can have optional properties where a question mark `?` comes after the property name.

```js
{ propertyName?: string }
```

In addition to their set value type, these optional properties can either be void or omitted altogether. However, they cannot be `null`.

```js
// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}

acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!
```

## Optional function parameters

Functions can have optional parameters where a question mark `?` comes after the parameter name.

```js
function method(param?: string) { /* ... */ }
```

In addition to their set type, these optional parameters can either be void or omitted altogether. However, they cannot be `null`.

```js
// @flow
function acceptsOptionalString(value?: string) {
  // ...
}

acceptsOptionalString("bar");     // Works!
acceptsOptionalString(undefined); // Works!
acceptsOptionalString(null);      // Error!
acceptsOptionalString();          // Works!
```

## Function parameters with defaults

Function parameters can also have defaults. This is a feature of ECMAScript 2015.

```js
function method(value: string = "default") { /* ... */ }
```

In addition to their set type, default parameters can also be void or omitted altogether. However, they cannot be `null`.

```js
// @flow
function acceptsOptionalString(value: string = "foo") {
  // ...
}

acceptsOptionalString("bar");     // Works!
acceptsOptionalString(undefined); // Works!
acceptsOptionalString(null);      // Error!
acceptsOptionalString();          // Works!
```

## Symbols

Symbols are not currently supported by Flow. You can see these two issues for more information:

- [facebook/flow#810](https://github.com/facebook/flow/issues/810)
- [facebook/flow#1015](https://github.com/facebook/flow/issues/1015)

## Literal Types

Using literal values as types

> Flow has primitive types for literal values, but can also use literal values as types.

> For example, instead of accepting number type, we could accept only the literal value 2.

> ```js
> // @flow
> function acceptsTwo(value: 2) {
>   // ...
> }
> 
> acceptsTwo(2);   // Works!
> // $ExpectError
> acceptsTwo(3);   // Error!
> // $ExpectError
> acceptsTwo("2"); // Error!
> ```

> Using these with union types is powerful:

> ```js
> // @flow
> function getColor(name: "success" | "warning" | "danger") {
>   switch (name) {
>     case "success" : return "green";
>     case "warning" : return "yellow";
>     case "danger"  : return "red";
>   }
> }
>
> getColor("success"); // Works!
> getColor("danger");  // Works!
> // $ExpectError
> getColor("error");   // Error!
> ```

## Mixed Types

A single type:

Here the input value can only be a number.

```js
function square(n: number): number {
  return n * n;
}
```

A group of different possible types:

```js
function stringifyBasicValue(value: string | number) {
  return '' + value;
}
```

A type based on another type:

Here the return type will be the same as the type of whatever value is passed into the function.

```js
function identity<T>(value: T): T {
  return value;
}
```

These three are the most common categories of types. They will make up the majority of the types you’ll be writing.

However, there is also a fourth category.

An arbitrary type that could be anything:

Here the passed in value is an unknown type, it could be any type and the function would still work.

```js
function getTypeOf(value: mixed): string {
  return typeof value;
}
```

When you try to use a value of a `mixed` type you must first figure out what the actual type is or you’ll end up with an error.

```js
// @flow
function stringify(value: mixed) {
  // $ExpectError
  return "" + value; // Error!
}

stringify("foo");
```

Instead you must ensure the value is a certain type by refining it.

```js
// @flow
function stringify(value: mixed) {
  if (typeof value === 'string') {
    return "" + value; // Works!
  } else {
    return "";
  }
}

stringify("foo");
```

Because of the `typeof value === 'string'` check, Flow knows the `value` can only be a `string` inside of the `if` statement. This is known as a [refinement](https://flow.org/en/docs/lang/refinements/).

## References

- [Flow](https://flow.org/en/)
- [Install Flow](https://flow.org/en/docs/install/)
