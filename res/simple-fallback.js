/**
 * Adaptive Card Simple Fallback Sample from https://adaptivecards.io/samples/SimpleFallback.html
 * This sample demonstrates the following types of controls:
 * 
 * TextBlock and some improper elements designed to force the fallback
 * The fallback property of an Adaptive Card element
 *
 * Webex Teams does not support fallback property in the card schema itself.  If any asepect of the 
 * schema is invalid, the fallback text or markup sumbitted in the /messages request body
 * is displayed instead of the card
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
          //The per-elment fallback attribute is not supported by Webex Teams
          //"fallback": "drop"
        },
        {
          "type": "Graph",
          "someProperty": "foo",
          //The per-elment fallback attribute is not supported by Webex Teams
          // "fallback": {
          //   "type": "TextBlock",
          //   "text": "No graph support. Guess we'll just use this textblock instead."
          // }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'simple-fallback.js' :
      srcBaseUrl + '/simple-fallback.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Simple Fallback sample demonstrates the following types of controls:\n' +
        '* TextBlock and some improper elements designed to force the fallback\n' +
        '* The fallback property of an Adaptive Card element\n\n' +
        'Webex Teams does not support fallback property in the card schema itself.  If any asepect of the ' +
        'schema is invalid, the fallback text or markup sumbitted in the /messages request body ' +
        'is displayed instead of the card\n\n' +
        'You can see the full sample source here: ' + this.srcUrl);
      await bot.sendCard(this.card,"This is the fallback text submitted via the `markdown` attribute in the `POST /messages` " +
          "API request body, along with the unspported card schema in the `attachments` field.\n\n" +
          "You are seeing this since Webex determined that the card could not be rendered. " +
          "**This message IS the expected output for this card sample** \n\n" +
          "Post any message to me to see another sample");
    } catch (err) {
      let msg = 'Failed to render Simple Fallback card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

};

module.exports = SimpleFallback;