(function(Supreme) {

	var keys = {
		'9':				{event: 'selection:shift', args: {dx: 1, dy: 0}, preventDefault: true},
		'shift+9':			{event: 'selection:shift', args: {dx: -1, dy: 0}, preventDefault: true},
		'13':				{event: 'cell:edit'},
		'37':				{event: 'selection:shift', args: {dx: -1, dy: 0}},
		'38':				{event: 'selection:shift', args: {dx: 0, dy: -1}},
		'39':				{event: 'selection:shift', args: {dx: 1, dy: 0}},
		'40':				{event: 'selection:shift', args: {dx: 0, dy: 1}},
		'meta+66':			{event: 'cell:bold'},
		'meta+73':			{event: 'cell:emph'},
		'meta+shift+80':	{event: 'commander:show', preventDefault: true}
	};

	var commands = {
		'bold':				{event: 'cell:bold'},
		'italic':			{event: 'cell:emph'},
		'emph':				{event: 'cell:emph'}
	};

	var special = {'16': true, '17': true, '18': true, '91': true};

	function Command(app, table, container) {
		this._table = table;
		this._container = container;
		this._input = new CommandInput(this, container);
		table
			.domProp('tabIndex', '-1')
			.style('outline', 0)
			.focus();
		this._addCommands();
	}

	Command.prototype._addCommands = function() {
		this._table.on('keydown', this, false);
		this.on('commander:command', this.command, this);
		this.on('blur', function() {console.log("blur");this._table.focus();}, this);
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

	Command.prototype.command = function(event, command) {
		console.log(command);
		var event = commands[command];
		if (f.isUndefined(event))
			return;

		this.trigger(event.event, event.args);
	};

	f.extend(Command.prototype, Supreme.Events);
	Supreme.Command = Command;

	function CommandInput(command, container) {
		this._command = command;
		this._el = this._createElement();
		container.append(this._el);
		command.on('commander:show', this.show, this);
	}

	CommandInput.prototype._createElement = function() {
		var input = d('input.commander')
			.on('keydown blur', this);
		return input;
	};

	CommandInput.prototype.handleEvent = function(event) {
		if (event.type === 'blur')
			return this._command.trigger('blur');

		if (event.keyCode !== 13)
			return;

		this.done();
	};

	CommandInput.prototype.show = function() {
		this._el
			.addClass('active')
			.focus();
	};

	CommandInput.prototype.done = function() {
		this._command.trigger('commander:command', this._el.value());
		this._el
			.removeClass('active')
			.value('')
			.blur();
	};

})(window.Supreme = window.Supreme || {});