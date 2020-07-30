/**
 * The Flight Itinerary sample from https://developer.ciscospark.com/buttons-and-cards-designer/flight_itinerary
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the separator and width attributes
 * Image with the size and spacing attributes
 * Text Blocks with many attributes including size, weight, isSubtle, color, wrap, spacing and horizontalAlignment
 *
 **/

class FlightItinerary {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/flight_itinerary.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/flight_itinerary`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Flight Itinerary sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the separator and width attributes\n' +
        '* Image with the size and spacing attributes\n' +
        '* Text Blocks with many attributes including size, weight, isSubtle, color, wrap, spacing and horizontalAlignment\n\n' +
        'Cards with images can take a few seconds to render.\n' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Flight Itinerary example.");
      await bot.reply(message, '...Not a fan of the two stops on the outbound!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.');
    } catch (err) {
      let msg = 'Failed to render Flight Itinerary card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };


};

module.exports = FlightItinerary;