(function(Supreme) {

	/*var commands = [
		'ARROW_LEFT': {}
	]*/

	var keys = {
		'37': {event: 'key:left', args: {dx: -1, dy: 0}},
		'38': {event: 'key:up', args: {dx: 0, dy: -1}},
		'39': {event: 'key:right', args: {dx: 1, dy: 0}},
		'40': {event: 'key:down', args: {dx: 0, dy: 1}}
	};

	function Command(el) {
		this._el = el;
	}

	Command.prototype.addCommands = function() {
		this._el.on('keydown', this, false);
	};

	Command.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'keydown':
				this.keydown(event);
				break;
		}
	};

	Command.prototype.keydown = function(event) {
		var keyCode = event.keyCode;
		var key = keys[keyCode];
		if (f.isUndefined(key))
			return;

		this.trigger(key.event, key.args);
	};

	f.extend(Command.prototype, Supreme.Events);
	Supreme.commander = new Command(d('html', true))
	Supreme.commander.addCommands();

})(window.Supreme = window.Supreme || {});