const express = require("express");
const router = express.Router();

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Validar credenciales
  if (email === "admin@matizvision.com" && password === "admin123") {
    res.json({ token: "admin-token-example" });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

module.exports = router;