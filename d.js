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
			this._el = document.querySelector(element);
			return this;
		}

		element = element.split('.');
		var el = document.createElement(element[0]);
		each(element.slice(1), function(c) {
			el.classList.add(c);
		});
		this._el = el;
		return this;
	}

	d.prototype.get = function() {
		return this._el;
	};

	d.prototype.on = function(eventList, listener, useCapture) {
		if (typeof eventList === 'string')
			eventList = eventList.split(' ');

		var self = this;
		each(eventList, function(ev) {
			self._el.addEventListener(ev, listener, useCapture);
		});
	};

	d.prototype.append = function(child) {
		this._el.appendChild(child.get());
	};

	d.prototype.html = function(html) {
		if (html !== null) {
			this._el.innerHTML = html;
			return;
		}

		return this._el.innerHTML;
	};

	d.prototype.style = function(attr, value) {
		this._el.style[attr] = value;
	};

	d.prototype.css = function(attr) {
		return window.getComputedStyle(this._el)[attr];
	}

	d.prototype.hasClass = function(c) {
		return this._el.classList.contains(c);
	};

	d.prototype.addClass = function(c) {
		this._el.classList.add(c);
	};

	d.prototype.removeClass = function(c) {
		this._el.classList.remove(c);
	};

	d.prototype.focus = function() {
		this._el.focus();
	};

	d.prototype.blur = function() {
		this._el.blur();
	};

	d.prototype.value = function(val) {
		if (!isUndefined(val)) {
			this._el.value = val;
			return;
		}

		return this._el.value;
	};

	d.prototype.domProp = function(prop, val) {
		if (isUndefined(val)) {
			return this._el[prop];
		}

		this._el[prop] = val;
	};

	_d.isUndefined = isUndefined;
	_d.each = each;

	window.d = _d;
})(window);