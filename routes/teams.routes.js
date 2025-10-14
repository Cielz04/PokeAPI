const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams.controller');

//Rutas para el recurso 'teams'

// POST /teams -> Crear un nuevo equipo
router.post('/', teamsController.createTeam);

// GET /teams -> Obtener todos los equipos
router.get('/', teamsController.getAllTeams);

// GET /teams/:id -> Obtener un equipo por su ID
router.get('/:id', teamsController.getTeamById);

// PUT /teams/:id -> Actualizar un equipo por su ID
router.put('/:id', teamsController.updateTeam);

// DELETE /teams/:id -> Borrar un equipo por su ID
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;