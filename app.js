'use strict'
// Loads env vars from a .env file if present
require('dotenv').config()
const express = require('express')
const app = express()
const router = express.Router()
const moment = require('moment')
// Lookup to see if local, take the SERVERPORT_LOCAL env var, otherwise the SERVERPORT Kubernetes env var
let serverPort = (process.env.ENV === 'local') ?  process.env.SERVERPORT_LOCAL : process.env.SERVERPORT

// If we are testing on Docker we need a hardcoded port
if (!serverPort) {
	serverPort = 8080
	console.log(`Hardcoded the port to ${serverPort}`)
}

// all routes prefixed with /api
app.use('/api', router)

// set the server to listen on the supplied port number
app.listen(serverPort, () => console.log(`${getTS()} App v0.0.1 listening on port ${serverPort}`))


// Health check probe to verify IVT is contactable
router.get('/health', (req,res) => {
	console.log(`${getTS()} /api/health invoked ...`)
	res.json({"message": "IVT up and ready to serve"})
});

// Helper function
const getTS = () => {
	return '[' + moment().format('Y-M-D H:m:s') + ']'
}