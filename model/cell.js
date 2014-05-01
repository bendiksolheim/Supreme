(function(Supreme) {

	function isExpression(val) {
		return val[0] === '=';
	}

	function Cell(col, row, value, parent) {
		this._col = col;
		this._row = row;
		this._displayValue = value;
		this._rawValue = value;
		this._parsedValue = '';
		this._parent = parent;
		this._el = this._createElement();
	}

	Cell.prototype._createElement = function() {
		var td = d('td.editable');
		td.domProp('tabIndex', '-1');
		td.on('mousedown dblclick change', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'mousedown':
				this._focus();
				break;
			case 'dblclick':
				this._parent._edit(this);
				break;
			case 'change':
				this.change(this._el.html());
				break;
			default:
				debugger;
		}
	};

	Cell.prototype._focus = function() {
		if (this._el.hasClass('active'))
			return;

		this._el.addClass('active');
		this._parent._setFocused(this);
		this._el.focus();
	};

	Cell.prototype._unfocus = function() {
		this._el.removeClass('active');
	};

	Cell.prototype._parse = function(val) {
		return this._parent._parse(val);
	};

	Cell.prototype.change = function(value) {
		this._rawValue = value;
		if (value[0] === '(') {
			this._parsedValue = this._parse(value);
			value = this._parent._evaluate(this._parsedValue);
		}
		this._displayValue = value;
		this._el.html(this._displayValue);
	};

	Cell.prototype.value = function(value) {
		return this._rawValue;
	};

	Cell.prototype.bounds = function() {
		return {
			x: this._el.domProp('offsetLeft'),
			y: this._el.domProp('offsetTop'),
			width: this._el.domProp('offsetWidth'),
			height: this._el.domProp('offsetHeight')
		};
	};

	Cell.prototype.focus = function() {
		this._el.focus();
	};

	Cell.prototype.el = function() {
		return this._el;
	};

	Supreme.Cell = Cell;
})(window.Supreme = window.Supreme || {});