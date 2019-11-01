/**
 * Adaptive Card Product Video Sample from https://adaptivecards.io/samples/ProductVideo.html
 * This sample demonstrates the following types of controls:
 * 
 * The Media Element which is not supported by Webex Teams
 * Action.OpenUrl
 * 
 * Since this card is centered around the Media element we don't attempt to render it
 * It is not included in our top level "Sample Picker" card, but we include it in
 * this project for completeness.
 **/

class ProductVideo {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.1",
      // fallbackTest in the card schema is not supported on Webex Teams
      // set your fallback text in the markdown or text fields of your message request instead
      //"fallbackText": "This card requires Media to be viewed. Ask your platform to update to Adaptive Cards v1.1 for this and more!",
      "body": [
        //  The Media element is not supported by Webex Teams
        // {
        //   "type": "Media",
        //   "poster": "https://adaptivecards.io/content/poster-video.png",
        //   "sources": [
        //     {
        //       "mimeType": "video/mp4",
        //       "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
        //     }
        //   ]
        // }
      ],
      "actions": [
        {
          "type": "Action.OpenUrl",
          "title": "Learn more",
          "url": "https://adaptivecards.io"
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'product-video.js' :
      srcBaseUrl + '/product-video.js';
  }

  async renderCard(bot, logger) {
    bot.say('The Product Video sample demonstrates the following types of controls:\n' +
      '* The Media Element which is not supported by Webex Teams\n' +
      '* Action.OpenUrl\n\n' +
      '* Since this card is centered around the Media element which is not supported by Webex Teams, \n' +
      'we can\'t show you this sample.  You can see the full source here: ' + this.srcUrl +
      '\n\nPost any message to me to see another sample.')
      .catch((err) => {
        let msg = 'Failed to render Product Video card example message.';
        logger.error(`${msg} Error:${err.message}`);
      });
  };

};

module.exports = ProductVideo;