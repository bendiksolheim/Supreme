(function(window) {
	function each(array, fn) {
		for (var i = 0; i < array.length; i++) {
			fn(array[i]);
		}
	}

	function isUndefined(v) {
		return typeof v === 'undefined';
	}

	function _d(element) {
		return new d(element);
	}

	function d(element) {
		if (element[0] === '.') {
			this.el = document.querySelector(element);
			return this;
		}

		element = element.split('.');
		var el = document.createElement(element[0]);
		each(element.slice(1), function(c) {
			el.classList.add(c);
		});
		this.el = el;
		return this;
	}

	d.prototype.get = function() {
		return this.el;
	};

	d.prototype.on = function(eventList, listener, useCapture) {
		if (typeof eventList === 'string')
			eventList = eventList.split(' ');

		var self = this;
		each(eventList, function(ev) {
			self.el.addEventListener(ev, listener, useCapture);
		});
	};

	d.prototype.append = function(child) {
		this.el.appendChild(child.get());
	};

	d.prototype.html = function(html) {
		if (html !== null) {
			this.el.innerHTML = html;
			return;
		}

		return this.el.innerHTML;
	};

	d.prototype.style = function(attr, value) {
		this.el.style[attr] = value;
	};

	d.prototype.css = function(attr) {
		return window.getComputedStyle(this.el)[attr];
	}

	d.prototype.hasClass = function(c) {
		return this.el.classList.contains(c);
	};

	d.prototype.addClass = function(c) {
		this.el.classList.add(c);
	};

	d.prototype.removeClass = function(c) {
		this.el.classList.remove(c);
	};

	d.prototype.focus = function() {
		this.el.focus();
	};

	d.prototype.blur = function() {
		this.el.blur();
	};

	d.prototype.value = function(val) {
		if (!isUndefined(val)) {
			this.el.value = val;
			return;
		}

		return this.el.value;
	};

	d.prototype.domProp = function(prop, val) {
		if (isUndefined(val)) {
			return this.el[prop];
		}

		this.el[prop] = val;
	};

	window.d = _d;
})(window);