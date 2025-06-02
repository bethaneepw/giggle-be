const {client} = require("../connection")

const db = client.db("giggle")

const seed = () => {
        return db.collection("users").drop()
    .then(()=>{
        return db.collection("chat").drop()
    })
    .then(()=>{
        return db.collection("tickets").drop()
    })
    .then(()=>{
        return db.collection("events").drop()
    })
    .then(()=> {
        return db.createCollection("users")
    })  
   .then(()=>{
        return db.createCollection("chat")
   })
    .then(()=>{
        return db.createCollection("tickets")
   })
   .then(()=>{
        return db.createCollection("event")
    })
   .then((res)=>{
       
   })
   .then((res)=>{
        
   })
   .catch((err)=>{
        console.log(err)
   })
   .finally(()=>{
        client.close();
   })
}



seed()