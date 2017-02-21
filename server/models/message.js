module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: models => {
        Message.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        })
      },
    },
  })
  return Message
}
