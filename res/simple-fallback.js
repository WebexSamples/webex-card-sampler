/**
 * Adaptive Card Input Form Sample from https://adaptivecards.io/samples/SimpleFallback.html
 * This sample demonstrates the following types of controls
 *   -- fallback property of an Adaptive Card element
 *
 * Webex Teams does not support per-element fallback text.  If any asepect of the card schema is 
 * invalid, the fallback message or markup text is displayed instead of the card
 **/

class SimpleFallback {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "type": "AdaptiveCard",
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.2",
      "body": [
        {
          "type": "TextBlock",
          "text": "Fallback test:"
        },
        {
          "type": "Steve Holt!",
          "egg": "her?",
          "fallback": "drop"
        },
        {
          "type": "Graph",
          "someProperty": "foo",
          "fallback": {
            "type": "TextBlock",
            "text": "No graph support. Guess we'll just use this textblock instead."
          }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'simple-fallback.js' :
      srcBaseUrl + '/simple-fallback.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Simple Fallback sample demonstrates the following types of controls\n' +
        '* fallback property of an Adaptive Card element\n\n' +
        'Webex Teams does not support per-element fallback attributes.  If any asepect of the card schema is ' +
        'invalid, the fallback message specified in the text or markup fields of the message request ' +
        'is displayed instead of the card\n\n' +
        'You can see the full sample source here: ' + this.srcUrl);
      message = await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "This is the fallback text submitted via the `markdown` attribute in the `POST /messages` " +
          "API request body, along with the unspported card schema in the `attachments` field.\n\n" +
          "You are seeing this since Webex determined " +
          "that the card could not be rendered.  **This message IS the expected output for this card sample** \n\n" +
          "Post any message to me to see another sample",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Simple Fallback card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

};

module.exports = SimpleFallback;