/**
 * Adaptive Card Restaurant Sample from https://adaptivecards.io/samples/Restaurant.html
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the width attribute
 * Image with the size and attribute
 * Text Blocks with many attributes including size, weight, isSubtle and spacing
 * OpenUrl Action
 *
 * We did not need to modify this sample at all to make it work in Webex Teams
 **/

class Restaurant {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": 2,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "PIZZA"
                },
                {
                  "type": "TextBlock",
                  "text": "Tom's Pie",
                  "weight": "bolder",
                  "size": "extraLarge",
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "text": "4.2 ★★★☆ (93) · $$",
                  "isSubtle": true,
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "text": "**Matt H. said** \"I'm compelled to give this place 5 stars due to the number of times I've chosen to eat here this past year!\"",
                  "size": "small",
                  "wrap": true
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "Image",
                  "url": "https://picsum.photos/300?image=882",
                  "size": "auto"
                }
              ]
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.OpenUrl",
          "title": "More Info",
          "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'restaurant.js' :
      srcBaseUrl + '/restaurant.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Restaurant sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the width attribute\n' +
        '* Image with the size and attribute\n' +
        '* Text Blocks with many attributes including size, weight, isSubtle and spacing\n' +
        '* OpenUrl Action\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Restaurant example.");
    } catch (err) {
      let msg = 'Failed to render Restaurant card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, 'When a user clicks on a Action.OpenUrl button in Webex Teams, the client opens that link directly,  ' +
      'and there is no event to the application that posted the card.\n\n' +
      '...Don\'t click on more Info unless you like Rick Astley!\n\n' +
      'Post any message to me if you want to see another card')
      .catch((e) => logger.error(`Failed to post follow-up to Restaurant card. Error:${e.message}`));
  };

};

module.exports = Restaurant;