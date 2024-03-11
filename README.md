# complimentary-color
Get the complementary color to any given color.

<code><img height="30" src="https://img.shields.io/badge/NPM-111111?style=for-the-badge&logo=npm&logoColor=#c63635"></code>
<code><img height="30" src="https://img.shields.io/badge/JavaScript-111111?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></code>


# Installation

```shell
npm i complimentary-color
```

> for modern JavaScript projects using ESM:

```js
import compliColor from 'complimentary-color';
```

> Using traditional method for Node.js projects that follow the CommonJS module system:

```js
const compliColor = require('complimentary-color');
```

# Usage

- Get Complimentary Color in RGB

```js
console.log(compliColor.process("rgb(113,256,228)"));
// returns - rgb(256,113,141)
```

- Get Complimentary Color in HSL

```js
console.log(compliColor.process("hsl(120,50%,50%)"));
// returns - hsl(300,50.00%,50.00%)
```

- Get Complimentary Color in HEX

```js
console.log(compliColor.process("#ff00ff"));
// returns - #00ff0
```