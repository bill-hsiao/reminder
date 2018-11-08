//app constants

const express = require('express');
const router = express.Router();

//env constants

const AccountSid = process.env.api_AccountSid;
const AuthToken = process.env.api_AuthToken;

const twilio = require('twilio');


const userCtrl = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Texting App' });
});


router.post('/send', function(req, res, next) {
  var client = new twilio(AccountSid, AuthToken);
  var receipt = "";
  req.body = JSON.parse(JSON.stringify(req.body));
  console.log('testing', req.body.content);
  client.messages.create({
      body: req.body.content,
      to: `+1${req.body.target}`,  // Text this number
      from: '+14243658467' // From a valid Twilio number
  })
  .then((message) => {
    console.log(message.sid);
    receipt = message.sid;
    if (message.sid) {
      res.send('Text sent successfully! Receipt: ' + receipt)
    }
  })
});


router.get('/user/signin', userCtrl.signInGet);
router.get('/user/signup', userCtrl.signUpGet);
router.post('/user/signin', userCtrl.signInPost);
router.post('/user/signup', userCtrl.signUpPost);



module.exports = router;
