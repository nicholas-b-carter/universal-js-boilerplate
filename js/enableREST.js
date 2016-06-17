const enableREST = (router, collectionName, model) => {

    router.get('/api/'+collectionName, async (ctx, next) => {
        await model.findAll().then(instance => ctx.body = JSON.stringify(instance))
    })

    router.post('/api/'+collectionName, async (ctx, next) => {
        var result = ctx.request.body
        if (!result) {
            ctx.status = 404
            return
        }

        await model.create(result)
            .then(_ => [ctx.status = 200, ctx.body = result])
            .catch(e => ctx.status = 400)
    })

    router.get('/api/'+collectionName+'/:id', async (ctx, next) => {
        await model.findById(ctx.params.id)
        .then((instance) => {
            if(!instance) {
                ctx.body = "collection " + collectionName + " does not have an item with id " + ctx.params.id
                ctx.status = 401
                return
            }
            ctx.body = JSON.stringify(instance)
        })
    })

    router.put('/api/'+collectionName+'/:id', async (ctx, next) => {
        var result = ctx.request.body

        if (!result) {
            ctx.status = 404
            return
        }

        await model.findById(ctx.params.id)
            .then(m => {
                if(!m){
                    ctx.status = 400
                    return
                }
                return m.update(result).then(_ => ctx.status = 200)
            })
    })

    // DELETE /api/:collectionName
    router.delete('/api/'+collectionName+'/:id', async (ctx, next) => {
        await model.findById(ctx.params.id)
            .then(m => {
                if(!m){
                    ctx.status = 400
                    return
                }
                return m.destroy().then(_ => ctx.status = 200)
            })
    })
}

export default enableREST
