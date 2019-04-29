(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _Animation = require('./components/Animation');

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Animation2.default();

},{"./components/Animation":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Mouse = require('./Mouse');

var _Mouse2 = _interopRequireDefault(_Mouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = new _Canvas2.default(_Canvas.molecules);
var mouse = new _Mouse2.default();

var Animation = function () {
  function Animation() {
    _classCallCheck(this, Animation);

    this.setAnimation();
  }

  _createClass(Animation, [{
    key: 'setAnimation',
    value: function setAnimation() {
      // Set animation frame
      if (!Modernizr.touchevents) {
        if (_Canvas.$canvas != undefined) {
          var loop = function loop() {
            canvas.setFrame();
            mouse.setMovement();
            window.requestAnimationFrame(loop);
          };
          loop();
        } else {
          var _loop = function _loop() {
            mouse.setMovement();
            window.requestAnimationFrame(_loop);
          };
          _loop();
        }
      } else {
        var alphaAngle = 0;
        var betaAngle = 90;
        var gammaAngle = 0;

        // Reduce angle to [0deg, 360deg[
        var moduloAngle = function moduloAngle(angle) {
          return (angle % 360 + 360) % 360;
        };

        // Reduce angle to [-180deg, 180deg[
        var reduceAngle = function reduceAngle(angle) {
          return (moduloAngle(angle) + 180) % 360 - 180;
        };

        // Listen to device orientation
        window.addEventListener('deviceorientation', function (event) {
          alphaAngle = event.alpha;
          betaAngle = event.beta;
          gammaAngle = event.gamma;
        });

        if (_Canvas.$canvas != undefined) {
          var _loop2 = function _loop2() {
            // Move molecule
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _Canvas.molecules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var molecule = _step.value;

                molecule.x += reduceAngle(gammaAngle) * 0.005;
                molecule.rotate = Math.abs(molecule.rotate) * (moduloAngle(gammaAngle) > 180 ? -1 : 1);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            canvas.setFrame();
            window.requestAnimationFrame(_loop2);
          };
          _loop2();
        }
      }
    }
  }]);

  return Animation;
}();

exports.default = Animation;

},{"./Canvas":4,"./Mouse":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hexagone = require('./Hexagone');

var _Hexagone2 = _interopRequireDefault(_Hexagone);

var _Canvas = require('./Canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Benzene = function () {
  function Benzene(x, y, radius, height, ratio, bond, removed) {
    _classCallCheck(this, Benzene);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.ratio = ratio;
    this.bond = bond;
    this.removed = removed;
    this.draw();
  }

  _createClass(Benzene, [{
    key: 'draw',
    value: function draw() {
      // Hexagone
      new _Hexagone2.default(this.x, this.y, this.radius, false, true);

      // Double bond
      _Canvas.context.beginPath();
      if (this.removed != 'top-right') {
        _Canvas.context.moveTo(this.x + this.ratio, this.y);
        _Canvas.context.lineTo(this.x + this.ratio / 2, this.y - this.bond);
      }
      if (this.removed != 'top-left') {
        _Canvas.context.moveTo(this.x - this.ratio / 2, this.y - this.bond);
        _Canvas.context.lineTo(this.x - this.ratio, this.y);
      }
      if (this.removed != 'bottom') {
        _Canvas.context.moveTo(this.x - this.ratio / 2, this.y + this.bond);
        _Canvas.context.lineTo(this.x + this.ratio / 2, this.y + this.bond);
      }
      _Canvas.context.lineWidth = this.radius / 25;
      _Canvas.context.stroke();
      _Canvas.context.closePath();
    }
  }]);

  return Benzene;
}();

exports.default = Benzene;

},{"./Canvas":4,"./Hexagone":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.molecules = exports.context = exports.$canvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Molecule = require('./Molecule');

var _Molecule2 = _interopRequireDefault(_Molecule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Get canvas
var $canvas = exports.$canvas = document.querySelector('canvas');
var context = exports.context = $canvas != undefined ? $canvas.getContext('2d') : undefined;

// Create molecules
var number = Math.round((screen.width + screen.height) / 2 / 100);
var molecules = new Array();

for (var i = 0; i < number; i++) {
  var benzene = new _Molecule2.default('benzene');
  var naphtalene = new _Molecule2.default('naphtalene');
  var diphenyle = new _Molecule2.default('diphenyle');
  var styrene = new _Molecule2.default('styrene');
  var coronene = new _Molecule2.default('coronene');
  molecules.push(benzene);
  molecules.push(naphtalene);
  molecules.push(diphenyle);
  molecules.push(styrene);
  molecules.push(coronene);
}

exports.molecules = molecules;

var Canvas = function () {
  function Canvas(molecules) {
    _classCallCheck(this, Canvas);

    if ($canvas != undefined) {
      this.molecules = molecules;
      this.setResize();
    }
  }

  _createClass(Canvas, [{
    key: 'setResize',
    value: function setResize() {
      var _this = this;

      // Resize canvas
      var resize = function resize() {
        $canvas.width = window.innerWidth;
        $canvas.height = window.innerHeight;
        _this.largest = Math.max($canvas.width, $canvas.height);
        $canvas.style.position = 'absolute';
      };
      resize();

      window.addEventListener('resize', resize);
    }
  }, {
    key: 'setFrame',
    value: function setFrame() {
      context.clearRect(0, 0, $canvas.width, $canvas.height);

      // Draw molecules
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.molecules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var molecule = _step.value;

          var opacity = 1 - (molecule.y + molecule.size) / $canvas.height;
          context.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
          molecule.draw();

          // Update parameters
          molecule.translate = Math.pow(Math.E, (molecule.y + $canvas.height) / (2 * $canvas.height) * molecule.speed);
          molecule.y += molecule.translate;
          molecule.angle += molecule.rotate;

          if (molecule.x + molecule.size < 0 || molecule.x - molecule.size > $canvas.width || molecule.y - molecule.size > $canvas.height) {
            molecule.init();
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

},{"./Molecule":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('./Canvas');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hexagone = function () {
  function Hexagone(x, y, radius, fill, stroke) {
    _classCallCheck(this, Hexagone);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(this.radius / 2, 2));
    this.fill = fill;
    this.stroke = stroke;
    this.draw();
  }

  _createClass(Hexagone, [{
    key: 'draw',
    value: function draw() {
      // Draw hexagone
      _Canvas.context.beginPath();
      _Canvas.context.moveTo(this.x + this.radius, this.y);
      _Canvas.context.lineTo(this.x + this.radius / 2, this.y - this.height);
      _Canvas.context.lineTo(this.x - this.radius / 2, this.y - this.height);
      _Canvas.context.lineTo(this.x - this.radius, this.y);
      _Canvas.context.lineTo(this.x - this.radius / 2, this.y + this.height);
      _Canvas.context.lineTo(this.x + this.radius / 2, this.y + this.height);
      _Canvas.context.lineTo(this.x + this.radius, this.y);

      if (this.fill) {
        _Canvas.context.fill();
      }
      if (this.stroke) {
        _Canvas.context.lineWidth = this.radius / 25;
        _Canvas.context.stroke();
      }
      _Canvas.context.closePath();
    }
  }]);

  return Hexagone;
}();

exports.default = Hexagone;

},{"./Canvas":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Benzene = require('./Benzene');

var _Benzene2 = _interopRequireDefault(_Benzene);

var _Canvas = require('./Canvas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Molecule = function () {
  function Molecule(name) {
    _classCallCheck(this, Molecule);

    if (_Canvas.$canvas != undefined) {
      _Canvas.$canvas.width = window.innerWidth;
      _Canvas.$canvas.height = window.innerHeight;
      this.translate = 0;
      this.name = name;
      this.init();
      this.draw();
    }
  }

  _createClass(Molecule, [{
    key: 'init',
    value: function init() {
      // Initialize parameters
      this.radius = Math.floor(Math.random() * 12.5 + 12.5);
      this.x = Math.floor(Math.random() * _Canvas.$canvas.width);
      this.y = -this.radius - Math.floor(Math.random() * _Canvas.$canvas.height);
      this.height = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(this.radius / 2, 2));
      this.ratio = this.radius * 0.75;
      this.bond = Math.sqrt(Math.pow(this.radius * 0.75, 2) - Math.pow(this.radius * 0.75 / 2, 2));
      this.angle = Math.floor(Math.random() * Math.PI);
      this.rotate = Math.floor(Math.random() * 10) / 1000 * (this.x < _Canvas.$canvas.width / 2 ? -1 : 1);
      this.speed = Math.floor(Math.random() * 1.25) + 1.25;
    }
  }, {
    key: 'draw',
    value: function draw() {
      // Draw molecule
      _Canvas.context.save();
      _Canvas.context.translate(this.x, this.y);
      _Canvas.context.rotate(this.angle);
      _Canvas.context.translate(-this.x, -this.y);

      if (this.name == 'benzene') {
        new _Benzene2.default(this.x, this.y, this.radius, this.height, this.ratio, this.bond, undefined);
        this.size = this.radius;
      } else if (this.name == 'naphtalene') {
        new _Benzene2.default(this.x, this.y - this.height, this.radius, this.height, this.ratio, this.bond, undefined);
        new _Benzene2.default(this.x, this.y + this.height, this.radius, this.height, -this.ratio, -this.bond, 'bottom');
        this.size = this.radius * 4;
      } else if (this.name == 'diphenyle') {
        new _Benzene2.default(this.x - this.radius * 1.5, this.y, this.radius, this.height, this.ratio, this.bond, undefined);
        new _Benzene2.default(this.x + this.radius * 1.5, this.y, this.radius, this.height, -this.ratio, -this.bond, undefined);
        _Canvas.context.beginPath();
        _Canvas.context.moveTo(this.x - this.radius / 2, this.y);
        _Canvas.context.lineTo(this.x + this.radius / 2, this.y);
        _Canvas.context.stroke();
        _Canvas.context.closePath();
        this.size = this.radius * 5;
      } else if (this.name == 'styrene') {
        new _Benzene2.default(this.x, this.y, this.radius, this.height, this.ratio, this.bond, undefined);
        _Canvas.context.beginPath();
        _Canvas.context.moveTo(this.x + this.radius, this.y);
        _Canvas.context.lineTo(this.x + this.radius * 2, this.y);
        _Canvas.context.lineTo(this.x + this.radius * 2.5, this.y + this.height);
        _Canvas.context.moveTo(this.x + this.radius * 3 - this.ratio, this.y);
        _Canvas.context.lineTo(this.x + this.radius * 3 - this.ratio / 2, this.y + this.bond);
        _Canvas.context.stroke();
        _Canvas.context.closePath();
        this.size = this.radius * 4;
      } else if (this.name == 'coronene') {
        new _Benzene2.default(this.x, this.y - this.height * 2, this.radius, this.height, -this.ratio, -this.bond, 'top-left');
        new _Benzene2.default(this.x - this.radius * 1.5, this.y - this.height, this.radius, this.height, this.ratio, this.bond, 'top-right');
        new _Benzene2.default(this.x - this.radius * 1.5, this.y + this.height, this.radius, this.height, -this.ratio, -this.bond, 'bottom');
        new _Benzene2.default(this.x, this.y + this.height * 2, this.radius, this.height, this.ratio, this.bond, 'top-left');
        new _Benzene2.default(this.x + this.radius * 1.5, this.y + this.height, this.radius, this.height, -this.ratio, -this.bond, 'top-right');
        new _Benzene2.default(this.x + this.radius * 1.5, this.y - this.height, this.radius, this.height, this.ratio, this.bond, 'bottom');
        this.size = this.radius * 6;
      }
      _Canvas.context.restore();
    }
  }]);

  return Molecule;
}();

exports.default = Molecule;

},{"./Benzene":3,"./Canvas":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('./Canvas');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function () {
  function Mouse() {
    _classCallCheck(this, Mouse);

    if (!Modernizr.touchevents) {
      this.setSettings();
      this.moveMouse();
      this.setMovement();
    }
  }

  _createClass(Mouse, [{
    key: 'setSettings',
    value: function setSettings() {
      // Create elements
      var $body = document.body;
      var $mouse = document.createElement('div');
      var $pointer = document.createElement('div');
      var $particles = document.createElement('div');
      var $particle_1 = document.createElement('div');
      var $particle_2 = document.createElement('div');
      var $particle_3 = document.createElement('div');

      // Add classes
      $mouse.classList.add('mouse');
      $pointer.classList.add('pointer');
      $particles.classList.add('particles');
      $particle_1.classList.add('particle');
      $particle_2.classList.add('particle');
      $particle_3.classList.add('particle');
      $particle_1.classList.add('index-1');
      $particle_2.classList.add('index-2');
      $particle_3.classList.add('index-3');

      // Add elements
      $particles.appendChild($particle_1);
      $particles.appendChild($particle_2);
      $particles.appendChild($particle_3);
      $mouse.appendChild($pointer);
      $mouse.appendChild($particles);
      $body.insertBefore($mouse, $body.firstChild);

      // Get elements
      this.mouse = $mouse;
      this.pointer = $pointer;
      this.particles = $particles;

      // Get positions
      this.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.offset = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
  }, {
    key: 'moveMouse',
    value: function moveMouse() {
      var _this = this;

      // Update mouse position
      window.addEventListener('mousemove', function (event) {
        _this.position.x = event.clientX;
        _this.position.y = event.clientY;
      });
    }
  }, {
    key: 'setMovement',
    value: function setMovement() {
      // Move molecule
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _Canvas.molecules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var molecule = _step.value;

          molecule.x += (molecule.x - this.offset.x) * 0.0025;
          molecule.rotate = Math.abs(molecule.rotate) * (molecule.x < this.position.x ? -1 : 1);
        }

        // Set easings
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.offset.x += (this.position.x - this.offset.x) * 0.05;
      this.offset.y += (this.position.y - this.offset.y) * 0.05;

      // Set positions
      this.pointer.style.transform = 'translate(' + this.position.x + 'px, ' + this.position.y + 'px)';
      this.particles.style.transform = 'translate(' + this.offset.x + 'px, ' + this.offset.y + 'px)';
    }
  }]);

  return Mouse;
}();

exports.default = Mouse;

},{"./Canvas":4}]},{},[1])

//# sourceMappingURL=app.js.map
