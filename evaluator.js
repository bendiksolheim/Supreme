(function(Supreme) {

	function isInteger(n) {
		return !isNaN(parseInt(n, 10)) && isFinite(n);
	}

	function isExpression(s) {
		return typeof s !== 'undefined' && s[0] === '(';
	}

	function Evaluator(app) {
		this._app = app;
		this._env = new diy.Environment();

		app.on('cell:changed', this.evaluate, this);
	}

	Evaluator.prototype.evaluateExpression = function(expression) {
		var value = '';
		try {
			var parsed = diy.Parser.parse(expression);
			value = diy.Evaluator.evaluate(parsed, this._env);
		} catch (e) {
			console.error(e.message);
			value = '#Error';
		}
		
		return value;
	};

	Evaluator.prototype.evaluate = function(cell) {
		var value = cell.value();
		if (isExpression(value))
			value = this.evaluateExpression(value);

		if (isInteger(value))
			value = parseInt(value, 10);

		var tmp = {};
		tmp[cell.id()] = value;
		this._env = this._env.extend(tmp);
		cell.displayValue(value);
	};

	Supreme.Evaluator = Evaluator;

})(window.Supreme = window.Supreme || {});