import models from '../models'

export const create = (req, res) => models.User
  .create(req.body)
  .then(x => res.status(201).send(x))
  .catch(e => res.status(400).send(e))

export const list = (req, res) => models.User
  .findAll({
    include: [{
      model: models.Message,
      as: 'messages',
    }],
  })
  .then(x => res.status(200).send(x))
  .catch(e => res.status(400).send(e))

export const retrieve = (req, res) => models.User
  .findById(req.params.userId, {
    include: [{
      model: models.Message,
      as: 'messages',
    }],
  })
  .then(x => x ? res.status(200).send(x) : res.status(404).send({message: 'User Not Found'}))
  .catch(e => res.status(400).send(e))

export const update = (req, res) => models.User
  .findById(req.params.userId, {
    include: [{
      model: models.Message,
      as: 'messages',
    }],
  })
  .then(x => !x ? res.status(404).send({message: 'User Not Found'}) : x
    .update(req.body, { fields: Object.keys(req.body) })
    .then(x => res.status(200).send(x))
    .catch(e => res.status(400).send(e)))
  .catch(e => res.status(400).send(e))

export const destroy = (req, res) => models.User
  .findById(req.params.userId)
  .then(x => !x ? res.status(400).send({message: 'User Not Found'}) : x
    .destroy()
    .then(() => res.status(200).send({message: 'User deleted successfully'}))
    .catch(e => res.status(400).send(e)))
  .catch(e => res.status(400).send(e))
