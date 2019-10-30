/**
 * Adaptive Card Image Gallery Sample from https://adaptivecards.io/samples/ImageGallery.html
 * This sample demonstrates the following types of controls
 * 
 * Text Block with the size and weight attributes
 * ImageSet element with the imageSize attribute
 * Image element
 *
 **/

class ImageGallery {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "TextBlock",
          "text": "Here are some cool photos",
          "size": "large"
        },
        {
          "type": "TextBlock",
          "text": "Sorry some of them are repeats",
          "size": "medium",
          "weight": "lighter"
        },
        {
          "type": "ImageSet",
          "imageSize": "medium",
          "images": [
            {
              "type": "Image",
              "url": "https://picsum.photos/200/200?image=100"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/300/200?image=200"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/300/200?image=301"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/200/200?image=400"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/300/200?image=500"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/200/200?image=600"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/300/200?image=700"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/300/200?image=800"
            },
            {
              "type": "Image",
              "url": "https://picsum.photos/300/200?image=900"
            }
          ]
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'image-gallery.js' :
      srcBaseUrl + '/image-gallery.js';
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
      message = await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Image Gallery example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Image Gallery card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.say({
      text: '...don\'t gaze at those lovely images too long! You could end up like Narcissus.\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.',
      parentId: message.id
    })
      .catch((e) => logger.error(`Failed to post follow-up to Image Gallery card. Error:${e.message}`));
  };

};

module.exports = ImageGallery;