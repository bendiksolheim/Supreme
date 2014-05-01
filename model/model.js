(function(Supreme) {

	var CHARACTERS = /[A-Z]/;

	function fromCharacter(c) {
		return c.charCodeAt() - 65;
	}

	function normalize(n) {
		if (CHARACTERS.test(n)) n = fromCharacter(n);
		return parseInt(n, 10);
	}

	function Model(app, cols, rows) {
		this._app = app;
		this._cols = cols;
		this._rows = rows;
		this._model = this._create(cols, rows);
	}

	Model.prototype._create = function(cols, rows) {
		var app = this._app;
		var model = f.range(rows).map(function(row) {
			return f.range(cols).map(function(col) {
				return new Supreme.Cell(col, row, '', app);
			}).get();
		}).get();

		return model;
	};

	Model.prototype.get = function(col, row) {
		if (col.length > 1) {
			row = col[1];
			col = col[0];
		}
		col = normalize(col);
		row = normalize(row);
		return this._model[row][col];
	};

	Model.prototype.rows = function() {
		return this._rows;
	};

	Model.prototype.cols = function() {
		return this._cols;
	};

	Supreme.Model = Model;
})(window.Supreme = window.Supreme || {})