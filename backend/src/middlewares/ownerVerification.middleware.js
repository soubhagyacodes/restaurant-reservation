import express from "express";

// ONLY FOR PROTECTED ROUTES
function ownerVerfication(request, response, next){
    if(request.user.role != "OWNER"){
        return response.status(400).send({"msg": "You're Unauthorized. You're not an owner."})
    }
    return next()
}

export default ownerVerfication