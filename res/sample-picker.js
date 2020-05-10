/**
 * This is the top level card that allows a user to select a card sample to experience
 **/

class SamplePicker {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/sample_picker.json');
    this.contentType = contentType;
    this.srcUrl = '';
  }

  async renderCard(bot, logger) {
    bot.sendCard(this.card, "If you see this your client cannot render our Sample Picker Client.")
      .catch((err) => {
        let msg = 'Failed to render Sample Picker card.';
        logger.error(`${msg} Error:${err.message}`);
        bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
          .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
      });
  };

};

module.exports = SamplePicker;