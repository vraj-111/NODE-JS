
import http from "http"

const server = http.createServer((req,res)=>{

    if(req.url === "/home"){

        return res.end("This is Home page")
    }

    else if(req.url === "/about"){

        return res.end("This is about page")
    }

    else if(req.url === "/service"){

        return res.end("This is service page");
    }

    else{

        res.writeHead(404);
        res.end("page doesn't found")
    }

})


const port =400;


server.listen(port,(err)=>{

    if(err){

        console.log(err)
    }
    
    console.log(`server is running in port ${port}`)

})

