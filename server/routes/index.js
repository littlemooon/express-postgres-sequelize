import controllers from '../controllers'

export default app => {
  app.get('/api/user', controllers.user.list)
  app.get('/api/user/:userId', controllers.user.retrieve)
  app.post('/api/user', controllers.user.create)
  app.put('/api/user/:userId', controllers.user.update)
  app.delete('/api/user/:userId', controllers.user.destroy)

  app.post('/api/user/:userId/message', controllers.message.create)

  app.get('/api/message', controllers.message.list)
  app.get('/api/message/:messageId', controllers.message.retrieve)

  app.post('/api/user/:userId/message', controllers.message.create)
  app.put('/api/user/:userId/message/:messageId', controllers.message.update)
  app.delete('/api/user/:userId/message/:messageId', controllers.message.destroy)
  app.all('/api/user/:userId/message', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }))
}
