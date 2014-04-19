(function(window) {
	function each(array, fn) {
		for (var i = 0; i < array.length; i++) {
			fn(array[i], i);
		}
	}

	function Excel(table, width, height) {
		this.table = table;
		this.width = width;
		this.height = height;
		this.model = this._createModel(width, height);
		this._createHeaders();
		this._createBody();
	}

	Excel.prototype._createModel = function(width, height) {
		var model = [];
		for (var y = 0; y < height; y++) {
			var row = [];
			for (var x = 0; x < width; x++) {
				row.push(new Cell(''));
			}
			model.push(row);
		}

		return model;
	};

	Excel.prototype._createHeaders = function() {
		var thead = document.createElement('thead');
		var tr = document.createElement('tr');
		var corner = document.createElement('th');
		corner.className = 'header corner';
		tr.appendChild(corner);
		for (var col = 0; col < this.width; col++) {
			var th = document.createElement('th');
			th.className = 'header col-header';
			th.innerHTML = String.fromCharCode(col + 65);
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		this.table.appendChild(thead);
	};

	Excel.prototype._createBody = function() {
		var tbody = document.createElement('tbody');
		for (var col = 0; col < this.height; col++) {
			var tr = document.createElement('tr');
			var rowHeader = document.createElement('td');
			rowHeader.className = 'header row-header';
			rowHeader.innerHTML = col;
			tr.appendChild(rowHeader);
			for (var row = 0; row < this.width; row++) {
				tr.appendChild(this.model[col][row].element);
			}
			tbody.appendChild(tr);
		}
		this.table.appendChild(tbody);
	};

	var excel = new Excel(document.querySelector('.table'), 10, 10);
	window.Excel = Excel;
	window.excel = excel;

})(window);