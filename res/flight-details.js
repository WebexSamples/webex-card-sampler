/**
 * The Flight Details sample from https://developer.ciscospark.com/buttons-and-cards-designer/flight_details
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the spacing, style, width, height verticalContentAlignment, isVisible, and bleed attributes\n' +
 * Container elements with the spacing, style and backgroundImage attributes.\n' +
 * Text Blocks with many attributes including size, weight, color, wrap, spacing and horizontalAlignment\n' +
 * Image with the height attribute\n' +
 * Action.Submit buttons\n\n' +
 *
 **/

class FlightDetails {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/flight_details.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/flight_details`;
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Flight Details sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the spacing, style, width, height verticalContentAlignment, isVisible, and bleed attributes\n' +
        '* Container elements with the spacing, style and backgroundImage attributes.\n' +
        '* Text Blocks with many attributes including size, weight, color, wrap, spacing and horizontalAlignment\n' +
        '* Image with the height attribute\n' +
        '* Action.Submit buttons\n\n' +
        'Cards with images can take a few seconds to render.\n\n' +
        'In the meantime you can see the full source, with modifications, here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Flight Details example.");
    } catch (err) {
      let msg = 'Failed to render Flight Details card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* action: ' + inputs.action;
    bot.reply(attachmentAction, msg)
      .catch((e) => logger.error(`Failed to post Flight Details card response to space. Error:${e.message}`));
  };

};

module.exports = FlightDetails;