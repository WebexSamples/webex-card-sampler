/**
 * The Activity Update sample from https://developer.ciscospark.com/buttons-and-cards-designer/activity_update
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSet and Column elements with the width, size, and style attributes
 * Text block with the weight, size, isSubtle, spacing and wrap attributes
 * Input.Text element with the isMultiline and placeholder attributes
 * Input.Date element
 * Image with the size and style attributes
 * Fact Set
 * ShowCard and Submit actions
 *
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction
 **/

class ActivityUpdate {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/activity_update.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/activity_update`;
  }

  async renderCard(bot, logger, cardSelection) {
    try {
      await bot.say('The Activity Update sample demonstrates the following types of controls:\n' +
        '* ColumnSet and Column elements with the width, size, and style attributes\n' +
        '* Text block with the weight, size, isSubtle, spacing and wrap attributes\n' +
        '* Input.Text element with the isMultiline and placeholder attributes\n' +
        '* Input.Date element\n' +
        '* Image with the size and style attributes\n' +
        '* Fact Set\n' +
        '* ShowCard and Submit actions\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Activity Update example.");
      logger.info(`Sent the ${cardSelection} card to space: ${bot.room.title}`);
      
    } catch (err) {
      let msg = 'Failed to render Activity Update card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* Due Date: ' + inputs.dueDate + '\n' +
      '* Comment: ' + inputs.comment;
    bot.reply(attachmentAction, msg)
      .catch((e) => logger.error(`Failed to post Activity Update response to space. Error:${e.message}`));
  };

};

module.exports = ActivityUpdate;