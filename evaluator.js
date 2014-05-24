(function(Supreme) {

	var commander = Supreme.commander;

	var CELL_REGEX = /[A-Z][0-9]/i;

	function isInteger(n) {
		return !isNaN(parseInt(n, 10)) && isFinite(n);
	}

	function isExpression(s) {
		return !f.isUndefined(s) && s[0] === '(';
	}

	function Evaluator(app) {
		this._app = app;
		this._env = new diy.Environment();

		commander.on('cell:changed', this.evaluate, this);
	}

	Evaluator.prototype.evaluateExpression = function(expression, cell) {
		var value = '';
		try {
			var parsed = diy.Parser.parse(expression);
			this.registerListeners(cell, parsed);
			value = diy.Evaluator.evaluate(parsed, this._env);
		} catch (e) {
			console.error(e.message);
			value = '#Error';
		}
		
		return value;
	};

	Evaluator.prototype.registerListeners = function(cell, ast) {

		for (var v in ast) {
			console.log(CELL_REGEX.test(ast[v]));
			if (CELL_REGEX.test(ast[v])) {
				console.log(cell);
				this._app._model.get(ast[v]).on('cell:updated', cell.evaluate, cell);
			}
		}
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