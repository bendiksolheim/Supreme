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
		this.app = app;
		this.cols = cols;
		this.rows = rows;
		this.model = this._create(cols, rows);
	}

	Model.prototype._create = function(cols, rows) {
		var model = [];
		for (var row = 0; row < rows; row++) {
			var _row = [];
			for (var col = 0; col < cols; col++) {
				_row.push(new Supreme.Cell(col, row, '', this.app));
			}
			model.push(_row);
		}

		return model;
	};

	Model.prototype.get = function(col, row) {
		if (col.length > 1) {
			row = col[1];
			col = col[0];
		}
		col = normalize(col);
		row = normalize(row);
		return this.model[row][col];
	};

	Supreme.Model = Model;
})(window.Supreme = window.Supreme || {})