What happens when the server restarts

I created two tasks, stopped the server, started it again and called "GET /tasks", and the two tasks were gone while the 3 example tasks were back. That happens because the tasks are in an array inside the running program, so the whole list disappears from memory when the program stops and is built again from scratch when it starts.
