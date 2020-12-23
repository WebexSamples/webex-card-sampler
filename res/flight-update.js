/**
 * The Flight Update sample from https://developer.ciscospark.com/buttons-and-cards-designer/flight_update
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the separator, spacing, width attributes
 * Image with the size and attribute
 * Speak attribute of the card type
 * Text Blocks with many attributes including size, weight, isSubtle, color, spacing and horizontalAlignment
 *
 **/

class FlightUpdate {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/flight_update.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/flight_update`;
  }

  async renderCard(bot, logger, cardSelection) {
    let message = {};
    try {
      message = await bot.say('The Flight Update sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the separator, spacing, width attributes\n' +
        '* Image with the size and attribute\n' +
        '* Speak attribute of the card type\n' +
        '* Text Blocks with many attributes including size, weight, isSubtle, color, spacing and horizontalAlignment\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Flight Update example.");
      logger.info(`Sent the ${cardSelection} card to space: ${bot.room.title}`);

      bot.reply(message, '...Yay, extra time in Amsterdam!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      logger.info(`Sent reply to the ${cardSelection} card to space: ${bot.room.title}`);
      
    } catch (err) {
      let msg = 'Failed to render Flight Update card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };


};

module.exports = FlightUpdate;