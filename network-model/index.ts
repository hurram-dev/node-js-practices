import http, { Server } from 'node:http'
import fs from 'node:fs'

const PORT = 8080;
const htmlContent = fs.readFileSync('./client-server.html', 'utf-8')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlContent)
})

const getRequest = http.request({
    method: 'GET',
    hostname: 'www.google.com',
    path: '/'
}, (res) => {
    console.log(`Status Code: ${res.statusCode}`)

    res.on('data', (chunk) => {
        console.log(`Received data: ${chunk}`)
    })

    res.on('end', () => {
        console.log('Request ')
    })
})

getRequest.on('error', (err) => {
    console.error(`Error: ${err.message}`)
})

getRequest.end()

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})