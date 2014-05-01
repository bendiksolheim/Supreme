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
		this._table = table;
		this._width = width;
		this._height = height;
		this._model = new Supreme.Model(this, width, height);
		this._view = new Supreme.TableView(this, table, this._model);
		this._input = new Supreme.Input();
		this._focus = new Supreme.Focus();
		this._env = new diy.Environment();

		// focus first element
		this.shift();
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
		if (d.isUndefined(cell))
			return this._model.get(0, 0)._focus();

		var col = cell._col + direction.dx;
		var row = cell._row + direction.dy;
		if (col < 0 || row < 0 || col >= this._width || row >= this._height)
			return;

		this._model.get(col, row)._focus();
	};

	App.prototype._setFocused = function(cell) {
		if (this.focusedCell) this.focusedCell._unfocus();

		this.focusedCell = cell;
	};

	App.prototype._edit = function(cell) {
		this._input._edit(cell);
	};

	App.prototype._doneEditing = function(cell) {
		this._input._doneEditing();
	};

	App.prototype._parse = function(val) {
		var parsed = diy.Parser.parse(val);
		return parsed;
	};

	App.prototype._evaluate = function(ast) {
		var val = diy.Evaluator.evaluate(ast, this._env);
		return val;
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});