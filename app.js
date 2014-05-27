(function(Supreme) {

	function App(table, width, height) {
		this._table = table;
		this._width = width;
		this._height = height;
		this._commander = new Supreme.Command(d('html', true));
		this._model = new Supreme.Model(this, width, height);
		this._view = new Supreme.TableView(this, table, this._model);
		this._selection = new Supreme.Selection(this);
		this._evaluator = new Supreme.Evaluator(this);

		// focus first element
		this._selection.select(this._model.get(0,0));
	}

	App.prototype.width = function() {
		return this._width;
	};

	App.prototype.height = function() {
		return this._height;
	};

	App.prototype.model = function() {
		return this._model;
	};

	App.prototype.commander = function() {
		return this._commander;
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});