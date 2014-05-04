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
		this._selection = new Supreme.Selection(this);
		this._env = new diy.Environment();
		d('html', true).on('keydown', this, false);

		// focus first element
		this._selection.select(this._model.get(0,0));
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
				this._selection.edit();
				break;
			case ARROW_LEFT.code:
			case ARROW_UP.code:
			case ARROW_RIGHT.code:
			case ARROW_DOWN.code:
				this._selection.shift(ARROW_KEYS[code]);
				break;
		}
	};

	App.prototype.select = function(cell) {
		this._selection.select(cell);
	};

	App.prototype.shift = function(cell, direction) {
		if (d.isUndefined(cell))
			return this._model.get(0, 0)._focus();

		var col = cell._col + direction.dx;
		var row = cell._row + direction.dy;
		if (col < 0 || row < 0 || col >= this._width || row >= this._height)
			return;

		this._selection.select(this._model.get(col, row));
	};

	App.prototype._parse = function(val) {
		var parsed = diy.Parser.parse(val);
		return parsed;
	};

	App.prototype._evaluate = function(ast) {
		var val = diy.Evaluator.evaluate(ast, this._env);
		return val;
	};

	App.prototype.width = function() {
		return this._width;
	};

	App.prototype.height = function() {
		return this._height;
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});