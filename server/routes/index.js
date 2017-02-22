import controllers from '../controllers'

export default router => {
  router.get('/api/user', controllers.user.list)
  router.get('/api/user/:userId', controllers.user.retrieve)
  router.post('/api/user', controllers.user.create)
  router.put('/api/user/:userId', controllers.user.update)
  router.delete('/api/user/:userId', controllers.user.destroy)

  router.post('/api/user/:userId/message', controllers.message.create)

  router.get('/api/message', controllers.message.list)
  router.get('/api/message/:messageId', controllers.message.retrieve)

  router.post('/api/user/:userId/message', controllers.message.create)
  router.put('/api/user/:userId/message/:messageId', controllers.message.update)
  router.delete('/api/user/:userId/message/:messageId', controllers.message.destroy)
  router.all('/api/user/:userId/message', (req, res, next) => {
    res.status(405).send('Method Not Allowed')
    next()
  })

  router.get('*', (req, res, next) => {
    if (!res.headersSent) res.status(200).send('Welcome to the beginning of nothingness')
    next()
  })

  return router
}
