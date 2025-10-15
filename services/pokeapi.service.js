const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 90 });

/**
 * Obtiene los detalles de un Pokémon desde la API o el caché.
 * @param {string | number} nameOrId El nombre o ID del Pokémon.
 * @returns {Promise<object>} Un objeto con los detalles enriquecidos del Pokémon.
 */
async function getPokemonDetails(nameOrId) {
  const cacheKey = `pokemon_${nameOrId}`;
  
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache HIT for: ${nameOrId}`);
    return cachedData;
  }

  console.log(`Cache MISS for: ${nameOrId}. Fetching from API...`);
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const pokemonApiData = response.data;

    const pokemonDetails = {
      name: pokemonApiData.name,
      types: pokemonApiData.types.map(t => t.type.name),
      sprite: pokemonApiData.sprites.front_default,
      stats: pokemonApiData.stats.map(s => ({
        name: s.stat.name,
        base_stat: s.base_stat
      }))
    };
    
    cache.set(cacheKey, pokemonDetails);
    
    return pokemonDetails;
  } catch (error) {
    // Si la PokeAPI devuelve un 404 (no encontrado) o cualquier otro error.
    console.error(`Error fetching Pokémon ${nameOrId}:`, error.message);
    // Lanzamos el error para que el controlador lo maneje.
    throw new Error(`Could not retrieve details for Pokémon: ${nameOrId}`);
  }
}

module.exports = { getPokemonDetails };