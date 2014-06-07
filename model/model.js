(function(Supreme) {

	/*

		The model is stored as a two dimensional array with rows first, then columns:
		model[row][column]

	*/

	var CHARACTERS = /[A-Z]/;

	function toChar(n) {
		return String.fromCharCode(n + 65);
	}

	function fromCharacter(c) {
		return c.charCodeAt() - 65;
	}

	function normalize(n) {
		if (CHARACTERS.test(n)) n = fromCharacter(n);
		return parseInt(n, 10);
	}

	/*
		Usage:
		new Model(app, cols, rows);
		new Model(app, matrix);
	*/
	function Model(app, cols, rows) {
		this._app = app;

		if (Array.isArray(cols)) {
			this._cols = cols[0].length;
			this._rows = cols.length;
			this._model = cols;
		} else {
			this._cols = cols;
			this._rows = rows;
			this._model = this._create(cols, rows);
		}
	}

	Model.prototype._create = function(cols, rows) {
		var app = this._app;
		var model = f.range(rows).map(function(row) {
			return f.range(cols).map(function(col) {
				var id = toChar(col) + row;
				return new Supreme.Cell(id, col, row, '', app);
			}).get();
		}).get();
		return model;
	};

	Model.prototype.get = function(row, col) {
		if (row.length > 1) {
			col = row[0];
			row = row.substr(1);
		}
		col = normalize(col);
		row = normalize(row);
		return this._model[row][col];
	};

	Model.prototype.getRow = function(n, from, to) {
		if (n < 0 || n >= this._rows)
			return null;

		if (d.isUndefined(from))
			from = 0;

		if (d.isUndefined(to))
			to = this.cols();


		return this._model[n].slice(from, to);
	};

	Model.prototype.getCol = function(n, from, to) {
		if (n < 0 || n >= this._cols)
			return null;

		if (d.isUndefined(from))
			from = 0;

		if (d.isUndefined(to))
			to = this.rows();

		var self = this;
		return f.range(from, to).map(function(row) {
			return self._model[row][n];
		}).get();
	};

	Model.prototype.getSubset = function(fromRow, fromCol, toRow, toCol) {
		var self = this;
		return f.range(fromRow, toRow).map(function(row) {
			return f.range(fromCol, toCol).map(function(col) {
				return self._model[row][col];
			}).get();
		}).get();
	};

	Model.prototype.rows = function() {
		return this._rows;
	};

	Model.prototype.cols = function() {
		return this._cols;
	};

	Supreme.Model = Model;
})(window.Supreme = window.Supreme || {})