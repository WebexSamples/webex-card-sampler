/**
 * This is the top level card that allows a user to enter custom json to render
 **/

class CustomJsonInput {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/custom_design.json');
    this.contentType = contentType;
    this.srcUrl = '';
  }

  async renderCard(bot, logger) {
    // Update a local instance copy if this is a group space...
    let card = JSON.parse(JSON.stringify(this.card));
    if (bot.isGroup) {
      card.body.push(        {
        "type": "TextBlock",
        "text": "Don't forget to at-mention me in the message with your files!"
      });
    }

    bot.sendCard(card, "If you see this your client cannot render our Custom JSON Input card.")
      .catch((err) => {
        let msg = 'Failed to render Custom JSON Input card.';
        logger.error(`${msg} Error:${err.message}`);
        bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
          .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
      });
  };

};

module.exports = CustomJsonInput;

// To test
/*
let cardSize = new CardSize();
let card = require('./res/design/agenda.json');
cardSize.calculateRoughCardSize(card).then((sizeInfo) => {
  console.log(sizeInfo);
}).catch((e) => {
  console.error(`lookup failed: ${e.message}`);
}); 
*/