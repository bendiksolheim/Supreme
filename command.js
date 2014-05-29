(function(Supreme) {

	var keys = {
		'9':				{event: 'selecten:shift', args: {dx: 1, dy: 0}, preventDefault: true},
		'shift+9':			{event: 'selecten:shift', args: {dx: -1, dy: 0}, preventDefault: true},
		'13':				{event: 'cell:edit'},
		'37':				{event: 'selecten:shift', args: {dx: -1, dy: 0}},
		'38':				{event: 'selecten:shift', args: {dx: 0, dy: -1}},
		'39':				{event: 'selecten:shift', args: {dx: 1, dy: 0}},
		'40':				{event: 'selecten:shift', args: {dx: 0, dy: 1}},
		'meta+66':			{event: 'cell:bold'},
		'meta+73':			{event: 'cell:emph'},
		'meta+shift+80':	{event: 'commander:toggle', preventDefault: true}
	};

	var special = {'16': true, '17': true, '18': true, '91': true};

	function Command(app, container) {
		this._container = container;
		this._el = this._createElement();
		container
			.domProp('tabIndex', '-1')
			.focus()
			.append(this._el);
		this._addCommands();
	}

	Command.prototype._addCommands = function() {
		this._container.on('keydown', this, false);
		this.on('commander:toggle', this.toggle, this);
		this.on('blur', this._container.focus, this);
	};

	Command.prototype._createElement = function() {
		var input = d('input.commander');
		return input;
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
		if (keyCode in special)
			return;

		console.log(keyCode);

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

	Command.prototype.toggle = function() {
		this._el.toggleClass('active');
		this._el.focus();
	};

	f.extend(Command.prototype, Supreme.Events);
	//Supreme.commander = new Command(d('.table'));
	//Supreme.commander.addCommands();
	Supreme.Command = Command;

})(window.Supreme = window.Supreme || {});