# mixes

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A minimal util to mixin functions and properties. This helps reduce the boilerplate and repetition of `MyClass.prototype` and `Object.defineProperty`.

```js
//mixin some stuff to MyClass.prototype
require('mixes')(MyClass, {

	//mixin functions
	foo: function(a, b) {
		return a + b
	},
	
	//mixin an object for Object.defineProperty
	bar: {
		get: function() {
			return "boop"
		}
	}	
})
```

Then, you can use them as expected:

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

## motivation

The earlier code would look like this in pure JS, and tends to bloat as you add more functions and properties.

```js
MyClass.prototype.foo = function(a, b) {
	return a + b
}

Object.defineProperty(MyClass.prototype, "bar", {
	enumerable: true,
	configurable: true,
	get: function() {
		return "boop"
	}
})
```

This is also nicer than `Blah.prototype = { ... }` since it doesn't destroy your prototype chain (i.e. if you're inheriting from a base class).

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

The same as above, but operates on any object as opposed to an object's `prototype`.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/mixes/blob/master/LICENSE.md) for details.
