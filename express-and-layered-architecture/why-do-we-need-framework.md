## Why do we need a framework?

Writing a server by hand gets complicated fast. Every project ends up solving the same problems: parsing incoming request bodies, extracting URL parameters, routing requests to the right handler, and sending properly formatted responses. A framework solves these problems once and gives you a consistent, well-tested foundation to build on.

In the previous module you already built an HTTP server using Node.js's built-in http module. You ran into these problems on every endpoint you added:

Routing is manual. You check req.method and req.url by hand, and extract path parameters with a regex.
Body parsing is manual. Node.js delivers the request body as a raw data stream. You have to buffer chunks yourself before you can read it.
As the application grows, these problems compound — every new endpoint, every new feature, means repeating the same boilerplate.

Now look at the same server written with Express — a minimal Node.js web framework:

`
import express from 'express';
import * as userService from './user.service'; // application logic — not the focus here



const app = express();

// Parses JSON request bodies automatically — no manual stream buffering needed
app.use(express.json());

app.get('/users/:id', (req, res) => {
    // :id is extracted automatically into req.params — no regex needed
    const user = userService.getUserById(req.params.id) || {};
    res.json(user);
});

app.post('/users', (req, res) => {
    // req.body is already parsed — no manual buffering
    const user = userService.createUser(req.body);
    res.json(user);
});

app.listen(3000, () => {
    console.log('Server is started');
});

`

Express handles the boilerplate that you would otherwise rewrite on every route:

Routing — route definitions are declarative (app.get, app.post) and path parameters are extracted automatically into req.params
Body parsing — express.json() replaces the entire manual stream-buffering pattern
Response helpers — res.json() sets the correct Content-Type header and serializes the response in one call
The result is code that is shorter, more readable, and easier to extend. When you need to add logging or authentication, you add it once, not inside every individual handler. That is the core value of a framework.

## Which frameworks to choose?
The Node.js ecosystem has many web frameworks, each designed with different priorities. Choosing the right one depends on your project size, team experience, and requirements. Here is an overview of the most commonly used options and what they are each best suited for:

| Framework | Best for

| Express	| General-purpose REST APIs where you want full control over architecture and conventions
| Nest.js	| Large, team-scale applications that benefit from enforced structure, dependency injection, and TypeScript conventions out of the box
| Fastify	| High-throughput microservices and APIs where raw performance and low overhead are the primary concern
| Koa	    | Lean servers with a modern async/await-first API and a smaller core than Express
| Sails.js	| MVC applications that need real-time WebSocket features built in
| Loopback	| Data-driven APIs where auto-generated CRUD from data models accelerates development
Express remains the most widely used Node.js framework by a significant margin — it has the largest community, the most ecosystem packages, and is running in production across a huge number of projects, including many at EPAM. Nest.js has been growing rapidly and is now the standard for large new applications, but it uses Express under the hood by default.

Cons of using a framework
No framework is free. Before reaching for one, it is worth understanding the trade-offs:

Dependency risk — your application inherits any bugs, security issues, or breaking changes the framework introduces. Major version upgrades can require significant migration effort.
Learning curve — some frameworks, especially Nest.js, have a steep learning curve. Teams unfamiliar with the framework's patterns can struggle before becoming productive.
Abstraction overhead — frameworks sit between your code and the raw HTTP layer. This can make debugging harder and, in performance-sensitive cases, adds measurable overhead.
Opinionated constraints — opinionated frameworks enforce structural decisions. This is a benefit for consistency but can feel limiting when your requirements diverge from the framework's assumptions.
Overkill for simple use cases — for Lambda functions, scripts, or small utilities with no real routing, a framework adds weight with no return.
How to choose
┌─ No HTTP endpoints needed? ──────────────────► No framework (built-in http module)
│
├─ Raw throughput is the primary constraint? ──► Fastify
│
├─ Large application, multiple teams, ─────────► Nest.js
│  or enterprise requirements?
│
├─ Want Express-level control but with ────────► Koa
│  an async/await-first, leaner core?
│
└─ Default ────────────────────────────────────► Express

Why this course uses Express
Since Nest.js is now the standard for larger applications, you might ask why this module focuses on Express instead. There are two reasons:

Nest.js is built on Express. Its request/response cycle, middleware pipeline, and error handling all run through Express by default. Understanding Express makes Nest.js far less opaque — you can reason about what is happening beneath the abstractions, rather than just following conventions you cannot explain.
Express teaches the fundamentals directly. Because Express is minimal and explicit, it requires you to understand routing, middleware, body parsing, and error handling yourself. These are concepts every Node.js developer needs, regardless of which framework they end up using in production.