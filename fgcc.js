class FGCC {
  constructor(input, output) {
    this.input = input;
    this.output = output.getContext("2d");
    this.width = input.width;
    this.height = input.height;
    this.p1 = 0.95;
    this.p2 = 0.95;
    this.p3 = 20;
    this.noise = 100;
  }

  classify() {
    this.output.drawImage(this.input, 0, 0, this.width, this.height);
    var frame = this.output.getImageData(0, 0, this.width, this.height);
    var rgba = frame.data;
    var data = new Uint32Array(this.width * this.height);
    var fgcc = 0;

    for (var i = 0; i < data.length; i++) {
      var r = rgba[i * 4 + 0];
      var g = rgba[i * 4 + 1];
      var b = rgba[i * 4 + 2];
      var a = rgba[i * 4 + 3];
      var c = (r / g) < this.p1 && (b / g) < this.p2 && (2 * g - r - b) > this.p3;
      data[i] = c ? 1 : 0;
    }

    this.reduceNoise(data);

    for (var i = 0; i < data.length; i++) {
      var c = data[i];
      rgba[i * 4 + 0] = c * 255;
      rgba[i * 4 + 1] = c * 255;
      rgba[i * 4 + 2] = c * 255;
      fgcc += c / data.length;
    }

    this.output.putImageData(frame, 0, 0);

    return fgcc;
  }

  reduceNoise(data) {
    var sizes = [0, 0];
    var width = this.width;
    var height = this.height;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var i = y * width + x;
        if (data[i] === 1) {
          var size = fill(x, y, sizes.length);
          sizes.push(size);
        }
      }
    }

    for (var i = 0; i < data.length; i++) {
      var n = data[i];
      data[i] = sizes[n] >= this.noise ? 1 : 0;
    }

    return data;

    function fill(x, y, n) {
      var size = 0;
      var stack = [[x, y]];

      while (stack.length) {
        var coords = stack.pop();
        var x = coords[0];
        var y = coords[1];
        var i = y * width + x;

        while (y > 0 && data[i - width] === 1) {
          y -= 1;
          i -= width;
        }

        var left = false;
        var right = false;

        while (y < height && data[i] === 1) {
          data[i] = n;
          size++;

          if (x > 0 && data[i - 1] === 1) {
            if (!left) {
              stack.push([x - 1, y]);
              left = true;
            }
          } else {
            left = false;
          }

          if (x < width - 1 && data[i + 1] === 1) {
            if (!right) {
              stack.push([x + 1, y]);
              right = true;
            }
          } else {
            right = false;
          }

          y += 1;
          i += width;
        }
      }

      return size;
    }
  }
}
