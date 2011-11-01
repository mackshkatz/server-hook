(function() {
  var app, express, fs, nodemailer, searchPID, sendMail;
  nodemailer = require('nodemailer');
  express = require('express');
  fs = require('fs');
  app = express.createServer();
  searchPID = function(commit) {
    var PID, PTRG;
    PTRG = /\[#([0-9]{8,11})\]/;
    PID = commit.message.match(PTRG);
    console.log(PID != null);
    if (PID != null) {
      return sendMail(commit);
    }
  };
  sendMail = function(commit) {
    return nodemailer.send_mail({
      sender: 'lol@tangogroup.com',
      to: 'matthewpiskorz@gmail.com',
      subject: 'Hi',
      body: commit.message
    });
  };
  nodemailer.SMTP = {
    host: 'smtp.gmail.com',
    port: 465,
    ssl: true,
    use_authentication: true,
    user: 'maxkatz',
    pass: 'word'
  };
  app.post('/', function(request, response) {
    var commit, commits, yesPID, _i, _len;
    console.log('request received');
    yesPID = JSON.parse(fs.readFileSync('hook.json').toString());
    commits = yesPID.commits;
    for (_i = 0, _len = commits.length; _i < _len; _i++) {
      commit = commits[_i];
      searchPID(commit);
    }
    return response.send(200);
  });
  app.listen(3000);
  console.log('started.');
}).call(this);
