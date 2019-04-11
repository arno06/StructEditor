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
var valueJSON = StructEditor.getInstance('input[data-role="StructEditor"]').getJSON();
console.log(valueJSON);
```