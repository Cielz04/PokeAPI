const db = require('../db/database');
const { getPokemonDetails } = require('../services/pokeapi.service');

exports.createTeam = (req, res) => {
  const { name, members } = req.body;
  const stmt = db.prepare('INSERT INTO teams (name, members) VALUES (?, ?)');
  const info = stmt.run(name, JSON.stringify(members));
  res.status(201).json({ id: info.lastInsertRowid, name, members });
};

exports.getAllTeams = (req, res) => {
  const stmt = db.prepare('SELECT * FROM teams');
  const teams = stmt.all();
  teams.forEach(team => {
    team.members = JSON.parse(team.members);
  });
  res.status(200).json(teams);
};

exports.getTeamById = async (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('SELECT * FROM teams WHERE id = ?');
  const team = stmt.get(id);

  if (!team) {
    return res.status(404).json({ message: `Team with id ${id} not found.` });
  }

  const members = JSON.parse(team.members);

  try {

    const enrichedMembers = await Promise.all(
      members.map(member => getPokemonDetails(member.name))
    );
    const enrichedTeam = {
      id: team.id,
      name: team.name,
      members: enrichedMembers
    };

    res.status(200).json(enrichedTeam);
  } catch (error) {
    // [cite_start]
    res.status(502).json({ 
      message: 'Error fetching data from external PokeAPI.',
      details: error.message
    });
  }
};
exports.updateTeam = (req, res) => {
    const { id } = req.params;
    const { name, members } = req.body;
    const stmt = db.prepare('UPDATE teams SET name = ?, members = ? WHERE id = ?');
    const info = stmt.run(name, JSON.stringify(members), id);

    if (info.changes === 0) {
        return res.status(404).json({ message: `Team with id ${id} not found.` });
    }
    res.status(200).json({ id: Number(id), name, members });
};

exports.deleteTeam = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM teams WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes === 0) {
        return res.status(404).json({ message: `Team with id ${id} not found.` });
    }
    res.status(204).send();
};