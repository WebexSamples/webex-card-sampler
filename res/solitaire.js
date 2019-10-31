/**
 * Adaptive Card Solitaire Sample from https://adaptivecards.io/samples/Solitaire.html
 * This sample demonstrates the following types of controls:
 * 
 * The ColumnSet and Column elements with the width attribute
 * TextBlocks with the size, horizontalAlignment, wrap, color, and weight attributes
 * Image with the size attribute
 * backgroundImage attribute of the card object
 *
 * We removed the "backgroundImage" attribute from the original sample as this property of the 
 * card object is not supported on Webex Teams
 **/

class Solitaire {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "0.5",
      //"backgroundImage": "https://download-ssl.msgamestudios.com/content/mgs/ce/production/SolitaireWin10/dev/adapative_card_assets/v1/card_background.png",
      "body": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "Image",
                  "url": "https://download-ssl.msgamestudios.com/content/mgs/ce/production/SolitaireWin10/dev/adapative_card_assets/v1/tile_spider.png",
                  "size": "stretch"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Click here to play another game of Spider in Microsoft Solitaire Collection!",
                  "color": "light",
                  "weight": "bolder",
                  "wrap": true,
                  "size": "default",
                  "horizontalAlignment": "center"
                }
              ]
            }
          ]
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'solitaire.js' :
      srcBaseUrl + '/solitaire.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Solitaire sample demonstrates the following types of controls:\n' +
        '* The ColumnSet and Column elements with the width attribute\n' +
        '* TextBlocks with the size, horizontalAlignment, wrap, color, and weight attributes\n' +
        '* Image with the size attribute\n' +
        '* backgroundImage attribute of the card object\n\n' +
        'We removed the "backgroundImage" attribute from the original sample as this property of the ' +
        'card object is not supported on Webex Teams\n\n' +
        'You can see the full source with the modifications here: ' + this.srcUrl);
      message = await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Solitaire example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Solitaire card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.say({
      text: '...I don\'t know why this sample says "Click here", nothing happens if you do.\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.',
      parentId: message.id
    })
      .catch((e) => logger.error(`Failed to post follow-up to Solitaire card. Error:${e.message}`));
  };

};

module.exports = Solitaire;