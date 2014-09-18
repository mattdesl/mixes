var xtend = require('xtend')

var defaults = {
	enumerable: true,
	configurable: true
}

module.exports = function mixes(ctor, entries) {
	var proto = ctor.prototype
	
	for (var k in entries) {
		if (!entries.hasOwnProperty(k))
			continue
		var f = entries[k]
		if (typeof f === 'function') {
			proto[k] = f
		} else if (typeof f === 'object') {
			var def = xtend(defaults, f)
			Object.defineProperty(proto, k, def);
		}
	}
}