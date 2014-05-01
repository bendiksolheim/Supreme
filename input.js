(function(Supreme) {
	function px(value) {
		return value + 'px';
	}

	function Input() {
		this._el = this._createElement();
		document.body.appendChild(this._el.get());
	}

	Input.prototype._createElement = function() {
		var input = d('input.input')
			.style('display', 'none')
			.style('position', 'absolute')
			.style('borderWidth', 0)
			.style('pointerEvents', 'non')
			.on('keydown', this, false);
		return input;
	};

	Input.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'keydown':
				this._keyDown(event.keyCode);
				break;
		}
	};

	Input.prototype._keyDown = function(keyCode) {
		if (keyCode === 13)
			this._doneEditing();
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
		this.cell.focus();
	};

	Supreme.Input = Input;
})(window.Supreme = window.Supreme || {});