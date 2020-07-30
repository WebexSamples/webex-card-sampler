/**
 * The Weather Large sample from https://developer.ciscospark.com/buttons-and-cards-designer/weather_large
 * This sample demonstrates the following types of controls:
 * 
 * The backgroundImage attribute of a card
 * The ColumnSet and Column elements with the width attribute
 * TextBlocks with the size, weight, color, isSubtle, horizontalAlignment, wrap, and spacing attributes
 * Image with the size attribute, horizontalAlignment
 * Action.OpenUrl
 *
 **/

class WeatherLarge {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/weather_large.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/weather_large`;
  }

  async renderCard(bot, logger) {
    let message = {}; 
    try {
      message = await bot.say('The Weather Large sample demonstrates the following types of controls:\n' +
        '* The backgroundImage attribute of a card\n' +
        '* The ColumnSet and Column elements with the width attribute\n' +
        '* TextBlocks with the size, weight, color, isSubtle, horizontalAlignment, wrap, and spacing attributes\n' +
        '* Image with the size attribute, horizontalAlignment\n' +
        '* The selectAction attribute of a column to make it "clickable"\n' +
        '* Action.OpenUrl\n\n' +
        'Cards with images can take a few seconds to render, in the meantime you can see the ' +
        'full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Weather Large example.")
    } catch (err) {
      let msg = 'Failed to render Weather Large card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...bring an umbrella on Wednesday!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Weather Large card. Error:${e.message}`));
  };

};

module.exports = WeatherLarge;