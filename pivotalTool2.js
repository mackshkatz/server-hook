(function() {
  var app, express, nodemailer, searchPID, sendMail, util;
  util = require('util');
  nodemailer = require('nodemailer');
  express = require('express');
  app = express.createServer();
  app.use(express.bodyParser());
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
    console.log('script entered the mailer function');
    nodemailer.send_mail({
      sender: 'Max & Matt',
      to: 'matthewpiskorz@gmail.com',
      subject: 'Pivotal Tracker Bug Report',
      body: "Commit Number: " + commit.id + "\n\nCommit Message: " + commit.message
    });
    return console.log('script exited the mailer function');
  };
  nodemailer.SMTP = {
    host: 'smtp.gmail.com',
    port: 465,
    ssl: true,
    use_authentication: true,
    user: 'lolcoptor99@gmail.com',
    pass: 'yahoosucks'
  };
  app.post('/', function(request, response) {
    var commit, commits, hook, _i, _len;
    console.log('request received');
    hook = JSON.parse(request.body.payload);
    commits = hook.commits;
    for (_i = 0, _len = commits.length; _i < _len; _i++) {
      commit = commits[_i];
      searchPID(commit);
    }
    return response.send(200);
  });
  app.listen(process.env.PORT);
  console.log('started.');
}).call(this);
