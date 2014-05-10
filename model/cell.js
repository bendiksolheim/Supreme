(function(Supreme) {

	function isInteger(n) {
		return !isNaN(parseInt(n, 10)) && isFinite(n);
	}

	function isExpression(s) {
		return typeof s !== 'undefined' && s[0] === '(';
	}

	function Cell(id, col, row, value, parent) {
		this._id = id;
		this._col = col;
		this._row = row;
		this._displayValue = value;
		this._value = '';
		this._parent = parent;
		this._el = this._createElement();
	}

	Cell.prototype._createElement = function() {
		var td = d('td.cell.editable')
			.on('mousedown dblclick change', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'mousedown':
				this._parent.select(this);
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

	Cell.prototype.change = function(value) {
		this._value = value;
		if (isExpression(value))
			value = this._parent.eval(value);

		if (isInteger(value))
			value = parseInt(value, 10);

		this._displayValue = value;
		this._parent.updateEnvironment(this._id, value);
		this._el.html(this._displayValue);
	};

	Cell.prototype.value = function() {
		return this._value;
	};

	Cell.prototype.displayValue = function() {
		return this._displayValue;
	};

	Cell.prototype.bounds = function() {
		return {
			x: this._el.domProp('offsetLeft'),
			y: this._el.domProp('offsetTop'),
			width: this._el.domProp('offsetWidth'),
			height: this._el.domProp('offsetHeight')
		};
	};

	Cell.prototype.el = function() {
		return this._el;
	};

	Cell.prototype.col = function() {
		return this._col;
	};

	Cell.prototype.row = function() {
		return this._row;
	};

	Supreme.Cell = Cell;
})(window.Supreme = window.Supreme || {});