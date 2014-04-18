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
		return td;
	};

	Cell.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'click':
				this.click();
				break;
			case 'focusout':
				this.unfocus();
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

	window.Cell = Cell;
})(window);