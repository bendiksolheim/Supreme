(function(Supreme) {

	function Cell(id, col, row, value, app) {
		this._id = id;
		this._col = col;
		this._row = row;
		this._displayValue = value;
		this._value = '';
		this._app = app;
		this._el = this._createElement();
		this.type = String;
	}

	Cell.prototype._createElement = function() {
		var td = d('td.cell.editable')
			.on('mousedown dblclick change', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'mousedown':
				this._app.commander().trigger('cell:select', this);
				break;
			case 'dblclick':
				this._app.commander().trigger('cell:edit', this);
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
		this._app.commander().trigger('cell:changed', this);
	};

	Cell.prototype.value = function() {
		return this._value;
	};

	Cell.prototype.displayValue = function(value) {
		if (f.isUndefined(value))
			return this._displayValue;

		this._displayValue = value;
		this._el.html(this._displayValue);
		this.setType();
		this.trigger('cell:updated');
	};

	Cell.prototype.evaluate = function() {
		this._app.commander().trigger('cell:changed', this);
	};

	Cell.prototype.setType = function() {
		if (f.isNumber(this._displayValue))
			this.type = Number;
		else
			this.type = String;

		this._el
			.removeClass('number')
			.removeClass('string')
			.addClass(this.type.name.toLowerCase());
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

	Cell.prototype.id = function() {
		return this._id;
	};

	Cell.prototype.command = function(event) {
		console.log(event);
		switch (event) {
			case 'cell:bold':
				this._el.toggleClass('bold');
				break;
			case 'cell:emph':
				this._el.toggleClass('emph');
				break;
		}
	};

	f.extend(Cell.prototype, Supreme.Events);
	Supreme.Cell = Cell;

	f.extend(Cell.prototype, Supreme.Events);
})(window.Supreme = window.Supreme || {});