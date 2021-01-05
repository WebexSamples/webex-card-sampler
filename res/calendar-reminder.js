/**
 * The Calendar Reminder sample from https://developer.ciscospark.com/buttons-and-cards-designer/calendar_reminder
 * This sample demonstrates the following types of controls
 *   -- Text block with the size, weight, isSubtle, and spacing attributes
 *   -- Input.ChoiceSet with the style attribute
 *   -- Action.Submit buttons
 *
 * We modified the data fields in the Action.Submit buttons to inlcude the cardType attribute
 * which our app uses to provide an appropriate response.
 **/

class CalendarReminder {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/calendar_reminder.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/calendar_reminder`;
  }

  async renderCard(bot, logger, cardSelection) {
    try {
      await bot.say('The Calendar Reminder sample demonstrates the following types of controls:\n' +
        '* Text block with the size, weight, isSubtle, and spacing attributes\n' +
        '* Input.ChoiceSet with the style attribute\n' +
        '* Action.Submit buttons\n\n' +
        'You can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Calendar Reminder example.");
      logger.info(`Sent the ${cardSelection} card to space: ${bot.room.title}`);
      
    } catch (err) {
      let msg = 'Failed to render Calendar Reminder card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* action: ' + inputs.action;
    bot.reply(attachmentAction, msg)
      .catch((e) => logger.error(`Failed to post calendar reminder response to space. Error:${e.message}`));
  };


};

module.exports = CalendarReminder;