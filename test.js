var mixes = require('./')
var test = require('tape').test

function MyClass() {
}

MyClass.prototype.exists = function() {
	return 'exists'
}

MyClass.prototype.overwrites = function() {
	return 'overwrites'
}

test('it should mix in', function(t) {

	mixes(MyClass, {
		foo: function() { return 'foo' }
	})

	mixes(MyClass, {
		overwrites: function() { return 'overwritten' },

		simpleProp: {
			get: function() { return 'simpleProp' }
		},
		customProp: {
			value: 5,
			enumerable: false,
			configurable: false,
			writable: false
		}
	})

	var obj = new MyClass()

	t.equal(obj.foo(), 'foo')
	t.equal(obj.exists(), 'exists')
	t.equal(obj.overwrites(), 'overwritten')
	t.equal(obj.simpleProp, 'simpleProp')

	var desc = Object.getOwnPropertyDescriptor(MyClass.prototype, 'simpleProp')
	t.equal(desc.configurable, true)
	t.equal(desc.enumerable, true)

	var desc2 = Object.getOwnPropertyDescriptor(MyClass.prototype, 'customProp')
	t.equal(desc2.configurable, false)
	t.equal(desc2.enumerable, false)
	t.equal(desc2.writable, false)

	t.end()
})