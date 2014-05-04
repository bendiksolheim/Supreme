(function(Supreme) {

	function px(value) {
		return value + 'px';
	}

	/*

	Selection.js should handle all selection (/focus) logic, maybe including input.
	Should probably consider moving input into this class

	*/

	function Selection(app) {
		this._app = app;
		this._el = d('div.selection');
		this._background = d('div.background');
		this._handle = d('div.handle');
		this._selected = undefined;
		this._input = new Supreme.Input();
		document.body.appendChild(this._el.append(this._background.append(this._handle)).get());
	}

	Selection.prototype.select = function(cell) {
		this._input.cancelEditing();
		this._selected = cell;
		var bounds = cell.bounds();
		this._el
			.style('left', px(bounds.x))
			.style('top', px(bounds.y))
			.style('width', px(bounds.width + 1))
			.style('height', px(bounds.height + 1));
	};

	Selection.prototype.shift = function(direction) {
		if (d.isUndefined(this._selected)) {
			console.error("Tried shifting without any previous selection set, selecting cell at (0,0)");
			return this.select(this._app._model.get(0, 0));
		}

		var col = this._selected._col + direction.dx;
		var row = this._selected._row + direction.dy;
		if (col < 0 || row < 0 || col >= this._app.width() || row >= this._app.height())
			return;

		this.select(this._app._model.get(col, row));
	};

	Selection.prototype.edit = function() {
		this._input._edit(this._selected);
	};

	Supreme.Selection = Selection;

})(window.Supreme = window.Supreme || {});