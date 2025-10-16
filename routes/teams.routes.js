const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams.controller');
const validateSchema = require('../middlewares/validateSchema');
const validateParams = require('../middlewares/validateParams');
const teamSchema = require('../schemas/teamSchema');

//Rutas para el recurso 'teams'

// POST /teams -> Crear un nuevo equipo
router.post('/', validateSchema(teamSchema), teamsController.createTeam);

// GET /teams -> Obtener todos los equipos
router.get('/', teamsController.getAllTeams);

// GET /teams/:id -> Obtener un equipo por su ID
router.get('/:id',validateParams, teamsController.getTeamById);

// PUT /teams/:id -> Actualizar un equipo por su ID
router.put('/:id',validateParams,validateSchema(teamSchema), teamsController.updateTeam);

// DELETE /teams/:id -> Borrar un equipo por su ID
router.delete('/:id', validateParams,teamsController.deleteTeam);

module.exports = router;