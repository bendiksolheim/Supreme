(function(window) {

	function Excel(table, width, height) {
		this.table = table;
		this.width = width;
		this.height = height;
		this.model = this._createModel(width, height);
		this._createHeaders();
		this._createBody();
		this.input = new Input();
	}

	Excel.prototype._createModel = function(width, height) {
		var model = [];
		for (var y = 0; y < height; y++) {
			var row = [];
			for (var x = 0; x < width; x++) {
				row.push(new Cell(y, x, '', this));
			}
			model.push(row);
		}

		return model;
	};

	Excel.prototype._createHeaders = function() {
		var thead = new d('thead');
		var tr = new d('tr');
		var corner = new d('th.header.corner');
		tr.append(corner);
		for (var col = 0; col < this.width; col++) {
			var th = new d('th.header.col-header');
			th.html(String.fromCharCode(col + 65));
			tr.append(th);
		}
		thead.append(tr);
		this.table.append(thead);
	};

	Excel.prototype._createBody = function() {
		var tbody = new d('tbody');
		for (var col = 0; col < this.height; col++) {
			var tr = new d('tr');
			var rowHeader = new d('td.header.row-header');
			rowHeader.html(col);
			tr.append(rowHeader);
			for (var row = 0; row < this.width; row++) {
				tr.append(this.model[col][row].element);
			}
			tbody.append(tr);
		}
		this.table.append(tbody);
	};

	Excel.prototype.shift = function(cell, direction) {
		var x = cell.x + direction.dx;
		var y = cell.y + direction.dy;
		if (x < 0 || y < 0 || x >= this.width || y >= this.height)
			return;

		this.model[y][x]._focus();
	};

	Excel.prototype._setActive = function(cell) {
		if (this.activeCell) this.activeCell._unfocus();

		this.activeCell = cell;
	};

	Excel.prototype._edit = function(cell) {
		this.input._edit(cell);
	};

	Excel.prototype._doneEditing = function(cell) {
		this.input._doneEditing(cell);
	};

	var excel = new Excel(new d('.table'), 10, 10);
	window.Excel = Excel;
	window.excel = excel;

})(window);