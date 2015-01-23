#color-changer
Change img element colors

##Usage

```js
var elem = document.getElementById('someImg');

var opt = {
  from: {
    r: {great: 100},
    g: {less: 150},
    b: {great: 200, less: 250}
  },
  to: {
    r: 0,
    g: 0,
    b: 255
  }
};

var colorChanger = new ColorChanger(elem, opt);

colorChanger.changeColor();
```

##API

##Methods

###changeColor
Change from color to color

###changeOriginal
Change from color to original color

##Install
```
npm install temp-name-here/color-changer
```
