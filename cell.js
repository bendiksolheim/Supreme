(function(Supreme) {
	var RETURN = 13;
	var ARROW_LEFT = {code: 37, dx: -1, dy: 0};
	var ARROW_UP = {code: 38, dx: 0, dy: -1};
	var ARROW_RIGHT = {code: 39, dx: 1, dy: 0};
	var ARROW_DOWN = {code: 40, dx: 0, dy: 1};
	var ARROW_KEYS = {
		'37': ARROW_LEFT,
		'38': ARROW_UP,
		'39': ARROW_RIGHT,
		'40': ARROW_DOWN
	};

	function Cell(y, x, value, parent) {
		this.y = y;
		this.x = x;
		this.displayValue = value;
		this.rawValue = value;
		this.parent = parent;
		this.element = this._createElement();
	}

	Cell.prototype._createElement = function() {
		var td = d('td.editable');
		td.domProp('tabIndex', '-1');
		td.on('keydown mousedown dblclick change', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'mousedown':
				this._focus();
				break;
			case 'dblclick':
				this.parent._edit(this);
				break;
			case 'change':
				this.change(this.element.html());
				break;
			case 'keydown':
				this._keydown(event);
		}
	};

	Cell.prototype._focus = function() {
		if (this.element.hasClass('active'))
			return;

		this.element.addClass('active');
		this.parent._setFocused(this);
		this.element.focus();
	};

	Cell.prototype._unfocus = function() {
		this.element.removeClass('active');
	};

	Cell.prototype._parse = function(val) {
		if (val[0] === '=') return this.parent._evaluate(val.substr(1));

		return val;
	};

	Cell.prototype.change = function(value) {
		this.rawValue = value;
		this.displayValue = this._parse(value);
		this.element.html(this.displayValue);
	};

	Cell.prototype._keydown = function(event) {
		var keyCode = event.keyCode;
		switch (keyCode) {
			case RETURN:
				this.parent._edit(this);
				break;
			case ARROW_LEFT.code:
			case ARROW_UP.code:
			case ARROW_RIGHT.code:
			case ARROW_DOWN.code:
				this.parent.shift(this, ARROW_KEYS[keyCode]);
				break;
			default:
				console.log("lol");
		}
	};

	Cell.prototype.value = function(value) {
		return this.rawValue;
	};

	Cell.prototype.bounds = function() {
		return {
			x: this.element.domProp('offsetLeft'),
			y: this.element.domProp('offsetTop'),
			width: this.element.domProp('offsetWidth'),
			height: this.element.domProp('offsetHeight')
		};
	};

	Cell.prototype.focus = function() {
		this.element.focus();
	};

	Cell.prototype.activate = function() {
		var event = new MouseEvent('dblclick', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});
		this.element.dispatchEvent(event);
	};

	Supreme.Cell = Cell;
})(window.Supreme = window.Supreme || {});