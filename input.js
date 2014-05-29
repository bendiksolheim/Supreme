(function(Supreme) {
	function px(value) {
		return value + 'px';
	}

	function Input(app) {
		this._app = app;
		this._el = this._createElement();
		app.container().append(this._el);
	}

	Input.prototype._createElement = function() {
		var input = d('input.input')
			.style('display', 'none')
			.style('position', 'absolute')
			.style('borderWidth', 0)
			.style('pointerEvents', 'none')
			.on('keydown blur', this, false);
		return input;
	};

	Input.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'keydown':
				this._keyDown(event);
				break;
			case 'blur':
				this._app.commander().trigger('blur');
		}
	};

	Input.prototype._keyDown = function(event) {
		event.stopPropagation();
		var keyCode = event.keyCode;
		if (keyCode === 13) {
			this._doneEditing();
		}
	};

	Input.prototype._moveTo = function(cellBounds) {
		this._el
			.style('left', px(cellBounds.x))
			.style('top', px(cellBounds.y))
			.style('width', px(cellBounds.width))
			.style('height', px(cellBounds.height));
	};

	Input.prototype._edit = function(cell) {
		this.cell = cell;
		var background = this.cell.el().css('backgroundColor');
		this._moveTo(cell.bounds());
		this._el
			.value(cell.value())
			.style('backgroundColor', background)
			.style('display', 'block')
			.focus();
		this._el.focus();
	};

	Input.prototype._doneEditing = function() {
		this.cell.change(this._el.value());
		this._el
			.style('display', 'none')
			.value('')
			.blur();
	};

	Input.prototype.cancelEditing = function() {
		this.cell = undefined;
		this._el
			.value('')
			.style('display', 'none')
			.blur();
	};

	Supreme.Input = Input;
})(window.Supreme = window.Supreme || {});