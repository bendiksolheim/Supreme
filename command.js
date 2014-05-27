(function(Supreme) {

	var keys = {
		'9':		{event: 'selecten:shift', args: {dx: 1, dy: 0}, preventDefault: true},
		'shift+9':	{event: 'selecten:shift', args: {dx: -1, dy: 0}, preventDefault: true},
		'13':		{event: 'cell:edit'},
		'37':		{event: 'selecten:shift', args: {dx: -1, dy: 0}},
		'38':		{event: 'selecten:shift', args: {dx: 0, dy: -1}},
		'39':		{event: 'selecten:shift', args: {dx: 1, dy: 0}},
		'40':		{event: 'selecten:shift', args: {dx: 0, dy: 1}},
		'meta+66':	{event: 'cell:bold'},
		'meta+73':	{event: 'cell:emph'}
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

		if (event.shiftKey)
			keyCode = 'shift+' + keyCode;
		if (event.metaKey)
			keyCode = 'meta+' + keyCode;

		var key = keys[keyCode];

		if (f.isUndefined(key))
			return;

		key.preventDefault && event.preventDefault();

		this.trigger(key.event, key.args);
	};

	f.extend(Command.prototype, Supreme.Events);
	Supreme.commander = new Command(d('html', true))
	Supreme.commander.addCommands();

})(window.Supreme = window.Supreme || {});