StructEditor
======

Dependencies
-----
  * None

Usage
-----
```html
<input type="text" value="{\"some\":"\json\"}" data-role="StructEditor"/>
```

```js
var element = document.querySelector('input[data-role="StructEditor"]');
console.log(element.getAttribute("value"));
```