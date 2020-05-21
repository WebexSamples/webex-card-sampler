/**
 * The Stock Update sample from https://developer-portal-intb.ciscospark.com/buttons-and-cards-designer/stock_update
 * This sample demonstrates the following types of controls:
 * 
 * The Container, ColumnSet and Column elements with the spacing, width attributes
 * TextBlocks with the size, isSubtle, color, spacing
 * Image elment with the horizontalAlignment attribute
 *
 **/

class StockUpdate {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/stock_update.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/stock_update`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Stock Update sample demonstrates the following types of controls:\n' +
        '* The Container, ColumnSet and Column elements with the spacing, width attributes\n' +
        '* TextBlocks with the size, isSubtle, color, spacing\n' +
        '* Image elment with the horizontalAlignment attribute\n' +
        'You can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Stock Update example.");
    } catch (err) {
      let msg = 'Failed to render Stock Update card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...a little dip on this day, but the trend is still good!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Stock Update card. Error:${e.message}`));
  };

};

module.exports = StockUpdate;