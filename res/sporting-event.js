/**
 * The Sporting Event sample from https://developer.ciscospark.com/buttons-and-cards-designer/sporting_event
 * This sample demonstrates the following types of controls:
 * 
 * The Container, ColumnSet and Column elements with the width, separator and spacing attributes
 * TextBlocks with the size, horizontalAlignment, wrap, spacing, and weight attributes
 * Image with the size attribute, horizontalAlignment
 *
 **/

class SportingEvent {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/sporting_event.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/sporting_event`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Sporting Event sample demonstrates the following types of controls:\n' +
        '* The Container, ColumnSet and Column elements with the width, separator and spacing attributes\n' +
        '* TextBlocks with the size, horizontalAlignment, wrap, spacing, and weight attributes\n' +
        '* Image with the size attribute, horizontalAlignment\n' +
        '* backgroundImage attribute of the card object\n\n' +
        'Cards with images can take a few seconds to render, in the meantime you can see the full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Sporting Event example.");
    } catch (err) {
      let msg = 'Failed to render Sporting Event card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...bad day for the Barkers.  (Still doesn\'t he look cute!)\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Sporting Event card. Error:${e.message}`));
  };

};

module.exports = SportingEvent;