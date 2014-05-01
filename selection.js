(function(Supreme) {

	/*

	Selection should handle all selection (/focus) logic, maybe including input.
	Should probably consider moving input into this class

	*/

	function Focus() {
		this._el = this._createElement();
		document.body.appendChild(this._el.get());
	}

	Focus.prototype._createElement = function() {
		var focus = d('div.focus')
			/*.style('display', 'none')*/
			.style('position', 'absolute')
			.style('background', 'red');
		return focus;
	};

	Supreme.Focus = Focus;

})(window.Supreme = window.Supreme || {});