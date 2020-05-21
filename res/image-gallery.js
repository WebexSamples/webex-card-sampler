/**
 * The Image Gallery sample from https://developer-portal-intb.ciscospark.com/buttons-and-cards-designer/image_gallery
 * This sample demonstrates the following types of controls
 * 
 * Text Block with the size and weight attributes
 * ImageSet element with the imageSize attribute
 * Image element
 *
 **/

class ImageGallery {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/image_gallery.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/image_gallery`;
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Image Gallery sample demonstrates the following types of controls:\n' +
        '* Text Block with the size and weight attributes\n' +
        '* Image element\n' +
        '* ImageSet element with the imageSize attribute\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Image Gallery example.");
    } catch (err) {
      let msg = 'Failed to render Image Gallery card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...don\'t gaze at those lovely images too long! You could end up like Narcissus.\n\n' +
      'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch ((e) => logger.error(`Failed to post follow-up to Image Gallery card. Error:${e.message}`));
  };

};

module.exports = ImageGallery;