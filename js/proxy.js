const replaceRemoteTokens = (ctx, webUrl, tokens=webUrl.match(/:(\w+)/ig)) =>
    (tokens || []).reduce((a, t) =>
        a.replace(new RegExp(t, 'ig'), ctx.params[t.substr(1)]), webUrl)

const get = (url, headers={}) =>
    new Promise((res,rej) => {
        request({
            url,
            headers: {
                'User-Agent': 'request',
                ...headers
            }
        }, (error, response, body) => {
            if(!error) { // && response.statusCode === 200
                return res(body)
            }
            return rej(error)
        })
    })

const proxify = (router, localUrl, webUrl, headers) => {
    router.get(localUrl, async (ctx, next) => {
        try {
            var data = await get(replaceRemoteTokens(ctx, webUrl) + (ctx.req._parsedUrl.search || ''), headers)
        } catch(e) {
            ctx.body = e
            return
        }
        ctx.body = data
    })

    // router.post(localUrl, async (ctx, next) => {
    //     let data = await request.post(replaceRemoteTokens(ctx.req, webUrl) + ctx.req._parsedUrl.search)//, {form:ctx.req.query})
    //     ctx.body = data
    // })
}

export default proxify