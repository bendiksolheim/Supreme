(function(Supreme) {

	function isNumber(n) {
		return !isNaN(parseInt(n, 10)) && isFinite(n);
	}

	function Cell(id, col, row, value, parent) {
		this._id = id;
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

	Cell.prototype.change = function(value) {
		this._rawValue = value;
		if (value[0] === '(') {
			try {
				this._parsedValue = this._parent._parse(value);
				value = this._parent._evaluate(this._parsedValue);
			} catch(e) {
				console.error(e.message);
				value = "#Error";
			}
		}
		if (isNumber(value))
			value = parseInt(value, 10);

		this._displayValue = value;
		this._parent.updateEnvironment(this._id, value);
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