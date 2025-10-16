
function validateParams(req,res,next){
    const {id} = req.params;
    if(isNaN(id)){
        return next({status:400, message:'Invalid ID parameter. ID must be a number'})
    }

    next();
}

module.exports = validateParams;