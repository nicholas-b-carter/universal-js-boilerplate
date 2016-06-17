
import Sequelize from 'sequelize'

const isProd = process.env === 'production'
let s
if(isProd){
    s = new Sequelize(process.env.mysql_connection_string)

    s.authenticate()
        .then(err => console.log('Connection has been established successfully.'))
        .catch(err => console.log('Unable to connect to the database:', err))
} else {
    s = new Sequelize({
        dialect: 'sqlite',
        pool: { max: 5, min: 0, idle: 10000 },
        storage: './database.sqlite'
    })

    s.authenticate()
        .then(err => console.log('Connection has been established successfully.'))
        .catch(err => console.log('Unable to connect to the database:', err))
}

export default s