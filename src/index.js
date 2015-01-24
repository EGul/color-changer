
(function () {

  'use strict';

  function ColorChanger(elem, opt) {

    var originalData = getData(elem);
    var toData = getData(elem);
    var fromOpt = (typeof opt.from !== 'undefined') ? opt.from : { };
    var toOpt = (typeof opt.to !== 'undefined') ? opt.to : { };
    var extname = elem.src.split('.')[elem.src.split('.').length - 1];

    var rgba = ['r', 'g', 'b', 'a'];
    while(rgba.length) {
      var current = rgba.shift();
      if (!fromOpt.hasOwnProperty(current)) fromOpt[current] = {great: -1};
      if (!toOpt.hasOwnProperty(current)) toOpt[current] = {plus: 0};
    }

    var toData = getToData(toData, fromOpt, toOpt);

    this.changeColor = function () {
      setData(elem, toData, extname);
    }

    this.changeOriginal = function () {
      setData(elem, originalData, extname);
    }

  }

  function isInRange(d, from) {

    var rgba = ['r', 'g', 'b', 'a'];
    while(rgba.length) {

      var current = rgba.shift();
      var currentData = d[current];
      var currentFrom = from[current];

      if (typeof currentFrom === 'number') {
        if (currentData != currentFrom) return false;
      }
      else {
        if (currentFrom.hasOwnProperty('great')) {
          if (!(currentData > currentFrom.great)) return false;
        }
        if (currentFrom.hasOwnProperty('less')) {
          if (!(currentData < currentFrom.less)) return false;
        }
      }

    }

    return true;
  }

  function getD(d, t) {

    if(typeof t !== 'object') {
      return t;
    }
    else {

      var result = d;

      if (t.hasOwnProperty('plus')) result = result + t.plus;
      if (t.hasOwnProperty('minus')) result = result - t.minus;

      return result;
    }

  }

  function getToData(toData, fromOpt, toOpt) {

    for (var i = 0, l = toData.data.length; i < l; i = i + 4) {

      var d = {
        r: toData.data[i],
        g: toData.data[i + 1],
        b: toData.data[i + 2],
        a: toData.data[i + 3]
      };

      if (isInRange(d, fromOpt)) {
        toData.data[i] = getD(toData.data[i], toOpt.r);
        toData.data[i + 1] = getD(toData.data[i + 1], toOpt.g);
        toData.data[i + 2] = getD(toData.data[i + 2], toOpt.b);
        toData.data[i + 3] = getD(toData.data[i + 3], toOpt.a);
      }

    }

    return toData;
  }

  function getData(elem) {

    var data;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = elem.width;
    canvas.height = elem.height;

    ctx.drawImage(elem, 0, 0, elem.naturalWidth, elem.naturalHeight, 0, 0, elem.width, elem.height);
    data = ctx.getImageData(0, 0, elem.width, elem.height);

    elem.onload = false;

    return data;
  }

  function setData(elem, data, extname) {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = elem.width;
    canvas.height = elem.height;

    ctx.putImageData(data, 0, 0);
    elem.src = canvas.toDataURL('image/' + extname);

  }

  window.ColorChanger = ColorChanger;

})();
