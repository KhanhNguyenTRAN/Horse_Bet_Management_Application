const express = require("express")
require("dotenv").config() // Load environment variables
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

// Middleware to parse JSON
app.use(express.json())
app.use(routes)

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
