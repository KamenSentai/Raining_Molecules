(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Canvas":3,"./Mouse":6}],2:[function(require,module,exports){
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
            var hexagone = new _Hexagone2.default(this.x, this.y, this.radius, false, true);

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

},{"./Canvas":3,"./Hexagone":4}],3:[function(require,module,exports){
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

},{"./Molecule":5}],4:[function(require,module,exports){
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

},{"./Canvas":3}],5:[function(require,module,exports){
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
                var benzene = new _Benzene2.default(this.x, this.y, this.radius, this.height, this.ratio, this.bond, undefined);
                this.size = this.radius;
            } else if (this.name == 'naphtalene') {
                var benzene_1 = new _Benzene2.default(this.x, this.y - this.height, this.radius, this.height, this.ratio, this.bond, undefined);
                var benzene_2 = new _Benzene2.default(this.x, this.y + this.height, this.radius, this.height, -this.ratio, -this.bond, 'bottom');
                this.size = this.radius * 4;
            } else if (this.name == 'diphenyle') {
                var _benzene_ = new _Benzene2.default(this.x - this.radius * 1.5, this.y, this.radius, this.height, this.ratio, this.bond, undefined);
                var _benzene_2 = new _Benzene2.default(this.x + this.radius * 1.5, this.y, this.radius, this.height, -this.ratio, -this.bond, undefined);
                _Canvas.context.beginPath();
                _Canvas.context.moveTo(this.x - this.radius / 2, this.y);
                _Canvas.context.lineTo(this.x + this.radius / 2, this.y);
                _Canvas.context.stroke();
                _Canvas.context.closePath();
                this.size = this.radius * 5;
            } else if (this.name == 'styrene') {
                var _benzene = new _Benzene2.default(this.x, this.y, this.radius, this.height, this.ratio, this.bond, undefined);
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
                var _benzene_3 = new _Benzene2.default(this.x, this.y - this.height * 2, this.radius, this.height, -this.ratio, -this.bond, 'top-left');
                var _benzene_4 = new _Benzene2.default(this.x - this.radius * 1.5, this.y - this.height, this.radius, this.height, this.ratio, this.bond, 'top-right');
                var benzene_3 = new _Benzene2.default(this.x - this.radius * 1.5, this.y + this.height, this.radius, this.height, -this.ratio, -this.bond, 'bottom');
                var benzene_4 = new _Benzene2.default(this.x, this.y + this.height * 2, this.radius, this.height, this.ratio, this.bond, 'top-left');
                var benzene_5 = new _Benzene2.default(this.x + this.radius * 1.5, this.y + this.height, this.radius, this.height, -this.ratio, -this.bond, 'top-right');
                var benzene_6 = new _Benzene2.default(this.x + this.radius * 1.5, this.y - this.height, this.radius, this.height, this.ratio, this.bond, 'bottom');
                this.size = this.radius * 6;
            }
            _Canvas.context.restore();
        }
    }]);

    return Molecule;
}();

exports.default = Molecule;

},{"./Benzene":2,"./Canvas":3}],6:[function(require,module,exports){
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

},{"./Canvas":3}],7:[function(require,module,exports){
'use strict';

var _Animation = require('./components/Animation');

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = new _Animation2.default();

},{"./components/Animation":1}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0FuaW1hdGlvbi5qcyIsIi4uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQmVuemVuZS5qcyIsIi4uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQ2FudmFzLmpzIiwiLi4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9IZXhhZ29uZS5qcyIsIi4uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvTW9sZWN1bGUuanMiLCIuLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL01vdXNlLmpzIiwiLi4vc3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFLQSxJQUFNLFNBQVMsdUNBQWY7QUFDQSxJQUFNLFFBQVMscUJBQWY7O0lBRXFCLFM7QUFFakIseUJBQ0E7QUFBQTs7QUFDSSxhQUFLLFlBQUw7QUFDSDs7Ozt1Q0FHRDtBQUNJO0FBQ0EsZ0JBQUksQ0FBQyxVQUFVLFdBQWYsRUFDQTtBQUNJLG9CQUFJLG1CQUFXLFNBQWYsRUFDQTtBQUNJLHdCQUFNLE9BQU8sU0FBUCxJQUFPLEdBQ2I7QUFDSSwrQkFBTyxRQUFQO0FBQ0EsOEJBQU0sV0FBTjtBQUNBLCtCQUFPLHFCQUFQLENBQTZCLElBQTdCO0FBQ0gscUJBTEQ7QUFNQTtBQUNILGlCQVRELE1BV0E7QUFDSSx3QkFBTSxRQUFPLFNBQVAsS0FBTyxHQUNiO0FBQ0ksOEJBQU0sV0FBTjtBQUNBLCtCQUFPLHFCQUFQLENBQTZCLEtBQTdCO0FBQ0gscUJBSkQ7QUFLQTtBQUNIO0FBQ0osYUFyQkQsTUF1QkE7QUFDSSxvQkFBSSxhQUFhLENBQWpCO0FBQ0Esb0JBQUksWUFBYSxFQUFqQjtBQUNBLG9CQUFJLGFBQWEsQ0FBakI7O0FBRUE7QUFDQSxvQkFBTSxjQUFjLFNBQWQsV0FBYyxDQUFDLEtBQUQsRUFDcEI7QUFDSSwy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SyxRQUFMLENBQWMsQ0FBM0IsR0FBK0IsQ0FBRSxDQUFqQyxHQUFxQyxDQUFsRSxDQUFsQjtBQUNIOztBQUVEO0FBUko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTSSxpQkFBSyxNQUFMLENBQVksQ0FBWixJQUFpQixDQUFDLEtBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsS0FBSyxNQUFMLENBQVksQ0FBL0IsSUFBb0MsSUFBckQ7QUFDQSxpQkFBSyxNQUFMLENBQVksQ0FBWixJQUFpQixDQUFDLEtBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsS0FBSyxNQUFMLENBQVksQ0FBL0IsSUFBb0MsSUFBckQ7O0FBRUE7QUFDQSxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixTQUFuQixrQkFBOEMsS0FBSyxRQUFMLENBQWMsQ0FBNUQsWUFBb0UsS0FBSyxRQUFMLENBQWMsQ0FBbEY7QUFDQSxpQkFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixTQUFyQixrQkFBOEMsS0FBSyxNQUFMLENBQVksQ0FBMUQsWUFBa0UsS0FBSyxNQUFMLENBQVksQ0FBOUU7QUFDSDs7Ozs7O2tCQTlFZ0IsSzs7Ozs7QUNGckI7Ozs7OztBQUVBLElBQU0sWUFBWSx5QkFBbEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENhbnZhcyBmcm9tICcuL0NhbnZhcydcbmltcG9ydCBNb3VzZSAgZnJvbSAnLi9Nb3VzZSdcblxuaW1wb3J0IHsgJGNhbnZhcyB9ICAgZnJvbSAnLi9DYW52YXMnXG5pbXBvcnQgeyBtb2xlY3VsZXMgfSBmcm9tICcuL0NhbnZhcydcblxuY29uc3QgY2FudmFzID0gbmV3IENhbnZhcyhtb2xlY3VsZXMpXG5jb25zdCBtb3VzZSAgPSBuZXcgTW91c2UoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb25cbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigpXG4gICAgfVxuXG4gICAgc2V0QW5pbWF0aW9uKClcbiAgICB7XG4gICAgICAgIC8vIFNldCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgaWYgKCFNb2Rlcm5penIudG91Y2hldmVudHMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICgkY2FudmFzICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb29wID0gKCkgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5zZXRGcmFtZSgpXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlLnNldE1vdmVtZW50KClcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb29wKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb29wID0gKCkgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlLnNldE1vdmVtZW50KClcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb29wKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBhbHBoYUFuZ2xlID0gMFxuICAgICAgICAgICAgbGV0IGJldGFBbmdsZSAgPSA5MFxuICAgICAgICAgICAgbGV0IGdhbW1hQW5nbGUgPSAwXG5cbiAgICAgICAgICAgIC8vIFJlZHVjZSBhbmdsZSB0byBbMGRlZywgMzYwZGVnW1xuICAgICAgICAgICAgY29uc3QgbW9kdWxvQW5nbGUgPSAoYW5nbGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoYW5nbGUgJSAzNjApKyAzNjApICUgMzYwXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlZHVjZSBhbmdsZSB0byBbLTE4MGRlZywgMTgwZGVnW1xuICAgICAgICAgICAgY29uc3QgcmVkdWNlQW5nbGUgPSAoYW5nbGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChtb2R1bG9BbmdsZShhbmdsZSkgKyAxODApICUgMzYwIC0gMTgwXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExpc3RlbiB0byBkZXZpY2Ugb3JpZW50YXRpb25cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIChldmVudCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhbHBoYUFuZ2xlID0gZXZlbnQuYWxwaGFcbiAgICAgICAgICAgICAgICBiZXRhQW5nbGUgID0gZXZlbnQuYmV0YVxuICAgICAgICAgICAgICAgIGdhbW1hQW5nbGUgPSBldmVudC5nYW1tYVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCRjYW52YXMgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvb3AgPSAoKSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSBtb2xlY3VsZVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vbGVjdWxlIG9mIG1vbGVjdWxlcylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9sZWN1bGUueCArPSByZWR1Y2VBbmdsZShnYW1tYUFuZ2xlKSAqIDAuMDA1XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2xlY3VsZS5yb3RhdGUgPSBNYXRoLmFicyhtb2xlY3VsZS5yb3RhdGUpICogKG1vZHVsb0FuZ2xlKGdhbW1hQW5nbGUpID4gMTgwID8gLSAxIDogMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYW52YXMuc2V0RnJhbWUoKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvb3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBIZXhhZ29uZSBmcm9tICcuL0hleGFnb25lJ1xuXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi9DYW52YXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlbnplbmVcbntcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCByYWRpdXMsIGhlaWdodCwgcmF0aW8sIGJvbmQsIHJlbW92ZWQpXG4gICAge1xuICAgICAgICB0aGlzLnggICAgICAgPSB4XG4gICAgICAgIHRoaXMueSAgICAgICA9IHlcbiAgICAgICAgdGhpcy5yYWRpdXMgID0gcmFkaXVzXG4gICAgICAgIHRoaXMuaGVpZ2h0ICA9IGhlaWdodFxuICAgICAgICB0aGlzLnJhdGlvICAgPSByYXRpb1xuICAgICAgICB0aGlzLmJvbmQgICAgPSBib25kXG4gICAgICAgIHRoaXMucmVtb3ZlZCA9IHJlbW92ZWRcbiAgICAgICAgdGhpcy5kcmF3KClcbiAgICB9XG5cbiAgICBkcmF3KClcbiAgICB7XG4gICAgICAgIC8vIEhleGFnb25lXG4gICAgICAgIGNvbnN0IGhleGFnb25lID0gbmV3IEhleGFnb25lKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgZmFsc2UsIHRydWUpXG5cbiAgICAgICAgLy8gRG91YmxlIGJvbmRcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICBpZiAodGhpcy5yZW1vdmVkICE9ICd0b3AtcmlnaHQnKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh0aGlzLnggKyB0aGlzLnJhdGlvLCAgICAgdGhpcy55KVxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy54ICsgdGhpcy5yYXRpbyAvIDIsIHRoaXMueSAtIHRoaXMuYm9uZClcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZW1vdmVkICE9ICd0b3AtbGVmdCcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHRoaXMueCAtIHRoaXMucmF0aW8gLyAyLCB0aGlzLnkgLSB0aGlzLmJvbmQpXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnggLSB0aGlzLnJhdGlvLCAgICAgdGhpcy55KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlbW92ZWQgIT0gJ2JvdHRvbScpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHRoaXMueCAtIHRoaXMucmF0aW8gLyAyLCB0aGlzLnkgKyB0aGlzLmJvbmQpXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnggKyB0aGlzLnJhdGlvIC8gMiwgdGhpcy55ICsgdGhpcy5ib25kKVxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gdGhpcy5yYWRpdXMgLyAyNVxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICB9XG59IiwiaW1wb3J0IE1vbGVjdWxlIGZyb20gJy4vTW9sZWN1bGUnXG5cbi8vIEdldCBjYW52YXNcbmV4cG9ydCBjb25zdCAkY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJylcbmV4cG9ydCBjb25zdCBjb250ZXh0ID0gJGNhbnZhcyAhPSB1bmRlZmluZWQgPyAkY2FudmFzLmdldENvbnRleHQoJzJkJykgOiB1bmRlZmluZWRcblxuLy8gQ3JlYXRlIG1vbGVjdWxlc1xuY29uc3QgbnVtYmVyICAgID0gTWF0aC5yb3VuZCgoc2NyZWVuLndpZHRoICsgc2NyZWVuLmhlaWdodCkgLyAyIC8gMTAwKVxuY29uc3QgbW9sZWN1bGVzID0gbmV3IEFycmF5KClcbmZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyOyBpKyspXG57XG4gICAgY29uc3QgYmVuemVuZSAgICA9IG5ldyBNb2xlY3VsZSgnYmVuemVuZScpXG4gICAgY29uc3QgbmFwaHRhbGVuZSA9IG5ldyBNb2xlY3VsZSgnbmFwaHRhbGVuZScpXG4gICAgY29uc3QgZGlwaGVueWxlICA9IG5ldyBNb2xlY3VsZSgnZGlwaGVueWxlJylcbiAgICBjb25zdCBzdHlyZW5lICAgID0gbmV3IE1vbGVjdWxlKCdzdHlyZW5lJylcbiAgICBjb25zdCBjb3JvbmVuZSAgID0gbmV3IE1vbGVjdWxlKCdjb3JvbmVuZScpXG4gICAgbW9sZWN1bGVzLnB1c2goYmVuemVuZSlcbiAgICBtb2xlY3VsZXMucHVzaChuYXBodGFsZW5lKVxuICAgIG1vbGVjdWxlcy5wdXNoKGRpcGhlbnlsZSlcbiAgICBtb2xlY3VsZXMucHVzaChzdHlyZW5lKVxuICAgIG1vbGVjdWxlcy5wdXNoKGNvcm9uZW5lKVxufVxuZXhwb3J0IHsgbW9sZWN1bGVzIGFzIG1vbGVjdWxlcyB9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1xue1xuICAgIGNvbnN0cnVjdG9yKG1vbGVjdWxlcylcbiAgICB7XG4gICAgICAgIGlmICgkY2FudmFzICE9IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tb2xlY3VsZXMgPSBtb2xlY3VsZXNcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzaXplKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJlc2l6ZSgpXG4gICAge1xuICAgICAgICAvLyBSZXNpemUgY2FudmFzXG4gICAgICAgIGNvbnN0IHJlc2l6ZSA9ICgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgICRjYW52YXMud2lkdGggID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgICRjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmxhcmdlc3QgICA9IE1hdGgubWF4KCRjYW52YXMud2lkdGgsICRjYW52YXMuaGVpZ2h0KVxuICAgICAgICAgICAgJGNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgfVxuICAgICAgICByZXNpemUoKVxuICAgICAgICBcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSlcbiAgICB9XG4gICAgXG4gICAgc2V0RnJhbWUoKVxuICAgIHtcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgJGNhbnZhcy53aWR0aCwgJGNhbnZhcy5oZWlnaHQpXG5cbiAgICAgICAgLy8gRHJhdyBtb2xlY3VsZXNcbiAgICAgICAgZm9yIChjb25zdCBtb2xlY3VsZSBvZiB0aGlzLm1vbGVjdWxlcylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDEgLSAobW9sZWN1bGUueSArIG1vbGVjdWxlLnNpemUpIC8gJGNhbnZhcy5oZWlnaHRcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBgcmdiYSgyNTUsIDI1NSwgMjU1LCAke29wYWNpdHl9KWBcbiAgICAgICAgICAgIG1vbGVjdWxlLmRyYXcoKVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgcGFyYW1ldGVyc1xuICAgICAgICAgICAgbW9sZWN1bGUudHJhbnNsYXRlID0gTWF0aC5FICoqICgoKG1vbGVjdWxlLnkgKyAkY2FudmFzLmhlaWdodCkgLyAoMiAqICRjYW52YXMuaGVpZ2h0KSkgKiBtb2xlY3VsZS5zcGVlZClcbiAgICAgICAgICAgIG1vbGVjdWxlLnkgICAgICs9IG1vbGVjdWxlLnRyYW5zbGF0ZVxuICAgICAgICAgICAgbW9sZWN1bGUuYW5nbGUgKz0gbW9sZWN1bGUucm90YXRlXG4gICAgICAgICAgICBpZlxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIG1vbGVjdWxlLnggKyBtb2xlY3VsZS5zaXplIDwgMCAgICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1vbGVjdWxlLnggLSBtb2xlY3VsZS5zaXplID4gJGNhbnZhcy53aWR0aCB8fFxuICAgICAgICAgICAgICAgIG1vbGVjdWxlLnkgLSBtb2xlY3VsZS5zaXplID4gJGNhbnZhcy5oZWlnaHRcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2xlY3VsZS5pbml0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi9DYW52YXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhleGFnb25lXG57XG4gICAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzLCBmaWxsLCBzdHJva2UpXG4gICAge1xuICAgICAgICB0aGlzLnggICAgICA9IHhcbiAgICAgICAgdGhpcy55ICAgICAgPSB5XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5zcXJ0KHRoaXMucmFkaXVzICoqIDIgLSAodGhpcy5yYWRpdXMgLyAyKSAqKiAyKVxuICAgICAgICB0aGlzLmZpbGwgICA9IGZpbGxcbiAgICAgICAgdGhpcy5zdHJva2UgPSBzdHJva2VcbiAgICAgICAgdGhpcy5kcmF3KClcbiAgICB9XG5cbiAgICBkcmF3KClcbiAgICB7XG4gICAgICAgIC8vIERyYXcgaGV4YWdvbmVcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICBjb250ZXh0Lm1vdmVUbyh0aGlzLnggKyB0aGlzLnJhZGl1cywgICAgIHRoaXMueSlcbiAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy54ICsgdGhpcy5yYWRpdXMgLyAyLCB0aGlzLnkgLSB0aGlzLmhlaWdodClcbiAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy54IC0gdGhpcy5yYWRpdXMgLyAyLCB0aGlzLnkgLSB0aGlzLmhlaWdodClcbiAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy54IC0gdGhpcy5yYWRpdXMsICAgICB0aGlzLnkpXG4gICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMueCAtIHRoaXMucmFkaXVzIC8gMiwgdGhpcy55ICsgdGhpcy5oZWlnaHQpXG4gICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMueCArIHRoaXMucmFkaXVzIC8gMiwgdGhpcy55ICsgdGhpcy5oZWlnaHQpXG4gICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMueCArIHRoaXMucmFkaXVzLCAgICAgdGhpcy55KVxuICAgICAgICBpZiAodGhpcy5maWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0cm9rZSlcbiAgICAgICAgeyAgICBcbiAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gdGhpcy5yYWRpdXMgLyAyNVxuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKVxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICB9XG59IiwiaW1wb3J0IEJlbnplbmUgZnJvbSAnLi9CZW56ZW5lJ1xuXG5pbXBvcnQgeyAkY2FudmFzIH0gZnJvbSAnLi9DYW52YXMnXG5pbXBvcnQgeyBjb250ZXh0IH0gZnJvbSAnLi9DYW52YXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbGVjdWxlXG57XG4gICAgY29uc3RydWN0b3IobmFtZSlcbiAgICB7XG4gICAgICAgIGlmICgkY2FudmFzICE9IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgJGNhbnZhcy53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgICAgJGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlID0gMFxuICAgICAgICAgICAgdGhpcy5uYW1lICAgICAgPSBuYW1lXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgICAgICAgdGhpcy5kcmF3KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKVxuICAgIHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBwYXJhbWV0ZXJzXG4gICAgICAgIHRoaXMucmFkaXVzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIuNSArIDEyLjUpXG4gICAgICAgIHRoaXMueCAgICAgID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogJGNhbnZhcy53aWR0aClcbiAgICAgICAgdGhpcy55ICAgICAgPSAtIHRoaXMucmFkaXVzIC0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogJGNhbnZhcy5oZWlnaHQpXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5zcXJ0KHRoaXMucmFkaXVzICoqIDIgLSAodGhpcy5yYWRpdXMgLyAyKSAqKiAyKVxuICAgICAgICB0aGlzLnJhdGlvICA9IHRoaXMucmFkaXVzICogMC43NVxuICAgICAgICB0aGlzLmJvbmQgICA9IE1hdGguc3FydCgodGhpcy5yYWRpdXMgKiAwLjc1KSAqKiAyIC0gKCh0aGlzLnJhZGl1cyAqIDAuNzUgKS8gMikgKiogMilcbiAgICAgICAgdGhpcy5hbmdsZSAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJKVxuICAgICAgICB0aGlzLnJvdGF0ZSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgLyAxMDAwKSAqICh0aGlzLnggPCAkY2FudmFzLndpZHRoIC8gMiA/IC0gMSA6IDEpXG4gICAgICAgIHRoaXMuc3BlZWQgID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMS4yNSkgKyAxLjI1XG4gICAgfVxuXG4gICAgZHJhdygpXG4gICAge1xuICAgICAgICAvLyBEcmF3IG1vbGVjdWxlXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpXG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KVxuICAgICAgICBjb250ZXh0LnJvdGF0ZSh0aGlzLmFuZ2xlKVxuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtIHRoaXMueCwgLSB0aGlzLnkpXG5cbiAgICAgICAgaWYgKHRoaXMubmFtZSA9PSAnYmVuemVuZScpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGJlbnplbmUgPSBuZXcgQmVuemVuZSh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIHRoaXMuaGVpZ2h0LCB0aGlzLnJhdGlvLCB0aGlzLmJvbmQsIHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMucmFkaXVzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5uYW1lID09ICduYXBodGFsZW5lJylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgYmVuemVuZV8xID0gbmV3IEJlbnplbmUodGhpcy54LCB0aGlzLnkgLSB0aGlzLmhlaWdodCwgdGhpcy5yYWRpdXMsIHRoaXMuaGVpZ2h0LCAgIHRoaXMucmF0aW8sICAgdGhpcy5ib25kLCB1bmRlZmluZWQpXG4gICAgICAgICAgICBjb25zdCBiZW56ZW5lXzIgPSBuZXcgQmVuemVuZSh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0LCB0aGlzLnJhZGl1cywgdGhpcy5oZWlnaHQsIC0gdGhpcy5yYXRpbywgLSB0aGlzLmJvbmQsICdib3R0b20nKVxuICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5yYWRpdXMgKiA0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5uYW1lID09ICdkaXBoZW55bGUnKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBiZW56ZW5lXzEgPSBuZXcgQmVuemVuZSh0aGlzLnggLSB0aGlzLnJhZGl1cyAqIDEuNSwgdGhpcy55LCB0aGlzLnJhZGl1cywgdGhpcy5oZWlnaHQsICAgdGhpcy5yYXRpbywgICB0aGlzLmJvbmQsIHVuZGVmaW5lZClcbiAgICAgICAgICAgIGNvbnN0IGJlbnplbmVfMiA9IG5ldyBCZW56ZW5lKHRoaXMueCArIHRoaXMucmFkaXVzICogMS41LCB0aGlzLnksIHRoaXMucmFkaXVzLCB0aGlzLmhlaWdodCwgLSB0aGlzLnJhdGlvLCAtIHRoaXMuYm9uZCwgdW5kZWZpbmVkKVxuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8odGhpcy54IC0gdGhpcy5yYWRpdXMgLyAyLCB0aGlzLnkpXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnggKyB0aGlzLnJhZGl1cyAvIDIsIHRoaXMueSlcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKClcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMucmFkaXVzICogNVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMubmFtZSA9PSAnc3R5cmVuZScpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGJlbnplbmUgPSBuZXcgQmVuemVuZSh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIHRoaXMuaGVpZ2h0LCB0aGlzLnJhdGlvLCB0aGlzLmJvbmQsIHVuZGVmaW5lZClcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKHRoaXMueCArIHRoaXMucmFkaXVzLCAgICAgICAgICAgICAgICAgICAgICB0aGlzLnkpXG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnggKyB0aGlzLnJhZGl1cyAqIDIsICAgICAgICAgICAgICAgICAgdGhpcy55KVxuICAgICAgICAgICAgY29udGV4dC5saW5lVG8odGhpcy54ICsgdGhpcy5yYWRpdXMgKiAyLjUsICAgICAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8odGhpcy54ICsgdGhpcy5yYWRpdXMgKiAzIC0gdGhpcy5yYXRpbywgICAgIHRoaXMueSlcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMueCArIHRoaXMucmFkaXVzICogMyAtIHRoaXMucmF0aW8gLyAyLCB0aGlzLnkgKyB0aGlzLmJvbmQpXG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpXG4gICAgICAgICAgICB0aGlzLnNpemUgPSB0aGlzLnJhZGl1cyAqIDRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm5hbWUgPT0gJ2Nvcm9uZW5lJylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgYmVuemVuZV8xID0gbmV3IEJlbnplbmUodGhpcy54LCAgICAgICAgICAgICAgICAgICAgIHRoaXMueSAtIHRoaXMuaGVpZ2h0ICogMiwgdGhpcy5yYWRpdXMsIHRoaXMuaGVpZ2h0LCAtIHRoaXMucmF0aW8sIC0gdGhpcy5ib25kLCAndG9wLWxlZnQnKVxuICAgICAgICAgICAgY29uc3QgYmVuemVuZV8yID0gbmV3IEJlbnplbmUodGhpcy54IC0gdGhpcy5yYWRpdXMgKiAxLjUsIHRoaXMueSAtIHRoaXMuaGVpZ2h0LCAgICAgdGhpcy5yYWRpdXMsIHRoaXMuaGVpZ2h0LCAgIHRoaXMucmF0aW8sICAgdGhpcy5ib25kLCAndG9wLXJpZ2h0JylcbiAgICAgICAgICAgIGNvbnN0IGJlbnplbmVfMyA9IG5ldyBCZW56ZW5lKHRoaXMueCAtIHRoaXMucmFkaXVzICogMS41LCB0aGlzLnkgKyB0aGlzLmhlaWdodCwgICAgIHRoaXMucmFkaXVzLCB0aGlzLmhlaWdodCwgLSB0aGlzLnJhdGlvLCAtIHRoaXMuYm9uZCwgJ2JvdHRvbScpXG4gICAgICAgICAgICBjb25zdCBiZW56ZW5lXzQgPSBuZXcgQmVuemVuZSh0aGlzLngsICAgICAgICAgICAgICAgICAgICAgdGhpcy55ICsgdGhpcy5oZWlnaHQgKiAyLCB0aGlzLnJhZGl1cywgdGhpcy5oZWlnaHQsICAgdGhpcy5yYXRpbywgICB0aGlzLmJvbmQsICd0b3AtbGVmdCcpXG4gICAgICAgICAgICBjb25zdCBiZW56ZW5lXzUgPSBuZXcgQmVuemVuZSh0aGlzLnggKyB0aGlzLnJhZGl1cyAqIDEuNSwgdGhpcy55ICsgdGhpcy5oZWlnaHQsICAgICB0aGlzLnJhZGl1cywgdGhpcy5oZWlnaHQsIC0gdGhpcy5yYXRpbywgLSB0aGlzLmJvbmQsICd0b3AtcmlnaHQnKVxuICAgICAgICAgICAgY29uc3QgYmVuemVuZV82ID0gbmV3IEJlbnplbmUodGhpcy54ICsgdGhpcy5yYWRpdXMgKiAxLjUsIHRoaXMueSAtIHRoaXMuaGVpZ2h0LCAgICAgdGhpcy5yYWRpdXMsIHRoaXMuaGVpZ2h0LCAgIHRoaXMucmF0aW8sICAgdGhpcy5ib25kLCAnYm90dG9tJylcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMucmFkaXVzICogNlxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpXG4gICAgfVxufSIsImltcG9ydCB7IG1vbGVjdWxlcyB9IGZyb20gJy4vQ2FudmFzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZVxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNldFNldHRpbmdzKClcbiAgICAgICAgICAgIHRoaXMubW92ZU1vdXNlKClcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZW1lbnQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2V0dGluZ3MoKVxuICAgIHtcbiAgICAgICAgLy8gQ3JlYXRlIGVsZW1lbnRzXG4gICAgICAgIGNvbnN0ICRib2R5ICAgICAgID0gZG9jdW1lbnQuYm9keVxuICAgICAgICBjb25zdCAkbW91c2UgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0ICRwb2ludGVyICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgJHBhcnRpY2xlcyAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCAkcGFydGljbGVfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0ICRwYXJ0aWNsZV8yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgJHBhcnRpY2xlXzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgIC8vIEFkZCBjbGFzc2VzXG4gICAgICAgICRtb3VzZS5jbGFzc0xpc3QuYWRkKCdtb3VzZScpXG4gICAgICAgICRwb2ludGVyLmNsYXNzTGlzdC5hZGQoJ3BvaW50ZXInKVxuICAgICAgICAkcGFydGljbGVzLmNsYXNzTGlzdC5hZGQoJ3BhcnRpY2xlcycpXG4gICAgICAgICRwYXJ0aWNsZV8xLmNsYXNzTGlzdC5hZGQoJ3BhcnRpY2xlJylcbiAgICAgICAgJHBhcnRpY2xlXzIuY2xhc3NMaXN0LmFkZCgncGFydGljbGUnKVxuICAgICAgICAkcGFydGljbGVfMy5jbGFzc0xpc3QuYWRkKCdwYXJ0aWNsZScpXG4gICAgICAgICRwYXJ0aWNsZV8xLmNsYXNzTGlzdC5hZGQoJ2luZGV4LTEnKVxuICAgICAgICAkcGFydGljbGVfMi5jbGFzc0xpc3QuYWRkKCdpbmRleC0yJylcbiAgICAgICAgJHBhcnRpY2xlXzMuY2xhc3NMaXN0LmFkZCgnaW5kZXgtMycpXG5cbiAgICAgICAgLy8gQWRkIGVsZW1lbnRzXG4gICAgICAgICRwYXJ0aWNsZXMuYXBwZW5kQ2hpbGQoJHBhcnRpY2xlXzEpXG4gICAgICAgICRwYXJ0aWNsZXMuYXBwZW5kQ2hpbGQoJHBhcnRpY2xlXzIpXG4gICAgICAgICRwYXJ0aWNsZXMuYXBwZW5kQ2hpbGQoJHBhcnRpY2xlXzMpXG4gICAgICAgICRtb3VzZS5hcHBlbmRDaGlsZCgkcG9pbnRlcilcbiAgICAgICAgJG1vdXNlLmFwcGVuZENoaWxkKCRwYXJ0aWNsZXMpXG4gICAgICAgICRib2R5Lmluc2VydEJlZm9yZSgkbW91c2UsICRib2R5LmZpcnN0Q2hpbGQpXG5cbiAgICAgICAgLy8gR2V0IGVsZW1lbnRzXG4gICAgICAgIHRoaXMubW91c2UgICAgID0gJG1vdXNlXG4gICAgICAgIHRoaXMucG9pbnRlciAgID0gJHBvaW50ZXJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSAkcGFydGljbGVzXG5cbiAgICAgICAgLy8gR2V0IHBvc2l0aW9uc1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyB4IDogd2luZG93LmlubmVyV2lkdGggLyAyLCB5IDogd2luZG93LmlubmVySGVpZ2h0IC8gMsKgfVxuICAgICAgICB0aGlzLm9mZnNldCAgID0geyB4IDogd2luZG93LmlubmVyV2lkdGggLyAyLCB5IDogd2luZG93LmlubmVySGVpZ2h0IC8gMsKgfVxuICAgIH1cblxuICAgIG1vdmVNb3VzZSgpXG4gICAge1xuICAgICAgICAvLyBVcGRhdGUgbW91c2UgcG9zaXRpb25cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gZXZlbnQuY2xpZW50WFxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gZXZlbnQuY2xpZW50WVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNldE1vdmVtZW50KClcbiAgICB7XG4gICAgICAgIC8vIE1vdmUgbW9sZWN1bGVcbiAgICAgICAgZm9yIChjb25zdCBtb2xlY3VsZSBvZiBtb2xlY3VsZXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1vbGVjdWxlLnggKz0gKG1vbGVjdWxlLnggLSB0aGlzLm9mZnNldC54KSAqIDAuMDAyNVxuICAgICAgICAgICAgbW9sZWN1bGUucm90YXRlID0gTWF0aC5hYnMobW9sZWN1bGUucm90YXRlKSAqIChtb2xlY3VsZS54IDwgdGhpcy5wb3NpdGlvbi54ID8gLSAxIDogMSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBlYXNpbmdzXG4gICAgICAgIHRoaXMub2Zmc2V0LnggKz0gKHRoaXMucG9zaXRpb24ueCAtIHRoaXMub2Zmc2V0LngpICogMC4wNVxuICAgICAgICB0aGlzLm9mZnNldC55ICs9ICh0aGlzLnBvc2l0aW9uLnkgLSB0aGlzLm9mZnNldC55KSAqIDAuMDVcblxuICAgICAgICAvLyBTZXQgcG9zaXRpb25zXG4gICAgICAgIHRoaXMucG9pbnRlci5zdHlsZS50cmFuc2Zvcm0gICA9IGB0cmFuc2xhdGUoJHt0aGlzLnBvc2l0aW9uLnh9cHgsICR7dGhpcy5wb3NpdGlvbi55fXB4KWBcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0Lnh9cHgsICR7dGhpcy5vZmZzZXQueX1weClgXG4gICAgfVxufSIsImltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL0FuaW1hdGlvbidcblxuY29uc3QgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbigpIl19
