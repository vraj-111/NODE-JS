

import http from "http"


const server = http.createServer((req,res)=>{

    res.writeHead(200,{"content-type": "text/html"});
    res.end("<h1>It's My Server So don't</h1>")

});


const port = 215;


server.listen(port,(error)=>{

    if(error){
        return console.log(error.menages)
    }

    console.log(`Server running on port ${port}`)
})