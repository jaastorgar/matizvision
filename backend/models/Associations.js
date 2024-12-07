const User = require('./User');
const Appointment = require('./Appointment');

// Definir relaciones
User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Appointment };