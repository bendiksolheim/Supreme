(function(Supreme) {

	function App(container, width, height) {
		this._container = container;
		var table = this._createElement();
		this._table = table;
		container.append(table);
		this._width = width;
		this._height = height;
		this._commander = new Supreme.Command(this, table, container);
		this._model = new Supreme.Model(this, width, height);
		this._view = new Supreme.TableView(this, table, this._model);
		this._selection = new Supreme.Selection(this);
		this._evaluator = new Supreme.Evaluator(this);

		// focus first element
		this._selection.select(this._model.get(0,0));
	}

	App.prototype._createElement = function() {
		var table = d('table.table');
		return table;
	};

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

	App.prototype.container = function() {
		return this._container;
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});