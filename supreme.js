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

	function fromNumber(n) {
		return String.fromCharCode(n + 65);
	}

	function App(table, width, height) {
		this.table = table;
		this.width = width;
		this.height = height;
		this.model = new Supreme.Model(this, width, height);
		this.view = new Supreme.TableView(this, table, this.model);
		this.input = new Supreme.Input();
		this.view.focus();
	}

	App.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'keydown':
				this._keydown(event.keyCode);
				break;
		}
	};

	App.prototype._keydown = function(code) {
		switch (code) {
			case RETURN:
				this._edit(this.focusedCell);
				break;
			case ARROW_LEFT.code:
			case ARROW_UP.code:
			case ARROW_RIGHT.code:
			case ARROW_DOWN.code:
				this.shift(this.focusedCell, ARROW_KEYS[code]);
				break;
		}
	};

	App.prototype.shift = function(cell, direction) {
		console.log(cell);
		if (d.isUndefined(cell))
			return this.model.get(0, 0)._focus();

		var col = cell.col + direction.dx;
		var row = cell.row + direction.dy;
		if (col < 0 || row < 0 || col >= this.width || row >= this.height)
			return;

		this.model.get(col, row)._focus();
	};

	App.prototype._setFocused = function(cell) {
		if (this.focusedCell) this.focusedCell._unfocus();

		this.focusedCell = cell;
	};

	App.prototype._edit = function(cell) {
		this.input._edit(cell);
	};

	App.prototype._doneEditing = function(cell) {
		this.input._doneEditing();
	};

	App.prototype._evaluate = function(val) {
		var parts = val.split(' ');
		parts[0] = this.model.get(parts[0]).value();
		parts[2] = this.model.get(parts[2]).value();
		var expression = parts.join(' ');
		return eval(expression);
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});