const pokemonSchema = require('./pokemonSchema');
const teamSchema = {
    type:'object',
    properties:{
        name:{type:'string',minLength:2},
        members:{
            type:'array',
            minItems:1,
            maxItems:6,
            uniqueItems:true,
            items:pokemonSchema
        }
    },
    required:['name','members'],
    additionalProperties:false
}

module.exports=teamSchema;