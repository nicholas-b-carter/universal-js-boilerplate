const guid = (function() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return () => s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
})()

const enableREST = (router) => {
    let collections = {}
    router.get('/collections/:collectionName', async (ctx, next) => {
        if (!collections[ctx.params.collectionName]) {
            ctx.body = []
        } else {
            ctx.body = collections[ctx.params.collectionName]
        }
    })

    router.post('/collections/:collectionName', async (ctx, next) => {
        var collection = collections[ctx.params.collectionName]
        if (!collection) {
            collection = collections[ctx.params.collectionName] = []
        }

        var result = ctx.request.body
        if (!result) {
            ctx.statusCode = 404
            return
        }

        if (result instanceof Array) {
            result.forEach(function(d) {
                d.id = guid()
                collections[ctx.params.collectionName].push(d)
            })
            ctx.body = result
        } else {
            result.id = guid()
            collections[ctx.params.collectionName].push(result)
            ctx.body = result
        }
    })

    router.get('/collections/:collectionName/:id', async (ctx, next) => {
        if (!collections[ctx.params.collectionName]) {
            ctx.statusCode = 401
            return
        }
        let result = collections[ctx.params.collectionName].filter(i => i.id === ctx.params.id)
        if (!result || !result.length) {
            ctx.body = "collection " + ctx.params.collectionName + " does not have an item with id " + ctx.params.id
            ctx.statusCode = 401
            return
        }
        ctx.body = result[0]
    })

    router.put('/collections/:collectionName/:id', function(ctx, next) {
        if (!collections[ctx.params.collectionName]) {
            ctx.statusCode = 401
            ctx.body = "collection " + ctx.params.collectionName + " does not exist."
            return
        }
        var result = collections[ctx.params.collectionName].filter(i => i.id === ctx.params.id)
        if (!result || !result.length) {
            ctx.statusCode = 401
            return
        }

        result[0] = {...result[0], ...ctx.request.body}

        ctx.body = result[0]
    })

    // DELETE /collections/:collectionName
    router.delete('/collections/:collectionName/:id', function(ctx, next) {
        if (!collections[ctx.params.collectionName]) {
            ctx.statusCode = 401
            return
        }

        if (!ctx.params.id && collections[ctx.params.collectionName].length) {
            ctx.statusCode = 401
            return
        }

        collections[ctx.params.collectionName] = collections[ctx.params.collectionName].filter(i => i.id !== ctx.params.id)
        ctx.body = {msg: 'success'}
    })
}

export default enableREST
