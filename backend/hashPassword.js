const bcrypt = require('bcrypt');

(async () => {
  const plainPassword = '$2b$10$/Js9uxkegmEQQhlFRO9bnesd5e7T6HdSeIO2lZKT/EGetXWeczjZK'; // Contraseña en texto plano
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log('Contraseña cifrada:', hashedPassword);
})();