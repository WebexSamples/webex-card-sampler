/**
 * The Restaurant Review sample from https://developer-portal-intb.ciscospark.com/buttons-and-cards-designer/restaurant
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the width attribute
 * Image with the size and attribute
 * Text Blocks with many attributes including size, weight, isSubtle and spacing
 * OpenUrl Action
 *
 * The speak attribute from original sample was removed as this is not supported on Webex Teams
 **/

class Restaurant {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/restaurant.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/restaurant`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Restaurant sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the width attribute\n' +
        '* Image with the size and attribute\n' +
        '* Text Blocks with many attributes including size, weight, isSubtle and spacing\n' +
        '* OpenUrl Action\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Restaurant example.");
    } catch (err) {
      let msg = 'Failed to render Restaurant card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, 'When a user clicks on a Action.OpenUrl button in Webex Teams, the client opens that link directly,  ' +
      'and there is no event to the application that posted the card.\n\n' +
      '...Don\'t click on more Info unless you want to see more pictures of yummy food!\n\n' +
      'Post any message to me if you want to see another card')
      .catch((e) => logger.error(`Failed to post follow-up to Restaurant card. Error:${e.message}`));
  };

};

module.exports = Restaurant;