import s from './db'
import sq from 'sequelize'

export const User = s.define('user', {
    role: { type: sq.ENUM, values: ['user', 'admin'], defaultValue: 'user' },
    email: { type: sq.STRING, validate: {isEmail:true} },
    hash: { type: sq.STRING },
}, { freezeTableName: true })

export const Answer = s.define('answer', {
    text: { type: sq.STRING },
    count: { type: sq.INTEGER, defaultValue: 0 }
}, { freezeTableName: true })

export const Poll = s.define('poll', {
    prompt: { type: sq.STRING },
}, { freezeTableName: true })

Poll.hasMany(Answer)

// Seed
import crypto from 'crypto'
// sync:force clears out the database
const prompts = ["rule the world?", "make friends?", "win a tennis match?"]

const isProd = process.env === 'production'

Promise.all([User, Answer, Poll].map(x => x.sync())).then($ => {
    User.findAll().then(users => {
        if(users && users.length) return

        let hash = crypto.createHash('sha256')
        hash.update(process.env.admin_password || process.env.npm_package_config_test_admin_password)
        User.create({ email: process.env.admin_email || process.env.npm_package_config_test_admin_email, role: 'admin', hash: hash.digest('base64') })

        new Array(3).fill(1).map((x,i) =>
            Poll.create({
                prompt: `What is the best way to ${prompts[i]}`
            }).then(poll => {
                Answer.create({text: "See no evil 🙈", pollId: poll.id})
                Answer.create({text: "Speak no evil 🙊", pollId: poll.id})
                Answer.create({text: "Hear no evil 🙉", pollId: poll.id})
            }))
    })
})