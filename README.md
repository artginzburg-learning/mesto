<div align="center">

# [React](https://reactjs.org) className from an Array
<sup>Just type [<code>git.io/toClassNames</code>](https://git.io/toClassNames) to go here</sup>

> This is a simplified version of [npm classnames](https://www.npmjs.com/package/classnames) for projects with a limited list of depencendies (e.g. university homework).

<br />

</div>
 
### Example with `classNames()`
> Use [Spread syntax (...)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to make it succinct and simple.

```js
import { classNames } from '../functions/toClassNames';
```

```jsx
// logo.jsx
<a {...classNames(['logo', '', isInHeader && 'header__logo'])} onClick={showUnicorns}>
```
<div align="center">

<sup>outputs **className="logo header__logo"**</sup>

</div>

<br />
<br />

_If you're not satisfied with using spread syntax in such context, your perfect option would be the following:_

### Example with `toClassNames()`
> Pass anything to the array that generates into a string, without worries about `' '`, `undefined`, `false` [etc.](https://developer.mozilla.org/en-US/docs/Glossary/Falsy "Falsey values in JS") being output:

```js
import { toClassNames } from '../functions/toClassNames';
```

```jsx
// link.jsx

const linkClasses = [
  linkStyle,
  (props.selectedIndex === index) && 'is-selected',
];

<a className={ toClassNames(linkClasses) } href={pkg.repo}>...</a>
```
<sup>now it doesn't matter how <code>linkStyle</code> was even defined in the first place
