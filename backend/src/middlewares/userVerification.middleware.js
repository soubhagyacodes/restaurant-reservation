import express from "express";

// ONLY FOR PROTECTED ROUTES
function ownerVerfication(request, response, next){
    if(request.user.role != "OWNER"){
        return response.status(400).send({"msg": "You're Unauthorized. You're not an owner."})
    }
    return next()
}

function customerVerification(request, response, next){
    // console.log("passed here")
    if(request.user.role != "CUSTOMER"){
        return response.status(400).send({"msg": "You're Unauthorized. You're not a customer."})
    }
    return next()
}

export  { ownerVerfication, customerVerification}