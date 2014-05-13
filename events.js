(function(Supreme) {

	var Events = {
		on: function(event, callback, context) {
			var callbacks = this._callbacks || (this._callbacks = {});
			var events = callbacks[event] || (callbacks[event] = []);
			events.push({ callback: callback, context: context});
		},

		off: function(event, callback, context) {
			delete this._callbacks[event];
		},

		trigger: function(event) {
			var args = Array.prototype.slice.call(arguments, 1);
			var callbacks = this._callbacks || {};
			var events = callbacks[event] || [];
			events.forEach(function(event) {
				event.callback.apply(event.context || this, args);
			});
		}
	}

	Supreme.Events = Events;

})(window.Supreme = window.Supreme || {});