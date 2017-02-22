import chalk from 'chalk'

import models from '../models'

const log = (...args) => console.log(chalk.blue('USER    --', ...args)) || true

export const create = (req, res, next) => models.User
  .create(req.body)
  .then(x => log('create') && x)
  .then(x => res.status(201).send(x))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const list = (req, res, next) => models.User
  .findAll({
    include: [{
      model: models.Message,
      as: 'messages',
    }],
  })
  .then(x => log('find') && x)
  .then(x => res.status(200).send(x))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const retrieve = (req, res, next) => models.User
  .findById(req.params.userId, {
    include: [{
      model: models.Message,
      as: 'messages',
    }],
  })
  .then(x => log('find:', req.params.userId) && x)
  .then(x => x ? res.status(200).send(x) : res.status(404).send({message: 'User Not Found'}))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const update = (req, res, next) => models.User
  .findById(req.params.userId, {
    include: [{
      model: models.Message,
      as: 'messages',
    }],
  })
  .then(x => log('update:', req.params.userId) && x)
  .then(x => !x ? res.status(404).send({message: 'User Not Found'}) : x
    .update(req.body, { fields: Object.keys(req.body) })
    .then(x => res.status(200).send(x))
    .catch(e => res.status(400).send(e)))
  .then(() => next())
  .catch(e => res.status(400).send(e))

export const destroy = (req, res, next) => models.User
  .findById(req.params.userId)
  .then(x => log('delete:', req.params.userId) && x)
  .then(x => !x ? res.status(400).send({message: 'User Not Found'}) : x
    .destroy()
    .then(() => res.status(200).send({message: 'User deleted successfully'}))
    .catch(e => res.status(400).send(e)))
  .then(() => next())
  .catch(e => res.status(400).send(e))
