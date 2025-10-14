const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Importar el enrutador de equipos
const teamsRouter = require('./routes/teams.routes');

// Middleware para entender JSON en las peticiones
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PokeDex API está lista!');
});

// Usar las rutas de equipos bajo el prefijo /teams !!!
app.use('/teams', teamsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});