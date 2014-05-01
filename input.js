(function(Supreme) {
	function px(value) {
		return value + 'px';
	}

	function Input() {
		this._el = this._createElement();
	}

	Input.prototype._createElement = function() {
		var input = d('input.input');
		input.style('display', 'none');
		input.style('position', 'absolute');
		input.style('borderWidth', 0);
		input.style('pointerEvents', 'none');
		input.on('keydown', this, false);
		document.body.appendChild(input.get());
		return input;
	};

	Input.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'keydown':
				this._keyDown(event);
				break;
		}
	};

	Input.prototype._keyDown = function(event) {
		if (event.keyCode === 13)
			this._doneEditing();
	};

	Input.prototype._moveTo = function(cellBounds) {
		var element = this._el;
		element.style('left', px(cellBounds.x));
		element.style('top', px(cellBounds.y));
		element.style('width', px(cellBounds.width));
		element.style('height', px(cellBounds.height));
	};

	Input.prototype._edit = function(cell) {
		this.cell = cell;
		var element = this._el;
		element.value(cell.value());
		this._moveTo(cell.bounds());
		this._show();
		this._el.focus();
	};

	Input.prototype._doneEditing = function() {
		this.cell.change(this._el.value());
		this._hide();
		this._el.value('');
		this._el.blur();
		this.cell.focus();
	};

	Input.prototype._show = function() {
		var background = this.cell.el().css('backgroundColor');
		this._el.style('backgroundColor', background);
		this._el.style('display', 'block');
	};

	Input.prototype._hide = function() {
		this._el.style('display', 'none');
	};

	Supreme.Input = Input;
})(window.Supreme = window.Supreme || {});