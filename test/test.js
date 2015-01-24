
var shouldArr =
[100, 100, 100, 255,
100, 100, 100, 255,
100, 100, 100, 255,
100, 100, 100, 255];

var tempArr =
[50, 100, 150, 255,
50, 100, 150, 255,
50, 100, 150, 255,
50, 100, 150, 255];

describe('ColorChanger', function () {

  describe('changeColor', function () {

    it('should equal [100, 100, 100, 255]', function () {

      var tempElem = getTempElem(tempArr);

      var opt = {
        from: {
          r: 50,
          g: 100,
          b: 150
        },
        to: {
          r: 100,
          g: 100,
          b: 100
        }
      };

      var colorChanger = new ColorChanger(tempElem, opt);
      colorChanger.changeColor();

      expect(getData(tempElem).data).to.eql(shouldArr);

    });

    it('should equal [100, 100, 100, 255]', function () {

      var tempElem = getTempElem(tempArr);

      var opt = {
        from: {
          r: {great: 0},
          g: {less: 150},
          b: {great: 100, less: 200}
        },
        to: {
          r: 100,
          g: 100,
          b: 100
        }
      };

      var colorChanger = new ColorChanger(tempElem, opt);
      colorChanger.changeColor();

      expect(getData(tempElem).data).to.eql(shouldArr);

    });

    it('should equal [100, 100, 100, 255]', function () {

      var tempElem = getTempElem(tempArr);

      var opt = {
        to: {
          r: 100,
          g: 100,
          b: 100
        }
      };

      var colorChanger = new ColorChanger(tempElem, opt);
      colorChanger.changeColor();

      expect(getData(tempElem).data).to.eql(shouldArr);

    });

    it('should equal [100, 100, 100, 255]', function () {

      var tempElem = getTempElem(tempArr);

      var opt = {
        from: {
          r: 50,
          g: 100,
          b: 150
        },
        to: {
          r: {plus: 50},
          g: {plus: 50, minus: 50},
          b: {minus: 50}
        }
      };

      var colorChanger = new ColorChanger(tempElem, opt);
      colorChanger.changeColor();

      expect(getData(tempElem).data).to.eql(shouldArr);

    });

  });

  describe('changeOriginal', function () {

    it('should equal [50, 100, 150, 255]', function () {

      var tempElem = getTempElem(tempArr);

      var opt = {
        from: {
          r: 50,
          g: 100,
          b: 150
        },
        to: {
          r: 255,
          g: 255,
          b: 255
        }
      };

      var colorChanger = new ColorChanger(tempElem, opt);
      colorChanger.changeColor();
      colorChanger.changeOriginal();

      expect(getData(tempElem).data).to.eql(tempArr);

    });

  });

});

function getTempElem(tempArr) {

  var canvas = document.createElement('canvas');
  var tempElem = document.createElement('img');
  tempElem.width = 2;
  tempElem.height = 2;
  var tempData = canvas.getContext('2d').createImageData(2, 2);
  for (var i = 0; i < tempArr.length; i++) {
    tempData.data[i] = tempArr[i];
  }
  setData(tempElem, tempData, 'png');

  return tempElem;
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
