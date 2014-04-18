(function() {

	function each(array, fn) {
		for (var i = 0; i < array.length; i++) {
			fn(array[i], i);
		}
	}

	function Excel(table, width, height) {
		this.table = table;
		this.width = width;
		this.height = height;
		this.model = this.__createModel(width, height);
		this.__createHeaders();
		this.__createBody();
	}

	Excel.prototype.__createModel = function(width, height) {
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

	Excel.prototype.__createHeaders = function() {
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

	Excel.prototype.__createBody = function() {
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

	function Cell(data) {
		this.data = data;
		this.element = this.__createElement();
	}

	Cell.prototype.__createElement = function() {
		var td = document.createElement('td');
		td.className = 'editable';
		td.tabIndex = '-1';
		td.addEventListener('click', this, false);
		td.addEventListener('focusout', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'click':
				this.click();
				break;
			case 'focusout':
				this.unfocus();
				break;
		}
		console.log(event);
	};

	Cell.prototype.click = function() {
		this.element.contentEditable = true;
	};

	Cell.prototype.unfocus = function() {
		this.element.contentEditable = false;
	};

	var excel = new Excel(document.querySelector('.table'), 10, 10);
})();