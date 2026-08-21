import express from "express";


const app = express();

app.get("/",(req,res)=>{

    res.send("i send message to you")

})

const port = 200;

app.listen(port,(error)=>{

    if(error){
      return console.log(error)
    }

    console.log(`my server running on port ${port}`)

})