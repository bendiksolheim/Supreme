(function(Supreme) {
	function toChar(n) {
		return String.fromCharCode(n + 65);
	}

	function TableView(app, table, model) {
		this._app = app;
		this._table = table;
		this._createHeaders(model);
		this._createBody(model);
	}

	TableView.prototype._createHeaders = function(model) {
		var thead = d('thead');
		var tr = d('tr')
			.append(d('th.header.corner'))
			.append(f.range(model.cols()).map(function(col) {
				return d('th.header.col-header').html(toChar(col));
			}).get());
		thead.append(tr);
		this._table.append(thead);
	};

	TableView.prototype._createBody = function(model) {
		var tbody = d('tbody');

		f.range(model.rows()).each(function(row) {
			var tr = d('tr')
				.append(d('td.header.row-header').html(row))
				.append(f.range(model.cols()).map(function(col) {
					return model.get(row, col).el();
				}).get());
			tbody.append(tr);
		});

		this._table.append(tbody);
	};

	TableView.prototype.focus = function() {
		console.log("a");
		this._table.focus();
	};

	Supreme.TableView = TableView;
})(window.Supreme = window.Supreme || {});