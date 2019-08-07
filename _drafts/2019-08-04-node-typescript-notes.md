---
title: Node TypeScript Notes
permalink: node-typescript-notes
---

## Pre-requisites

- [NodeJs](https://nodejs.org/en/) 
- [Visual Studio Code](https://code.visualstudio.com/)

## Setup

```
mkdir project && cd project
npm init 
```

## Dev Dependencies

## Generate `.tsconfig`

Check if tsc is exists

```
tsc -v
```

Install typescript globally

```
npm i -g typescript
```

Or, install locally and use npx

```
npm i -D typescript
npx tsc -v
```

Create the `.tsconfig` file

```
tsc --init
```

or 

```
npx tsc --init
```


## References

- [Setting Up a Node Project With Typescript](https://scotch.io/tutorials/setting-up-a-node-project-with-typescript)
- [How To Create Your Own TypeScript CLI — With Node.js](https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89)
- [How can I generate tsconfig.json file?](https://stackoverflow.com/questions/36916989/how-can-i-generate-tsconfig-json-file) 