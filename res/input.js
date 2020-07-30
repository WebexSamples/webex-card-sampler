/**
 * The Input Sample from https://developer.ciscospark.com/buttons-and-cards-designer/input
 * This sample demonstrates the following types of controls:
 * 
 * Text Blocks with size, weight, and horizontalAlignment attributes
 * Input.Text with the placeholder, isMultiline, maxLength, and style attributes
 * Input.Number with the placholder, min, max and value attributes
 * Input.Date with the placeholder and value attributes
 * Input.Time with the placeholder and value attributes
 * Input.ChoiceSet with the style, value and isMultiSelect attributes
 * Input.Toggle with the title, valueOn and valueOff attributes
 * Action.ShowCard and Action.Submit elements
 *
 **/

class Input {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/input.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/input`;
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Input sample demonstrates the following types of controls:\n' +
        '* Text Blocks with size, weight, and horizontalAlignment attributes\n' +
        '* Input.Text with the placeholder, isMultiline, maxLength, and style attributes\n' +
        '* Input.Number with the placholder, min, max and value attributes\n' +
        '* Input.Date with the placeholder and value attributes\n' +
        '* Input.Time with the placeholder and value attributes\n' +
        '* Input.ChoiceSet with the style, value and isMultiSelect attributes\n' +
        '* Input.Toggle with the title, valueOn and valueOff attributes\n' +
        '* Action.ShowCard and Action.Submit elements\n\n' +
        'You can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Input example.");
    } catch (err) {
      let msg = 'Failed to render Input card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };
};

module.exports = Input;