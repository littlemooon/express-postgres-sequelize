export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message, {
          foreignKey: 'userId',
          as: 'messages',
        })
      },
    },
  })
  return User
}
