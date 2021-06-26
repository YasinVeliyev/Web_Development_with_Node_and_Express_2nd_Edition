const http = require('http')
const fs  = require('fs')

function serveStaticFile(res,path,contentType, responseCode=200){
    fs.readFile(__dirname+path, (err, data)=>{
        if(err){
            res.writeHead(500,{"Content-Type":"text/plain"})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {"Content-Type":contentType})
        res.end(data)
    })
}

const server = http.createServer((req, res)=>{
    console.log(req.url)
    switch(req.url){
        case "/":
            res.writeHead(200, {'Content-Type':'text/plain'})
            res.end('Hello World')
            break
        case "/home":
            serveStaticFile(res,"/public/home.html","text/html" )
            break
        case "/about":
            serveStaticFile(res,"/public/about.html","text/html" )
            break
        default:
            serveStaticFile(res,"/public/404.html","text/html" )
            break
    }
})

server.listen(3000, () => {
    console.log(`server started on port 3000; ` +
'press Ctrl-C to terminate....')
})