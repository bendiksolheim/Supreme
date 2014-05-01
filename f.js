(function(window) {

	function f(a) {
		this.array = a;
	}

	f.each = function(array, fn) {
		for (var i = 0; i < array.length; i++) {
			fn(array[i]);
		}
	}

	f.range = function(from, to) {
		if (typeof to === 'undefined') {
			to = from;
			from = 0;
		}
		var a = [];
		for (var i = from; i < to; i++) {
			a.push(i);
		}

		return new f(a);
	}

	f.map = function(array, fn) {
		var a = [];
		array.forEach(function(item) {
			a.push(fn(item));
		})

		return a;
	}

	f.prototype.each = function(fn) {
		this.array = f.each(this.array, fn);
		return this;
	};

	f.prototype.map = function(fn) {
		this.array = f.map(this.array, fn);
		return this;
	};

	f.prototype.get = function() {
		return this.array;
	};

	window.f = f;
})(window);