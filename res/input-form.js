/**
 * The Input Form sample from https://developer.ciscospark.com/buttons-and-cards-designer/input_form
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the width attribute
 * Input.Text with the placeholder and style attributes
 * Text Blocks with size, weight, isSubtle, and wrap attributes
 * Image with the size attribute
 * Action.Submit
 *
 **/

class InputForm {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/input_form.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/input_form`;
  }

  async renderCard(bot, logger, cardSelection) {
    try {
      await bot.say('The Input Form sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the width attribute\n' +
        '* Input.Text with the placeholder and style attributes\n' +
        '* Text Blocks with size, weight, isSubtle, and wrap attributes\n' +
        '* Image with the size attribute\n' +
        '* Action.Submit \n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Input Form example.");
      logger.info(`Sent the ${cardSelection} card to space: ${bot.room.title}`);

    } catch (err) {
      let msg = 'Failed to render Input Form card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* Name: ' + inputs.myName + '\n' +
      '* Email: ' + inputs.myEmail + '\n' +
      '* Phone: ' + inputs.myTel;
    bot.reply(attachmentAction, msg)
      .catch((e) => logger.error(`Failed to post Input Form response to space. Error:${e.message}`));
  };

};

module.exports = InputForm;