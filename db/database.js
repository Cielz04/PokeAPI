const Database = require('better-sqlite3');

// Se conectará a un archivo llamado pokedex.db en la misma carpeta (db).
// Si el archivo no existe, se creará automáticamente.
const db = new Database('db/pokedex.db', { verbose: console.log });

function setupDatabase() {
  // Define la estructura de la tabla 'teams'.
  // IF NOT EXISTS asegura que la tabla solo se cree si no existe previamente.
  const createTableStmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      members TEXT NOT NULL
    )
  `);
  
  createTableStmt.run();
  console.log('LA tabla "teams" está lista.');
}

// Llama a la función para asegurar que la tabla exista al iniciar la app.
setupDatabase();

// Exporta la instancia de la base de datos para usarla en otros archivos.
module.exports = db;