(function(Supreme) {

	function isExpression(val) {
		return val[0] === '=';
	}

	function Cell(col, row, value, parent) {
		this.col = col;
		this.row = row;
		this.displayValue = value;
		this.rawValue = value;
		this.parsedValue = '';
		this.parent = parent;
		this.element = this._createElement();
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
				this.parent._edit(this);
				break;
			case 'change':
				this.change(this.element.html());
				break;
			default:
				debugger;
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
		return this.parent._parse(val);
	};

	Cell.prototype.change = function(value) {
		this.rawValue = value;
		if (value[0] === '(') {
			this.parsedValue = this._parse(value);
			value = this.parent._evaluate(this.parsedValue);
		}
		this.displayValue = value;
		this.element.html(this.displayValue);
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

	Supreme.Cell = Cell;
})(window.Supreme = window.Supreme || {});