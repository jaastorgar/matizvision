const { User, Appointment } = require('./models');

(async () => {
  try {
    // Obtener un usuario con sus citas
    const user = await User.findOne({
      where: { id: 1 },
      include: [{ model: Appointment }],
    });
    console.log('Citas del usuario:', JSON.stringify(user.Appointments, null, 2));
  } catch (error) {
    console.error('Error al probar las relaciones:', error);
  }
})();