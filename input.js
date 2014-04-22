(function(Supreme) {
	function px(value) {
		return value + 'px';
	}

	function Input() {
		this.element = this._createElement();
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
		var element = this.element;
		element.style('left', px(cellBounds.x));
		element.style('top', px(cellBounds.y));
		element.style('width', px(cellBounds.width));
		element.style('height', px(cellBounds.height));
	};

	Input.prototype._edit = function(cell) {
		this.cell = cell;
		var element = this.element;
		element.value(cell.value());
		this._moveTo(cell.bounds());
		this._show();
		this.element.focus();
	};

	Input.prototype._doneEditing = function() {
		this.cell.change(this.element.value());
		this._hide();
		this.element.value('');
		this.element.blur();
		this.cell.focus();
	};

	Input.prototype._show = function() {
		var background = this.cell.element.css('backgroundColor');
		this.element.style('backgroundColor', background);
		this.element.style('display', 'block');
	};

	Input.prototype._hide = function() {
		this.element.style('display', 'none');
	};

	Supreme.Input = Input;
})(window.Supreme = window.Supreme || {});