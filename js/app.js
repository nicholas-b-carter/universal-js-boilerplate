// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
import fetch from "isomorphic-fetch"

// import * as u from 'universal-utils'
// const {fp,vdom,lazy,hamt,csp,fetch:_fetch,router:{router:_r}} = u,
//     {debounce,m,html,rAF,mount,update,qs,container} = vdom
// import * as components from 'universal-utils-vdom-components'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//         // update()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.log('registration failed', e)
//             // Registration failed
//     })
//
//     const unregister = () => navigator.serviceWorker.getRegistrations().then(registrations => {
//         for (let registration of registrations) {registration.unregister()}
//     })
//     window.unregister = unregister
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'

function app() {
    // start app
    // new Router()
    DOM.render(<p>test 2</p>, document.querySelector('.container'))
}

app()