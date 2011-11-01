# Pivotal Tool in Node/Coffee Script



# Module dependencies

nodemailer = require('nodemailer')
express = require('express')
fs = require('fs')

###########################


app = express.createServer();

searchPID = (commit) ->
	PTRG = /\[#([0-9]{8,11})\]/
	PID = commit.message.match PTRG
	console.log PID?
	sendMail(commit) if PID? 

sendMail = (commit) ->
	nodemailer.send_mail({
		sender: 'lol@tangogroup.com',
		to : 'matthewpiskorz@gmail.com',
		subject : 'Hi',
		body : commit.message
	})

nodemailer.SMTP = {
	host: 'smtp.gmail.com',
	port: 465,
	ssl: true,
	use_authentication: true,
	user: 'maxkatz',
	pass: 'word'
}

app.post '/', (request, response) ->
	console.log 'request received'
	yesPID = JSON.parse(fs.readFileSync('hook.json').toString());
	commits = yesPID.commits
	searchPID(commit) for commit in commits
	response.send 200

app.listen 3000
console.log 'started.'








 
