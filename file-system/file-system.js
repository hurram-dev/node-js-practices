import http from 'node:http'
import fs from 'node:fs'

const server = http.createServer((req, res) => {

    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, {
            'content-type': 'text/html'
        })

        res.write(data)
        res.end()

    })


})

server.listen(3000, () => {
    console.log('Server running')
})