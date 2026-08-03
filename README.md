## What happens when the server restarts

I created two tasks, stopped the server, started it again and called "GET /tasks", and the two tasks were gone while the 3 example tasks were back. That happens because the tasks are in an array inside the running program, so the whole list disappears from memory when the program stops and is built again from scratch when it starts.

## AI vs me

The AI version is in ai-code/ folder and never touches my own code. It runs on port 3001, so both APIs can run at the same time

cd ai-code
npm start


### The prompt I used

Build a small REST API using  Node.js and Express that manages a to-do list. Keep the tasks in memory in a plain array, no database and no files. A task has three fields: id (a number), title (a string) and done (a boolean). Start the list with 3 example tasks.
The API needs these endpoints:
GET / returns the name and version of the API and the list of endpoints
GET /health returns { "status": "ok" }
GET /tasks returns all tasks, and supports ?done=true and ?search=word to filter the list
GET /tasks/:id returns one task, or 404 with { "error": "Task 99 not found" } if there is no task with that id
POST /tasks creates a task from { "title": "Buy milk" }, gives it the next free id, sets done to false, and returns the created task with status 201
PUT /tasks/:id changes the title and/or done of a task and returns the updated task
DELETE /tasks/:id removes a task and returns 204 with an empty body
GET /stats returns { "total": 7, "done": 3, "open": 4 }
POST /reset brings back the 3 example tasks
Validation rules: on POST the title must be there and must not be empty, and on PUT the body must contain at least one of title or done. A request that breaks a rule gets status 400 and a JSON error message. An id that does not exist gets 404. Every error response must be JSON in the shape { "error": "..." }.
Serve Swagger UI at /docs from an openapi.json file so every endpoint can be tried from the browser. Split the code into routes, services and repositories folders instead of putting everything in one file, and write it as clean production quality code.

### Did it run?

Yes, first try. I fired my Stage 4 checkpoint curls at it and they all passed: create returned 201 with the new task, update returned 200, delete returned 204 with an empty body, GET /tasks after that no longer had the task, POST /tasks with {} returned 400, and GET /tasks/99 and DELETE /tasks/99 both returned 404 with a JSON error.

### What the AI did better

**It answers with JSON even when something goes wrong that I never thought about.** If I send broken JSON like {"title": to my API, Express' built-in error page answers with HTML and a piece of the stack trace in it. The AI version has an error handling middleware at the end of the app that catches everything, checks what kind of error it is, and always answers { "error": "..." }. The same middleware turns an unknown path like /nope into a JSON 404 instead of the HTML "Cannot GET /nope" page my version returns.

**It separates "is this request valid" from "what should the server do".** My checks sit inside the route handlers, so my PUT handler is around 30 lines of ifs before it does any work. In the AI version the checks are small middleware functions listed in the route, like router.put("/:id", validateTaskId, validateUpdateTask, taskController.updateTask), and the handler underneath is 3 lines. I can read the whole route file and see the rules without reading any logic.

**The service throws instead of returning nothing.** My service returns undefined when a task is missing and every route has to remember to check for it. The AI service throws an ApiError that carries the status code with it (ApiError.notFound("Task 99 not found")), and the error middleware turns it into the response. The 404 message is written once instead of four times.

### What it got wrong or decided on its own

**It changed the response of GET /**. I asked for the endpoint list and it returned `["/tasks", "/stats", "/reset", "/health", "/docs"]`, while the assignment asks for exactly `["/tasks"]`. It is more useful, but it is not what the spec said, and I only noticed because I knew what the spec said.

**It answers 400 where I answer 404.** `GET /tasks/abc` returns `{"error":"'abc' is not a valid task id"}` with status 400 in the AI version, and `{"error":"Task abc not found"}` with 404 in mine. Its answer is the better one, because "abc" is a broken request and not a missing task, but I never asked for that behaviour anywhere in my prompt.

**It invented a rule for query parameters.** `GET /tasks?done=banana` returns 400 in the AI version. My version treats anything that is not the text "true" as false and answers 200 with the unfinished tasks. Again, nothing in my prompt says what should happen there.

**It restructured the whole project.** I asked for routes, services and repositories, and it also added controllers, middleware, errors, config, an app.js that builds the app and a server.js that starts it. The layers I asked for are there, but the folder list is twice as long as the one I gave it.

### What my prompt forgot to specify

- **The port.** I never said 3000, so it picked 3001 (which was lucky, it means both can run at the same time).
- **What "invalid" means.** I said the title must not be empty, but I never said whether `"   "` counts as empty, or whether `{"title": 123}` should be rejected. It decided both on its own, and it happened to decide the same way I did.
- **The shape of the id.** I never said the id in the URL has to be a number, which is why it added a rule I did not have.
- **Whether PUT replaces the task or only the fields I send.** PUT usually means "replace the whole thing", but both versions ended up only changing the fields in the body, which is really PATCH behaviour. Neither of us said it out loud.
- **How errors should be worded.** My errors say "Title is required", its errors say "Field 'title' is required and must not be empty". Both are fine, but if a frontend depended on the text it would break.

### The rematch

I added the missing parts to the prompt: run on port 3000, `GET /` must return exactly `["/tasks"]`, a non numeric id is a 400 and not a 404, `?done=` only accepts true or false, and PUT only changes the fields that are sent. The second version stopped inventing the endpoint list and matched my status codes, which means the differences the first time were not the AI being clever or careless, they were just the parts of the spec I never wrote down.
