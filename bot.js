var Twit = require(‘twit’);
var TwitterBot = require(‘node-twitterbot’).TwitterBot;
var Bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});
var phraseArray = [ "gimme them emojis",
                    "emoji fortunes, come and get'em",
                    "Tweet us your 30 last used emojis to unlock your future." ];
function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}
var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);
Bot.tweet(phrase);

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

// Just looking at the event but I could tweet back!
//function followed(event) {
//  var name = event.source.name;
//  var screenName = event.source.screen_name;
//  console.log('I was followed by: ' + name + ' ' + screenName);
//}

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);

// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs');
  // var json = JSON.stringify(tweet,null,2);
  // fs.writeFile("tweet.json", json, output);

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;
  // Who sent the tweet?
  var name = tweet.user.screen_name;
  // What is the text?
  var txt = tweet.text;
  // If we want the conversation thread
  var id = tweet.id_str;

  // Ok, if this was in reply to me
  // Tweets by me show up here too
  if (reply_to === 'a2zitp') {

    // Get rid of the @ mention
    //txt = txt.replace(/@a2zitp/g,'');

    // Start a reply back to the sender
    var replyArray = ['@'+name + 'delete ur account',
                    '@'+name + 'delete ur account',
                    '@'+name + 'delete ur account' ];
    function chooseRandom(repArray) {
  return repArray[Math.floor(Math.random() * repArray.length)];
}
var phrase = chooseRandom(repArray) + ", " + chooseRandom(repArray);
Bot.tweet(reply);
    // Reverse their text
    //for (var i = txt.length-1; i >= 0; i--) {
    //  replyText += txt.charAt(i);
    //}

    // Post that tweet
    T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

    // Make sure it worked!
    function tweeted(err, reply) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    }
  }
}