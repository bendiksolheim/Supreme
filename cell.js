(function(window) {
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
		this.value = value;
		this.parent = parent;
		this.editMode = false;
		this.element = this._createElement();
	}

	Cell.prototype._createElement = function() {
		var td = document.createElement('td');
		td.className = 'editable';
		td.tabIndex = '-1';
		td.addEventListener('mousedown', this, false);
		td.addEventListener('dblclick', this, false);
		td.addEventListener('change', this, false);
		td.addEventListener('keydown', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'mousedown':
				this._focus();
				break;
			case 'dblclick':
				this._edit();
				break;
			case 'change':
				this.change(this.element.innerHTML);
				break;
			case 'keydown':
				this._keydown(event);
		}
	};

	Cell.prototype._edit = function(event) {
		this.editMode = true;
		this.parent._edit(this);
	};

	Cell.prototype._doneEditing = function() {
		this.parent._doneEditing(this);
		this.editMode = false;
	};

	Cell.prototype._focus = function() {
		if (this.element.classList.contains('active'))
			return;

		this.element.classList.add('active');
		this.parent._setActive(this);
		this.element.focus();
	};

	Cell.prototype._unfocus = function() {
		this.element.classList.remove('active');
	};

	Cell.prototype.change = function(value) {
		this.value = value;
		this.element.innerHTML = value;
	};

	/*Cell.prototype._toggleEdit = function(first_argument) {
		if (this.editMode)
			this._doneEditing();
		else
			this._edit();
	};*/

	Cell.prototype._keydown = function(event) {
		var keyCode = event.keyCode;
		switch (keyCode) {
			case RETURN:
				this._edit();
				break;
			case ARROW_LEFT.code:
			case ARROW_UP.code:
			case ARROW_RIGHT.code:
			case ARROW_DOWN.code:
				this.parent.shift(this, ARROW_KEYS[keyCode]);
				break;
		}
	};

	Cell.prototype.bounds = function() {
		return {
			x: this.element.offsetLeft,
			y: this.element.offsetTop,
			width: this.element.offsetWidth,
			height: this.element.offsetHeight
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

	window.Cell = Cell;
})(window);