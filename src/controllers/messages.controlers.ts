import { Request, Response } from "express";
import { AnyArray } from "mongoose";
const { selectMessagebyRoomId } =require ("../models/messages.models")
const { messageSchema } = require("../../db/schema/messageSchema.js")

const { mongoose } = require("mongoose");

const message = mongoose.model("messages", messageSchema)

exports.postMessagebyId = (req:Request, res:Response, next:any): Promise<void> =>{
    const {roomId} = req.params;
    return selectChatbyId(roomId)
    .then((message) => {
        res.status(201).send({message});
        
    })
    .catch(next);
}
exports.getMessagebyRoomId = (req:Request, res:Response, next:any): Promise<void> =>{
const {roomId}  = req.params;
return selectMessagebyRoomId(roomId)
.then((message) => {
    res.status(200).send({message});
})
.catch(next)
}
exports.deleteMessagebyId = (req:Request, res:Response, next:any): Promise<void> =>{
const {message_id} = req.params;
return deleteMessagebyId(message_id)
.then((message) => {
    res.status(204).send({message})
})
.catch(next)
}
exports.patchMessagebyId = (req:Request, res:Response, next:any): Promise<void> =>{
const {message_id} = req.params;
return patchMessagebyId (message_id)
.then((message) => {
    res.status(204).send({message})
})
.catch(next)
}