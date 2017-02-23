module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('GOING UP')
    return queryInterface.bulkInsert('User', [
      { name: 'Fred' },
      { name: 'Alex' },
      { name: 'Chris' },
      { name: 'Joe' },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    console.log('GOING DOWN')
    return queryInterface.bulkDelete('Person', null, {})
  }
}
