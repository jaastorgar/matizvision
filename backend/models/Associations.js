const sequelize = require('../config/database');
const User = require('./User')(sequelize);
const Appointment = require('./Appointment')(sequelize);

// Definir asociaciones
User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Appointment,
};