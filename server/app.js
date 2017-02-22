import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import chalk from 'chalk'

import initRoutes from './routes'

const app = express()

const testLogger = (where, color = 'blue') => (req, res, next) => {
  console.log(chalk[color](`${where} -- req.body   -- `, JSON.stringify(req.body)))
  console.log(chalk[color](`${where} -- res.status -- `, res.statusCode))
  next()
}

app.use(testLogger('BEFORE ', 'red'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(testLogger('DURING ', 'yellow'))
app.use(initRoutes(express.Router()))

app.use(testLogger('AFTER  ', 'cyan'))

export default app
