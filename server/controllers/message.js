import models from '../models'

export const create = (req, res) => models.Message
  .create({...req.body, ...req.params})
  .then(x => res.status(201).send(x))
  .catch(e => res.status(400).send(e))

export const list = (req, res) => models.Message
  .findAll()
  .then(x => res.status(200).send(x))
  .catch(e => res.status(400).send(e))

export const retrieve = (req, res) => models.Message
  .findById(req.params.messageId)
  .then(x => x ? res.status(200).send(x) : res.status(404).send({message: 'Message Not Found'}))
  .catch(e => res.status(400).send(e))

export const update = (req, res) => models.Message
  .find({
    where: {
      id: req.params.messageId,
      userId: req.params.userId,
    },
  })
  .then(x => !x ? res.status(404).send({message: 'Message Not Found'}) : x
    .update(req.body, { fields: Object.keys(req.body) })
    .then(x => res.status(200).send(x))
    .catch(e => res.status(400).send(e)))
  .catch(e => res.status(400).send(e))

export const destroy = (req, res) => models.Message
  .find({
    where: {
      id: req.params.messageId,
      userId: req.params.userId,
    },
  })
  .then(x => !x ? res.status(404).send({message: 'Message Not Found'}) : x
    .destroy()
    .then(() => res.status(200).send({message: 'Message deleted successfully'}))
    .catch(e => res.status(400).send(e)))
  .catch(e => res.status(400).send(e))
