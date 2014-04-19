(function(window) {
	function Cell(value) {
		this.value = value;
		this.element = this.__createElement();
	}

	Cell.prototype.__createElement = function() {
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
				this.edit();
				break;
			case 'focusout':
				this.unfocus();
				break;
			case 'change':
				this.change(this.element.innerHTML);
				break;
			case 'keypress':
				this.keypressed(event);
				break;
		}
	};

	Cell.prototype.edit = function(event) {
		this.element.contentEditable = true;
		this.element.focus();
	};

	Cell.prototype.unfocus = function() {
		this.element.contentEditable = false;
	};

	Cell.prototype.change = function(value) {
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

	Cell.prototype.keypressed = function(event) {
		var keyCode = event.keyCode;
		if (keyCode == 13) {
			this.element.blur();
		}
	};

	window.Cell = Cell;
})(window);