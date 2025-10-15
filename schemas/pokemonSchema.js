const pokemonSchema={
    type:'object',
    properties:{
        name:{type:'string',minLength:3}
    },
    required:['name'],
    additionalProperties:false
}

module.exports=pokemonSchema;