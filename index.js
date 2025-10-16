const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const rateLimit = require('express-rate-limit');

//Importar el enrutador de equipos
const teamsRouter = require('./routes/teams.routes');
const handleError = require('./middlewares/errorHandler');
const helmet  = require('helmet');
// Middleware para entender JSON en las peticiones
//max 50 peticiones cada 2 minutos
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
  message: 'Hold on! Way too much requests, please try again later',
});

app.use(express.json());

app.use(helmet());

app.get('/', (req, res) => {
  res.send('PokeDex API ready!');
});

// Usar las rutas de equipos bajo el prefijo /teams !!!
app.use('/teams', teamsRouter);
app.use(limiter);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});