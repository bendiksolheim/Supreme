(function(window) {

	var isArray = Array.isArray || function(v) {
		return Object.prototype.toString.call(v) === '[object Array]';
	}

	var isString = function(s) {
		return Object.prototype.toString.call(s) === '[object String]';
	}

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

	f.filter = function(array, fn) {
		var a = [];
		array.forEach(function(item) {
			fn(item) && a.push(item);
		});
		return a;
	}

	f.flatten = function(array) {
		function flatten(array, agg) {
			if (array.length === 0)
				return agg;

			if (Array.isArray(array[0]))
				return flatten(array[0].concat(array.slice(1)), agg);

			agg.push(array[0]);
			return flatten(array.slice(1), agg);
		};

		return flatten(array, []);
	}

	f.prototype.each = function(fn) {
		this.array = f.each(this.array, fn);
		return this;
	};

	f.prototype.map = function(fn) {
		this.array = f.map(this.array, fn);
		return this;
	};

	f.prototype.filter = function(fn) {
		this.array = f.filter(this.array, fn);
		return this;
	};

	f.prototype.flatten = function() {
		this.array = f.flatten(this.array);
		return this;
	};

	f.prototype.get = function() {
		return this.array;
	};

	f.isUndefined = function(v) {
		return typeof v === 'undefined';
	}

	f.isObject = function(obj) {
		return obj === Object(obj);
	}

	f.isArray = isArray;

	f.isString = isString;

    f.isNumber = function(n) {
        return /^\d+$/.test(n);
    }

	// from underscore.js
	f.extend = function(obj) {
		if (!f.isObject(obj)) return obj;
		new f(Array.prototype.slice.call(arguments, 1)).each(function(source) {
			for (var prop in source)
				obj[prop] = source[prop];
		});

		return obj;
	}

	window.f = f;
})(window);