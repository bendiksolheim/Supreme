(function(window) {
	function Cell(value) {
		this.value = value;
		this.element = this._createElement();
	}

	Cell.prototype._createElement = function() {
		var td = document.createElement('td');
		td.className = 'editable';
		td.tabIndex = '-1';
		td.addEventListener('dblclick', this, false);
		td.addEventListener('focusout', this, false);
		td.addEventListener('change', this, false);
		td.addEventListener('keypress', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'dblclick':
				this._edit();
				break;
			case 'focusout':
				this._unfocus();
				break;
			case 'change':
				this._change(this.element.innerHTML);
				break;
			case 'keypress':
				this._keypressed(event);
				break;
		}
	};

	Cell.prototype._edit = function(event) {
		this.element.contentEditable = true;
		this.element.focus();
	};

	Cell.prototype._unfocus = function() {
		this.element.contentEditable = false;
	};

	Cell.prototype._change = function(value) {
		this.value = value;
		this.element.innerHTML = value;
	};

	Cell.prototype.activate = function() {
		var event = new MouseEvent('dblclick', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});
		this.element.dispatchEvent(event);
	};

	Cell.prototype._keypressed = function(event) {
		var keyCode = event.keyCode;
		if (keyCode == 13) {
			this.element.blur();
		}
	};

	window.Cell = Cell;
})(window);