StructEditor
======

Dependencies
-----
  * [Class](https://dependencies.arnaud-nicolas.fr/?need=Class)
  * [EventDispatcher](https://dependencies.arnaud-nicolas.fr/?need=EventDispatcher)
  * [Template](https://dependencies.arnaud-nicolas.fr/?need=Template)

Usage
-----
```html
<input type="text" value="{\"some\":"\json\"}" data-role="StructEditor"/>
```

```js
var valueJSON = StructEditor.getInstance('input[data-role="StructEditor"]').getJSON();
console.log(valueJSON);
```