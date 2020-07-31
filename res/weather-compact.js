/**
 * The Weather Compact sample from https://developer.ciscospark.com/buttons-and-cards-designer/weather_compact
 * This sample demonstrates the following types of controls:
 * 
 * The ColumnSet and Column elements with the width attribute
 * TextBlocks with the size, isSubtle, horizontalAlignment, and spacing attributes
 * Image with the size attribute, horizontalAlignment
 **/

class WeatherCompact {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/weather_compact.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/weather_compact`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Weather Compact sample demonstrates the following types of controls:\n' +
        '* The Container, ColumnSet and Column elements with the width, separator and spacing attributes\n' +
        '* TextBlocks with the size, horizontalAlignment, wrap, spacing, and weight attributes\n' +
        '* Image with the size attribute, horizontalAlignment\n\n' +
        'Cards with images can take a few seconds to render, in the meantime you can see the full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Weather Compact example.");
    } catch (err) {
      let msg = 'Failed to render Weather Compact card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...don\'t forget your sunglasses!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Weather Compact card. Error:${e.message}`));
  };

};

module.exports = WeatherCompact;