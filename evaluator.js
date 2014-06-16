(function(Supreme) {

	var CELL_REGEX = /[A-Z]+[0-9]+/i;

	function isInteger(n) {
		return !isNaN(parseInt(n, 10)) && isFinite(n);
	}

	function isExpression(s) {
		return !f.isUndefined(s) && (s[0] === '(' || s[0] == '\'');
	}

	function Evaluator(app) {
		this._app = app;
		this._env = new diy.Environment();
		this._loadStdLib();

		app.commander().on('cell:changed', this.evaluate, this);
	}

	Evaluator.prototype._loadStdLib = function() {
		var stdlib = diy.Parser.parse_multiple(diy.stdlib);
		diy.Evaluator.evaluate_multiple(stdlib, this._env);
	};

	Evaluator.prototype.evaluateExpression = function(expression, cell) {
		var value = '';
		try {
			var parsed = diy.Parser.parse(expression);
			var cells = new f(parsed).flatten().filter(function(n) { return CELL_REGEX.test(n); }).get();
			this.registerListeners(cell, cells);
			value = diy.Evaluator.evaluate(parsed, this._env);
		} catch (e) {
			console.error(e.message);
			value = '#Error';
		}
		
		return value;
	};

	Evaluator.prototype.registerListeners = function(cell, cells) {
		var self = this;
		cells.forEach(function(c) {
			if (c === cell.id())
				throw new Error('You cannot reference your own cell in an expression');

			self._app.model().get(c).on('cell:updated', cell.evaluate, cell);
		});
	};

	Evaluator.prototype.evaluate = function(event, cell) {
		var value = cell.value();
		if (isExpression(value))
			value = this.evaluateExpression(value, cell);

		if (isInteger(value))
			value = parseInt(value, 10);

		var tmp = {};
		tmp[cell.id()] = value;
		this._env = this._env.extend(tmp);
		cell.displayValue(value);
	};

	Supreme.Evaluator = Evaluator;

})(window.Supreme = window.Supreme || {});