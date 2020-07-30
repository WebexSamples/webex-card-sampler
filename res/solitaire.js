/**
 * The Solitaire Cyberops sample from https://developer.ciscospark.com/buttons-and-cards-designer/solitaire_cyberops
 * This sample demonstrates the following types of controls:
 * 
 * The ColumnSet and Column elements with the width attribute
 * TextBlocks with the size, horizontalAlignment, wrap, color, and weight attributes
 * Image with the size attribute
 **/

class Solitaire {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/solitaire_cyberops.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/solitaire_cyberops`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Solitaire sample demonstrates the following types of controls:\n' +
        '* The ColumnSet and Column elements with the width attribute\n' +
        '* TextBlocks with the size, horizontalAlignment, wrap, color, and weight attributes\n' +
        '* Image with the size attribute\n' +
        'You can see the full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Solitaire example.");
    } catch (err) {
      let msg = 'Failed to render Solitaire card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...cyberops is cool, but building Webex Teams bots is way cooler...\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Solitaire card. Error:${e.message}`));
  };

};

module.exports = Solitaire;