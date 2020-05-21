/**
 * The Agenda sample from https://developer-portal-intb.ciscospark.com/buttons-and-cards-designer/agenda
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSet and Column elements with the horizontalAlignment, spacing, seperator and width attributes
 * Text block with the isSubtle, spacing and wrap attributes
 * Image with the size and horizontalAlignment attributes\
 * backgroundImage with the fillmode and horizontalAlignment attributes
 * ImageSet with the horizontalAlignment attributes
 *
 **/

class Agenda {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/agenda.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/agenda`;
  }

  async renderCard(bot, logger) {
    let message = {}; 
    try {
      await bot.say('The Agenda sample demonstrates the following types of controls:\n' +
        '* ColumnSet and Column elements with the horizontalAlignment, spacing, seperator and width attributes\n' +
        '* Text block with the isSubtle, spacing and wrap attributes\n' +
        '* Image with the size and horizontalAlignment attributes\n' +
        '* backgroundImage with the fillmode and horizontalAlignment attributes\n' +
        '* ImageSet with the horizontalAlignment attributes\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Agenda example.");
      await bot.reply(message, '...looks like just enough time to grab lunch in New York!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.');
    } catch (err) {
      let msg = 'Failed to render Agenda card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };
};

module.exports = Agenda;