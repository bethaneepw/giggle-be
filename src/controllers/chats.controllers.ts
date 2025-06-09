import { Request, Response } from "express";


const chats = require("../../db/data/test/chats");

exports.getChatbyId = (req:Request, res:Response, next:any): Promise<void> =>{
        const {chats_id} = req.params;
        return selectChatbyId(chats_id)
        .then((chat) => {
            res.status(200).send({chat});
            
        })
        .catch(next)
}
