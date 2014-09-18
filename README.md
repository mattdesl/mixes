# mixes

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A minimal util to mixin functions and properties. This helps reduce the boilerplate and repetition of `MyClass.prototype` and `Object.defineProperty`.

```js
//mixin some stuff to MyClass.prototype
require('mixes')(MyClass, {

	//a function
	foo: function(a, b) {
		return a + b
	},
	
	//an object for Object.defineProperty
	bar: {
		get: function() {
			return "boop"
		}
	}	
})
```

Using the class:

```js
var m = new MyClass()
m.foo(a, b)
console.log( m.bar )
```

It also allows you to create collections of mixins easily:

```js
var mixes = require('mixes')

function Dagger() {
}

mixes(Dagger, require('./mixins/item'))
mixes(Dagger, require('./mixins/weapon'))
```

## Motivation

Take the following example:

```js
var mixes = require('mixes')

function MyClass() {
	this._blah = 0
}

mixes(MyClass, {
	//mix in functions
	foo: function(a, b) { 
		return a + b
	},

	bar: function() {
	},

	//mix in property
	blah: {
		get: function() {
			return this._blah
		},
		set: function(blah) {
			this._blah = blah || 0
		}
	}
})
```

The same code would look like this in pure JS:

```js
function MyClass() {
	this._blah = 0
}

MyClass.prototype.foo = function(a, b) {
	return a + b
}

MyClass.prototype.bar = function(a, b) {
}

Object.defineProperty(MyClass.prototype, "blah", {
	enumerable: true,
	configurable: true,
	get: function() {
		return this._blah
	},
	set: function(blah) {
		this._blah = blah || 0
	}
}
```

This is also nicer than the `Blah.prototype = { ... }` approach since it doesn't destroy your prototype chain (i.e. in the case of inheriting from a base class).

## Usage

[![NPM](https://nodei.co/npm/mixes.png)](https://nodei.co/npm/mixes/)

#### `mixes(ctor, entries)`

For a constructor function or object with `prototype`, mixes in the given functions and properties. `entries` is an object with named functions or objects. 

When an object is encountered, it is treated as a property and injected with `Object.defineProperty`. By default, `configurable` and `enumerable` are true if not specified, although you can override it like so:

```js
mixes(Foo, {
	bar: {
		enumerable: true,
		writable: false,
		value: 5
	}
})
```

Other types (numbers, strings, etc) are ignored.


#### `mixes.mix(obj, entries)`

The same as above, but operates on any object as opposed to an object's prototype.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/mixes/blob/master/LICENSE.md) for details.
