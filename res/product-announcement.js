/**
 * The Product Announcement sample from https://developer.ciscospark.com/buttons-and-cards-designer/product_announcement
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSet and Columns with the width, spacing and horizontalAlignment attributes
 * TextBlock with the wrap attribute
 * Image with the altText, size and width attributes
 * An ActionSet with the horizontalAlignment attribute, containging an Action.Submit button 
 **/

class ProductAnnouncement {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/product_announcement.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/product_announcement`;
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Product Announcement sample demonstrates the following types of controls:\n' +
      ' * ColumnSet and Columns with the width, spacing and horizontalAlignment attributes\n' +
      ' * TextBlock with the wrap attribute\n' +
      ' * Image with the altText, size and width attributes\n' +
      ' * An ActionSet with the horizontalAlignment attribute, containging an Action.Submit button\n' +
      'Cards with images can take a few seconds to render. ' +
      'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Food Order example.");
    } catch (err) {
      let msg = 'Failed to render Product Announcement card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

};

module.exports = ProductAnnouncement;