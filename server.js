const http = require('http')
const url = require('url')

const port = 5000;

const server = http.createServer((req, res) => {

    //we can also add header to the response
    res.setHeader('Content-Type', 'text/html')

    //we can extract query string from url
    const { query } = url.parse(req.url, true)
    res.end(`Server sending the response. User name: ${query.name}. User age ${query.age}`)
})

server.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})