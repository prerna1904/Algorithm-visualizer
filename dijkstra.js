// dijkstra.js
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const queue = new PriorityQueue(); // Use a priority queue for efficient extraction of the minimum distance

    for (const vertex in graph) {
        distances[vertex] = Infinity; // Initialize all distances to infinity
    }
    distances[start] = 0; // Distance to the start vertex is 0

    queue.enqueue(start, 0); // Add the start vertex to the queue with a priority of 0

    while (!queue.isEmpty()) {
        const { vertex } = queue.dequeue();
        if (visited.has(vertex)) continue; // Skip if already visited
        visited.add(vertex);

        for (const neighbor in graph[vertex]) {
            const newDistance = distances[vertex] + graph[vertex][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance; // Update the shortest distance to neighbor
                queue.enqueue(neighbor, newDistance); // Add neighbor to the queue
            }
        }
    }
    return distances; // Return the shortest distances
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(vertex, priority) {
        this.items.push({ vertex, priority });
        this.items.sort((a, b) => a.priority - b.priority); // Sort by priority
    }

    dequeue() {
        return this.items.shift(); // Remove the item with the highest priority (lowest value)
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = dijkstra; // Export the function for use in the server
