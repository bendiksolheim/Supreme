(function(window) {
	function Cell(data) {
		this.data = data;
		this.element = this.__createElement();
	}

	Cell.prototype.__createElement = function() {
		var td = document.createElement('td');
		td.className = 'editable';
		td.tabIndex = '-1';
		td.addEventListener('click', this, false);
		td.addEventListener('focusout', this, false);
		td.addEventListener('change', this, false);
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'click':
				this.click();
				break;
			case 'focusout':
				this.unfocus();
			case 'change':
				this.change(this.element.innerHTML);
				break;
		}
		console.log(event);
	};

	Cell.prototype.click = function() {
		this.element.contentEditable = true;
	};

	Cell.prototype.unfocus = function() {
		this.element.contentEditable = false;
	};

	Cell.prototype.change = function(value) {
		this.data = value;
		this.element.innerHTML = value;
	};

	window.Cell = Cell;
})(window);