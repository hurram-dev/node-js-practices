import http, { IncomingMessage, ServerResponse } from 'node:http';
import { users } from './data/users';
import { parseRequestBody } from './utils/parseRequestBody';


const PORT = 8080;
const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}
const STATUSES = {
    CREATED: 201,
    OK: 200,
    NOT_FOUND: 404
}

const server = http.createServer(requestListener)

const USERS = [...users];

async function requestListener(req: IncomingMessage, res: ServerResponse) {
    const host = req.headers.host;

    const url = new URL(req.url || '', `http://${host}`);

    console.log(url, req.url)

    switch (url.pathname.split('api')[1]) {
        case '/': {
            res.writeHead(STATUSES.OK, { 'Content-Type': 'text/plain' })
            res.end('Main Page')
            break;
        }
        case '/users': {
            switch (req.method) {
                case METHODS.GET: {
                    res.writeHead(STATUSES.OK, { 'Content-Type': 'application/json' })

                    const response = {
                        data: USERS,
                        error: null
                    }
                    res.end(JSON.stringify(response))
                    break;
                }
                case METHODS.POST: {

                    try {


                        const reqBody = await parseRequestBody(req);
    
                        const newUser = {
                            id: USERS.length + 1,
                            ...reqBody as any
                        }
    
                        USERS.push(newUser)

                        res.writeHead(STATUSES.CREATED, { 'Content-Type': 'application/json' })

                        const response = {
                            data: newUser,
                            error: null
                        }

                        res.end(JSON.stringify(response))
                    } catch (e: any) {
                        res.writeHead(STATUSES.NOT_FOUND, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: e.message }))
                    }
                    break;
                }
                case METHODS.PATCH: {
                    try {
                        const reqBody = await parseRequestBody(req);
                        const userIndex = USERS.findIndex(u => u.id === Number((reqBody as any).id))

                        if (userIndex === -1) {
                            throw new Error('User not found')
                        }

                        USERS[userIndex] = {
                            ...USERS[userIndex],
                            ...reqBody as any
                        }

                        res.writeHead(STATUSES.OK, { 'Content-Type': 'application/json' })

                        const response = {
                            data: USERS[userIndex],
                            error: null
                        }

                        res.end(JSON.stringify(response))
                    } catch (e: any) {
                        res.writeHead(STATUSES.NOT_FOUND, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: e.message }))
                    }
                    break;
                }
                case METHODS.DELETE: {
                    try {
                        const reqBody = await parseRequestBody(req);
                        const userIndex = USERS.findIndex(u => u.id === Number((reqBody as any).id))

                        if (userIndex === -1) {
                            throw new Error('User not found')
                        }

                        const deletedUser = USERS.splice(userIndex, 1)

                        res.writeHead(STATUSES.OK, { 'Content-Type': 'application/json' })

                        const response = {
                            data: deletedUser[0],
                            error: null
                        }

                        res.end(JSON.stringify(response))
                    } catch (e: any) {
                        res.writeHead(STATUSES.NOT_FOUND, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify({ error: e.message }))
                    }
                    break;
                }
            }
            break;
        }
        default: {
            res.writeHead(STATUSES.NOT_FOUND, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
        }

    }
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
