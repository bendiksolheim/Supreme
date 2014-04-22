(function(Supreme) {

	var RETURN = 13;
	var ARROW_LEFT = {code: 37, dx: -1, dy: 0};
	var ARROW_UP = {code: 38, dx: 0, dy: -1};
	var ARROW_RIGHT = {code: 39, dx: 1, dy: 0};
	var ARROW_DOWN = {code: 40, dx: 0, dy: 1};
	var ARROW_KEYS = {
		'37': ARROW_LEFT,
		'38': ARROW_UP,
		'39': ARROW_RIGHT,
		'40': ARROW_DOWN
	};

	function fromNumber(n) {
		return String.fromCharCode(n + 65);
	}

	function App(table, width, height) {
		this.table = table;
		this.width = width;
		this.height = height;
		this.model = new Supreme.Model(this, width, height);
		this._createHeaders();
		this._createBody();
		this.input = new Supreme.Input();
		this.tbody.focus();
	}

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
		tbody.on('keydown', this, false);
		tbody.domProp('tabIndex', '-1');
		this.tbody = tbody;
		for (var row = 0; row < this.height; row++) {
			var tr = d('tr');
			var rowHeader = d('td.header.row-header');
			rowHeader.html(row);
			tr.append(rowHeader);
			for (var col = 0; col < this.width; col++) {
				tr.append(this.model.get(col, row).element);
			}
			tbody.append(tr);
		}
		this.table.append(tbody);
	};

	App.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'keydown':
				this._keydown(event.keyCode);
				break;
		}
	};

	App.prototype._keydown = function(code) {
		switch (code) {
			case RETURN:
				this._edit(this.focusedCell);
				break;
			case ARROW_LEFT.code:
			case ARROW_UP.code:
			case ARROW_RIGHT.code:
			case ARROW_DOWN.code:
				this.shift(this.focusedCell, ARROW_KEYS[code]);
				break;
		}
	};

	App.prototype.shift = function(cell, direction) {
		if (d.isUndefined(cell))
			return this.model.get(0, 0)._focus();

		var col = cell.col + direction.dx;
		var row = cell.row + direction.dy;
		if (col < 0 || row < 0 || col >= this.width || row >= this.height)
			return;

		this.model.get(col, row)._focus();
	};

	App.prototype._setFocused = function(cell) {
		if (this.focusedCell) this.focusedCell._unfocus();

		this.focusedCell = cell;
	};

	App.prototype._edit = function(cell) {
		this.input._edit(cell);
	};

	App.prototype._doneEditing = function(cell) {
		this.input._doneEditing();
	};
	App.prototype._evaluate = function(val) {
		var parts = val.split(' ');
		parts[0] = this.model.get(parts[0][0], parts[0][1]).value();
		parts[2] = this.model.get(parts[2][0], parts[2][1]).value();
		var expression = parts.join(' ');
		return eval(expression);
	};

	Supreme.App = App;

})(window.Supreme = window.Supreme || {});