(function(Supreme) {
	function TableView(app, table, model) {
		this._app = app;
		this._table = table;
		this._createHeaders(model);
		this._createBody(model);
	}

	TableView.prototype._createHeaders = function(model) {
		var thead = d('thead');
		var tr = d('tr');
		var corner = d('th.header.corner');
		tr.append(corner);
		for (var col = 0; col < model.cols(); col++) {
			var th = d('th.header.col-header');
			th.html(String.fromCharCode(col + 65));
			tr.append(th);
		}
		thead.append(tr);
		this._table.append(thead);
	};

	TableView.prototype._createBody = function(model) {
		var tbody = d('tbody');
		tbody.on('keydown', this._app, false);
		tbody.domProp('tabIndex', '-1');
		this.tbody = tbody;
		for (var row = 0; row < model.rows(); row++) {
			var tr = d('tr');
			var rowHeader = d('td.header.row-header');
			rowHeader.html(row);
			tr.append(rowHeader);
			for (var col = 0; col < model.cols(); col++) {
				tr.append(model.get(col, row).el());
			}
			tbody.append(tr);
		}
		this._table.append(tbody);
	};

	TableView.prototype.focus = function() {
		this.tbody.focus();
	};

	Supreme.TableView = TableView;
})(window.Supreme = window.Supreme || {});