import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'

import initRoutes from './routes'

const app = express()

const bodyLogger = where => (req, res, next) => {
  console.log(`${where} -- BODY`, req.body)
  next()
}

app.use(bodyLogger('before'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyLogger('after'))

initRoutes(app)

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}))

export default app
