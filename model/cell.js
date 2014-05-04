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