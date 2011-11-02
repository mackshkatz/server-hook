# Pivotal Tool in Node/Coffee Script
# Module dependencies
util = require('util')
nodemailer = require('nodemailer')
express = require('express')
###########################

app = express.createServer()
app.use(express.bodyParser())

searchPID = (commit) ->
	PTRG = /\[#([0-9]{8,11})\]/
	PID = commit.message.match PTRG
	console.log PID?
	# console.log PID
	sendMail(commit) if PID? 

sendMail = (commit) ->
	console.log 'script entered the mailer function'
	nodemailer.send_mail({
		sender: 'Max & Matt',
		to : 'matthewpiskorz@gmail.com',
		subject : 'Pivotal Tracker Bug Report',
		body : "Commit Number: " + commit.id + "\n\nCommit Message: " + commit.message # add commitID
	})
	console.log 'script exited the mailer function'
	

nodemailer.SMTP = {
	host: 'smtp.gmail.com',
	port: 465,
	ssl: true,
	use_authentication: true,
	user: 'lolcoptor99@gmail.com',
	pass: 'yahoosucks'
}

app.post '/', (request, response) ->
	console.log 'request received'
	hook = JSON.parse(request.body.payload)
	commits = hook.commits
	searchPID(commit) for commit in commits
	response.send 200

app.listen process.env.PORT
console.log 'started.'








 
