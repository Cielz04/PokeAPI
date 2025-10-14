const db = require('../db/database');

// Función para crear un nuevo equipo
exports.createTeam = (req, res) => {
    const { name, members } = req.body;
    const stmt = db.prepare('INSERT INTO teams (name, members) VALUES (?, ?)');
    const info = stmt.run(name, JSON.stringify(members));

    res.status(201).json({ id: info.lastInsertRowid, name, members });
};

// función para obtener todos los equipos
exports.getAllTeams = (req, res) => {
  const stmt = db.prepare('SELECT * FROM teams');
  const teams = stmt.all();

  // Convertimos la cadena JSON de 'members' de nuevo a un array para cada equipo.
  teams.forEach(team => {
    team.members = JSON.parse(team.members);
  });

  res.status(200).json(teams);
};

// función para obtener un equipo por ID
exports.getTeamById = (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('SELECT * FROM teams WHERE id = ?');
  const team = stmt.get(id);

  if (!team) {
    return res.status(404).json({ message: `Team with id ${id} not found.` });
  }

  team.members = JSON.parse(team.members);
  res.status(200).json(team);
};

// función para actualizar un equipo
exports.updateTeam = (req, res) => {
  const { id } = req.params;
  const { name, members } = req.body;

  const stmt = db.prepare('UPDATE teams SET name = ?, members = ? WHERE id = ?');
  const info = stmt.run(name, JSON.stringify(members), id);

  if (info.changes === 0) {
    return res.status(404).json({ message: `Team with id ${id} not found.` });
  }

  res.status(200).json({ id, name, members });
};

// función para borrar un equipo
exports.deleteTeam = (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM teams WHERE id = ?');
  const info = stmt.run(id);

  if (info.changes === 0) {
    return res.status(404).json({ message: `Team with id ${id} not found.` });
  }

  res.status(204).send(); // 204 No Content para borrados exitosos.
};