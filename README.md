# hal-body
[![Build Status](https://travis-ci.org/seznam/hal-body.svg?branch=master)](https://travis-ci.org/seznam/hal-body)

Parse [hal+json](http://stateless.co/hal_specification.html) body using [halson](https://github.com/seznam/halson) and [co-body](https://github.com/visionmedia/co-body).

## Installation

```
$ npm install hal-body
```

## Options
Available via [raw-body](https://github.com/stream-utils/raw-body/blob/master/index.js):

  - `limit` number or string representing the request size limit (1mb for json)

## Example

```js
var parseHal = require('hal-body');

// application/hal+json
var resource = yield parseHal(req);
console.log(resource.title));
console.log(resource.getLink('self'));
```

## Koa
This lib also supports `ctx.req` in Koa (or other libraries),
so that you may simply use `this` instead of `this.req`.

```js
var parseHal = require('hal-body');

// application/hal+json
var resource = yield parseHal(this);
console.log(resource.title);
console.log(resource.getLink('self'));
```

# License
MIT
