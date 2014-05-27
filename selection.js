(function(Supreme) {

	function px(value) {
		return value + 'px';
	}

	function Selection(app) {
		this._app = app;
		this._el = d('div.selection');
		this._background = d('div.background');
		this._handle = d('div.handle');
		this._origin = undefined;
		this._model = undefined;
		this._input = new Supreme.Input();
		document.body.appendChild(this._el.append(this._background.append(this._handle)).get());

		app.commander().on('cell:select', this.select, this);
		app.commander().on('cell:edit', this.edit, this);
		app.commander().on('selecten:shift', this.shift, this);
		app.commander().on('cell:bold', this.command, this);
		app.commander().on('cell:emph', this.command, this);
	}

	Selection.prototype.select = function(event, cell) {
		if (f.isUndefined(cell))
			cell = event;
		
		this._input.cancelEditing();
		this._origin = cell;
		this._model = new Supreme.Model(this._app, this._app._model.getSubset(cell.row(), cell.col(), cell.row() + 1, cell.col() + 1));
		var bounds = cell.bounds();
		this._el
			.style('left', px(bounds.x))
			.style('top', px(bounds.y))
			.style('width', px(bounds.width + 1))
			.style('height', px(bounds.height + 1));
	};

	Selection.prototype._isValid = function(col, row) {
		return col >= 0 && row >= 0 && col < this._app.width() && row < this._app.height();
	};

	Selection.prototype.shift = function(event, direction) {
		if (f.isUndefined(this._origin)) {
			console.error("Tried shifting without any previous selection set, selecting cell at (0,0)");
			return this.select(this._app._model.get(0, 0));
		}

		var col = this._origin._col + direction.dx;
		var row = this._origin._row + direction.dy;
		if (!this._isValid(col, row))
			return;

		this.select(this._app._model.get(row, col));
	};

	Selection.prototype.expand = function(direction) {
		console.log(direction);
		var col = this._origin.col() + direction.dx;
		var row = this._origin.row() + direction.dy;
		if (!this._isValid(col, row))
			return;

		var fromRow = this._origin.row();
		var fromCol = this._origin.col();
		var toRow = fromRow + this._model.rows() + direction.dy;
		var toCol = fromCol + this._model.cols() + direction.dx;
		this._model = new Supreme.Model(this._app, this._app._model.getSubset(fromRow, fromCol, toRow, toCol));
		console.log(this._model);

	};

	Selection.prototype.edit = function() {
		this._input._edit(this._origin);
	};

	Selection.prototype.command = function(event) {
		this._origin.command(event);
	};

	Supreme.Selection = Selection;

})(window.Supreme = window.Supreme || {});