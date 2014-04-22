(function(Supreme) {

	function App(table, width, height) {
		this.table = table;
		this.width = width;
		this.height = height;
		this.model = this._createModel(width, height);
		this._createHeaders();
		this._createBody();
		this.input = new Supreme.Input();
	}

	App.prototype._createModel = function(width, height) {
		var model = [];
		for (var y = 0; y < height; y++) {
			var row = [];
			for (var x = 0; x < width; x++) {
				row.push(new Supreme.Cell(y, x, '', this));
			}
			model.push(row);
		}

		return model;
	};

	App.prototype._createHeaders = function() {
		var thead = d('thead');
		var tr = d('tr');
		var corner = d('th.header.corner');
		tr.append(corner);
		for (var col = 0; col < this.width; col++) {
			var th = d('th.header.col-header');
			th.html(String.fromCharCode(col + 65));
			tr.append(th);
		}
		thead.append(tr);
		this.table.append(thead);
	};

	App.prototype._createBody = function() {
		var tbody = d('tbody');
		for (var col = 0; col < this.height; col++) {
			var tr = d('tr');
			var rowHeader = d('td.header.row-header');
			rowHeader.html(col);
			tr.append(rowHeader);
			for (var row = 0; row < this.width; row++) {
				tr.append(this.model[col][row].element);
			}
			tbody.append(tr);
		}
		this.table.append(tbody);
	};

	App.prototype.shift = function(cell, direction) {
		var x = cell.x + direction.dx;
		var y = cell.y + direction.dy;
		if (x < 0 || y < 0 || x >= this.width || y >= this.height)
			return;

		this.model[y][x]._focus();
	};

	App.prototype._setFocused = function(cell) {
		if (this.focusedCell) this.focusedCell._unfocus();

		this.focusedCell = cell;
	};

	App.prototype._edit = function(cell) {
		this.input._edit(cell);
	};

	App.prototype._doneEditing = function(cell) {
		this.input._doneEditing(cell);
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});