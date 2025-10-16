PokeDex API
Esta API fue creada para gestionar equipos de Pokémon, permitiendo a los usuarios crear, leer, actualizar y eliminar sus propios equipos. La información de cada equipo se enriquece consumiendo datos en tiempo real desde la PokeAPI externa.

El proyecto implementa validación de datos, manejo de errores, caché para optimizar las consultas externas y medidas básicas de seguridad.

Características
CRUD completo para la gestión de equipos Pokémon.

Integración con PokeAPI para enriquecer los datos de los equipos con tipos, sprites y estadísticas.

Caché en memoria para reducir la latencia y el número de llamadas a la API externa.

Validación de esquemas para asegurar la integridad de los datos de entrada.

Seguridad básica con helmet y limitador de peticiones (rate-limit).

Persistencia de datos mediante una base de datos SQLite.
´
------------------- PARA EMPEZAR -------------------

Sigue estas instrucciones para obtener una copia del proyecto y ejecutarlo en tu máquina local para desarrollo y pruebas.

Prerrequisitos
Necesitarás tener instalado Node.js (versión 22.x o superior) en tu sistema.

** INSTALACIÓN
	1.- Clona el repositorio -> git clone https://github.com/Cielz04/PokeAPI.git
	2.-Navega al directorio del proyecto -> npm install
	3.- Instala las dependencias -> npm install

** EJECUCIÓN

Para iniciar el servidor en modo de desarrollo (cuenta con reinicio automatico gracias a nodemon), ejecuta el siguiente comando:
	npm run dev
El servidor estará disponible en http://localhost:3000.


------------------- ENDPOINTS DE LA API -------------------
La URL base para todos los endpoints es /teams.

1. Crear un nuevo equipo
POST /teams

Crea un nuevo equipo de Pokémon. El equipo debe tener un nombre y una lista de 1 a 6 miembros.

Cuerpo de la Petición (Request Body):
{
  "name": "Equipo Aventura",
  "members": [
    { "name": "pikachu" },
    { "name": "bulbasaur" },
    { "name": "squirtle" }
  ]
}

Respuesta Exitosa (201 Created):
{
  "id": 1,
  "name": "Equipo Aventura",
  "members": [
    { "name": "pikachu" },
    { "name": "bulbasaur" },
    { "name": "squirtle" }
  ]
}

Respuestas de Error:

	400 Bad Request: Si el cuerpo de la petición no cumple con el esquema (ej. nombre vacío, más de 6 	miembros, miembros duplicados).

2. Obtener todos los equipos
GET /teams

Devuelve una lista con todos los equipos almacenados en la base de datos.

Respuesta Exitosa (200 OK):
[
  {
    "id": 1,
    "name": "Equipo Aventura",
    "members": [
      { "name": "pikachu" },
      { "name": "bulbasaur" },
      { "name": "squirtle" }
    ]
  }
]

3. Obtener un equipo por su ID
GET /teams/:id

Obtiene los detalles de un equipo específico, enriqueciendo los datos de cada miembro con información de la PokeAPI.

Parámetros de Ruta:

id (number): El ID del equipo.

Respuesta Exitosa (200 OK):

{
  "id": 1,
  "name": "Equipo Aventura",
  "members": [
    {
      "name": "pikachu",
      "types": ["electric"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "stats": [
        { "name": "hp", "base_stat": 35 },
        { "name": "attack", "base_stat": 55 }
      ]
    }
  ]
}

Respuestas de Error:

	400 Bad Request: Si el :id no es un número.

	404 Not Found: Si no se encuentra un equipo con el :id proporcionado.

	502 Bad Gateway: Si ocurre un error al comunicarse con la PokeAPI externa.


4. Actualizar un equipo
PUT /teams/:id

Actualiza el nombre y/o los miembros de un equipo existente.

Parámetros de Ruta:

id (number): El ID del equipo a actualizar.

Cuerpo de la Petición (Request Body):


{
  "name": "Equipo Aventura Definitivo",
  "members": [
    { "name": "raichu" },
    { "name": "ivysaur" }
  ]
}

Respuesta Exitosa (200 OK):

{
  "id": 1,
  "name": "Equipo Aventura Definitivo",
  "members": [
    { "name": "raichu" },
    { "name": "ivysaur" }
  ]
}

Respuestas de Error:

	400 Bad Request: Si el :id no es un número o el body es inválido.

	404 Not Found: Si no se encuentra un equipo con el :id proporcionado.

5. Borrar un equipo
DELETE /teams/:id

	Elimina un equipo de la base de datos.

Parámetros de Ruta:

id (number): El ID del equipo a eliminar.

Respuesta Exitosa:

	204 No Content: El servidor procesó la solicitud con éxito y no devuelve contenido.

Respuestas de Error:

	400 Bad Request: Si el :id no es un número.

	404 Not Found: Si no se encuentra un equipo con el :id proporcionado.


------------------- TESTS -------------------

Actualmente, el proyecto tiene una configuración de prueba placeholder. Para ejecutarla, usa el siguiente comando:

-> npm test

------------------- Supuestos y Decisiones de Diseño -------------------

	Seguridad: Se utiliza helmet para establecer cabeceras HTTP seguras por defecto.

	Limitación de Tasa (Rate Limiting): Para prevenir abusos, la API está limitada a un máximo de 50 	peticiones cada 2 minutos por dirección IP.

	Validación: Se utiliza ajv para validar que los datos enviados en las peticiones POST y PUT se adhieran al 	esquema definido, rechazando peticiones con datos inválidos antes de que lleguen a la lógica de negocio.

	Persistencia: La base de datos es un archivo pokedex.db que se creará en la carpeta db la primera vez que 	se inicie la aplicación.

	Estructura de Miembros: Se espera que la lista members en el body sea un array de objetos, donde cada 	objeto tiene una propiedad name (ej. [{ "name": "pikachu" }]).





