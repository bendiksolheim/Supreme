(function(Supreme) {

	var keys = {
		'13': {event: 'cell:edit'},
		'37': {event: 'key:left', args: {dx: -1, dy: 0}},
		'38': {event: 'key:up', args: {dx: 0, dy: -1}},
		'39': {event: 'key:right', args: {dx: 1, dy: 0}},
		'40': {event: 'key:down', args: {dx: 0, dy: 1}},
		'66': {event: 'cell:bold', metaKey: true},
		'73': {event: 'cell:emph', metaKey: true}
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
		console.log('keyCode: ' + keyCode);
		var key = keys[keyCode];
		if (f.isUndefined(key))
			return;
		
		if (!f.isUndefined(key.metaKey) && key.metaKey !== event.metaKey)
			return

		this.trigger(key.event, key.args);
	};

	f.extend(Command.prototype, Supreme.Events);
	Supreme.commander = new Command(d('html', true))
	Supreme.commander.addCommands();

})(window.Supreme = window.Supreme || {});