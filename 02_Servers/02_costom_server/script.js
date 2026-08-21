

import http from "http"


const server = http.createServer((req,res)=>{

    res.writeHead(200,{"content-type":"text/html"})

    res.end("<p>start my server</p>")

})



const port = 3000;

server.listen(port,(err)=>{

    if(err){

        return console.log(err)
    }

    console.log(`my server on in the port ${port}`)

})