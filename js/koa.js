import polyfill from "babel-polyfill"
const cluster = require('cluster')
import _router from 'koa-router'
const router = _router()
// middleware
import send from 'koa-send'
import conditional from 'koa-conditional-get'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import morgan from 'koa-morgan'
import favicon from 'koa-favicon'
import session from 'koa-session'
// adapt pre Koa 2.0 middle ware to be compatible with Koa 2.0.
import adapt from 'koa-convert'
import etag from 'koa-etag'
import koa from 'koa'
import request from 'request'
import passport from 'koa-passport'
export const app = new koa()
const logger = morgan('combined')
import enforceHttps from 'koa-sslify'
const config = require('../config.json')

if(config.https){
    if(config.heroku){
        app.use(enforceHttps({
            trustProtoHeader: true
        }))
    } else {
        app.use(enforceHttps())
    }
}

// app.use(favicon(__dirname+'../dist/icon.ico'))
// app.use(logger)
app.use(compress({
    filter: () => true,
    flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(async (ctx,next) => {
    await next()
    await send(ctx, ctx.path, { root: __dirname + '/../dist' })
})
// app.use(conditional())
// app.use(etag())
// app.keys = [ Array(4).fill(true).map(x => Math.random()+'').join('') ]
// app.use(adapt(session({ maxAge: 24 * 60 * 60 * 1000 }, app)))
// app.use(bodyParser())

// simple middleware that converts querystring into key-value pairs
const parse = qs => qs.split('&').reduce((a,v,i) => {
    let [key, val] = v.split('=')
    if(!key) return a
    return {...a, [key]: val || true}
}, {})

app.use(async (ctx, next) => {
    ctx.queryparams = parse(ctx.request.querystring)
    await next()
})

/**
 * RESTful API
 */
// import enableREST from './enableREST'
// import * as models from './models'
// import s from 'sequelize'
// enableREST(router, 'users', models.User)
// enableREST(router, 'answers', models.Answer)
// enableREST(router, 'polls', models.Poll)

// example manual route that queries DB
// router.get('/api/polls', async (ctx, next) => {
//     await models.Poll.findAll({include: [models.Answer]}).then(data => ctx.body = JSON.stringify(data))
// })

/**
 * Turn on passport (authenticate your users through twitter, etc)
 */

// passport.serializeUser((user, done) =>
//     models.User.findById(user.id).then(user =>
//         !user ? done('No user exists with that UserId') : done(null, user.id)))

// passport.deserializeUser((id, done) =>
//     models.User.findById(id).then(user =>
//         !user ? done('No user exists with that UserId') : done(null, user)))

// const LocalStrategy = require('passport-local').Strategy
// import crypto from 'crypto'
// passport.use(new LocalStrategy((email, password, done) => {
//     let hash = crypto.createHash('sha256')
//     hash.update(password)
//     models.User.findOne({
//         where: {
//             email: { $eq : email },
//             hash: { $eq: hash.digest('base64') }
//         }
//     }).then(user => !user ? done(null, false) : done(null, user))
// }))

// uncomment to enable passport
// app.use(passport.initialize())
// app.use(passport.session())

// router.get('/logout', ctx => {
//     ctx.logout()
//     ctx.redirect('/')
// })

// router.post('/login',
//     passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}))

// const authVia = (router, name, success='/', failure='/failure-to-auth') => {
//     router.get(`/auth/${name}`, passport.authenticate(name))
//     router.get(`/auth/${name}/callback`, passport.authenticate(name, {successRedirect: success, failureRedirect: failure}))
// }

// uncomment to enable auth via facebook
// authVia(router, 'facebook')

// uncomment to enable auth via twitter
// authVia(router, 'twitter')

// uncomment to enable auth via google
// authVia(router, 'google')

// uncomment the following to require someone to be logged in, else redirect them to /not-logged-in
// (needed if you turn on any authentication)
//
// app.use((ctx, next) => {
//     if (ctx.isAuthenticated()) {
//         return next()
//     } else {
//         ctx.redirect('/not-logged-in')
//     }
// })

// default proxying
import proxify from './proxy'

// add your proxies here.
//
// examples:
// proxify(router, '/yummly/recipes', 'http://api.yummly.com/v1/api/recipes')
// proxify(router, '/brewery/styles', 'https://api.brewerydb.com/v2/styles')
// proxify(router, '/macrofab/:r1/:r2/:r3', 'https://demo.development.macrofab.com/api/v2/:r1/:r2/:r3', {Accept: 'application/json'})

/**
 * Other routes (HTML, etc)
**/

// import {index} from './partials'
router.get(['/', '/index.html'], ctx => {
    ctx.body = index()
})

// router.get('/', (ctx, next) => {
//     ctx.status = 200
//     ctx.body = 'Hello world from worker ' + (cluster.worker ? cluster.worker.id : '') + '!'
// })
//
// router.get('/students/:id', ctx => {
//     console.log(ctx.params.id)
//     ctx.body = { name:'test', id: id }
// })


app.use(router.routes())
app.use(router.allowedMethods())