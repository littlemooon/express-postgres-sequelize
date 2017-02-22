import chalk from 'chalk'

import models from '../models'

const log = (...args) => console.log(chalk.blue('MESSAGE --', ...args)) || true

export const create = (req, res, next) => models.Message
  .create({...req.body, ...req.params})
  .then(x => log('create') && x)
  .then(x => res.status(201).send(x))
  .then(() => next())
  .catch(e => res.headersSent || res.status(400).send(e))

export const list = (req, res, next) => models.Message
  .findAll()
  .then(x => log('find') && x)
  .then(x => res.status(200).send(x))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const retrieve = (req, res, next) => models.Message
  .findById(req.params.messageId)
  .then(x => log('find:', req.params.messageId) && x)
  .then(x => x ? res.status(200).send(x) : res.status(404).send({message: 'Message Not Found'}))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const update = (req, res, next) => models.Message
  .find({
    where: {
      id: req.params.messageId,
      userId: req.params.userId,
    },
  })
  .then(x => log('update:', req.params.messageId) && x)
  .then(x => !x ? res.status(404).send({message: 'Message Not Found'}) : x
    .update(req.body, { fields: Object.keys(req.body) })
    .then(x => res.status(200).send(x))
    .catch(e => res.status(400).send(e)))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const destroy = (req, res, next) => models.Message
  .find({
    where: {
      id: req.params.messageId,
      userId: req.params.userId,
    },
  })
  .then(x => log('destroy:', req.params.messageId) && x)
  .then(x => !x ? res.status(404).send({message: 'Message Not Found'}) : x
    .destroy()
    .then(() => res.status(200).send({message: 'Message deleted successfully'}))
    .catch(e => res.status(400).send(e)))
  .then(() => next())
  .catch(e => res.status(400).send(e))
