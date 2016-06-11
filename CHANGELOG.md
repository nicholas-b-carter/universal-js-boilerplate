
## 2.0

The largest change for this release: Koa v2 is now the default serverside library handling requests (changed from Express).

This Koa v2 code has some default code setup for hosting code over HTTPS, as well as taking advantage of the SPDY & HTTP/2 protocols for even faster content delivery. Here's an overview of the features:

* Socket.io support with sticky-sessions (for HAProxy)
* Clustering with the cluster module
* Smart header support for ETags and conditional gets
* Gzip compression on responses
* Signed, cookie-based sessions
* Request logging (morgan)
* Static file serving
* Favicon middleware
* HTTP/2 and SPDY over TLS
* Routing with async or sync routes (via Koa itself)
* Support for Koa 1.0 and 2.0 middleware with koa-adapter

More info about Koa v2 here: https://github.com/koajs/koa/tree/v2.x
