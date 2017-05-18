// Probability of a Mocking Spongebob response
// 1 = always respond, +inf = never respond
var PROB_RESPONSE = 25;

// Minimum length for a response
var MIN_LENGTH = 10;

var HTTPS = require('https');
var botID = process.env.BOT_ID;

var responseEnabled = true; // prevents bot from responding to itself

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  if(responseEnabled && request.text && (request.text).length >= MIN_LENGTH && checkRespond()) {
    this.res.writeHead(200);
    postMessage(randomlyCapitalize(request.text));
    this.res.end();
    responseEnabled = false;
  } else {
    console.log("no response required");
    this.res.writeHead(200);
    this.res.end();
    responseEnabled = true;
  }
}

function randomlyCapitalize(str) {
  var output = "";
  for (i = 0; i < str.length; i++) {
    if (flipCoin()) {
      output += (str.slice(i,i+1)).toLowerCase();
    } else {
      output += (str.slice(i,i+1)).toUpperCase();      
    }
  }
  return output;
}

function flipCoin() {
  return Math.floor(Math.random() * 2) == true;
}

function checkRespond() {
  return Math.floor((Math.random() * PROB_RESPONSE) + 1) == 1;
}

function postMessage(response) {
  var botResponse, options, body, botReq;

  botResponse = response;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
      {
        "type"  : "image",
        "url"   : "https://i.groupme.com/650x381.jpeg.ae98ee14082d4edfba06aa894c16699d"
      }
    ]
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;