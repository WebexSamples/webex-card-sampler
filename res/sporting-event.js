/**
 * Adaptive Card Sporting Event Sample from https://adaptivecards.io/samples/SportingEvent.html
 * This sample demonstrates the following types of controls:
 * 
 * The Container, ColumnSet and Column elements with the width, separator and spacing attributes
 * TextBlocks with the size, horizontalAlignment, wrap, spacing, and weight attributes
 * Image with the size attribute, horizontalAlignment
 * backgroundImage attribute of the card object
 *
 * We removed the "speak" attribute from the original sample as this property of the 
 * card object is not supported on Webex Teams
 **/

class SportingEvent {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      //"speak": "The Seattle Seahawks beat the Carolina Panthers 40-7",
      "body": [
        {
          "type": "Container",
          "items": [
            {
              "type": "ColumnSet",
              "columns": [
                {
                  "type": "Column",
                  "width": "auto",
                  "items": [
                    {
                      "type": "Image",
                      "url": "https://adaptivecards.io/content/cats/3.png",
                      "size": "medium"
                    },
                    {
                      "type": "TextBlock",
                      "text": "SHADES",
                      "horizontalAlignment": "center",
                      "weight": "bolder"
                    }
                  ]
                },
                {
                  "type": "Column",
                  "width": "stretch",
                  "separator": true,
                  "spacing": "medium",
                  "items": [
                    {
                      "type": "TextBlock",
                      "text": "Dec 4",
                      "horizontalAlignment": "center"
                    },
                    {
                      "type": "TextBlock",
                      "text": "Final",
                      "spacing": "none",
                      "horizontalAlignment": "center"
                    },
                    {
                      "type": "TextBlock",
                      "text": "7 - 40",
                      "size": "extraLarge",
                      "horizontalAlignment": "center"
                    }
                  ]
                },
                {
                  "type": "Column",
                  "width": "auto",
                  "separator": true,
                  "spacing": "medium",
                  "items": [
                    {
                      "type": "Image",
                      "url": "https://adaptivecards.io/content/cats/2.png",
                      "size": "medium",
                      "horizontalAlignment": "center"
                    },
                    {
                      "type": "TextBlock",
                      "text": "SKINS",
                      "horizontalAlignment": "center",
                      "weight": "bolder"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'sporting-event.js' :
      srcBaseUrl + '/sporting-event.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Sporting Event sample demonstrates the following types of controls:\n' +
        '* The Container, ColumnSet and Column elements with the width, separator and spacing attributes\n' +
        '* TextBlocks with the size, horizontalAlignment, wrap, spacing, and weight attributes\n' +
        '* Image with the size attribute, horizontalAlignment\n' +
        '* backgroundImage attribute of the card object\n\n' +
        'We removed the "speak" attribute from the original sample as this property of the \n' +
        'card object is not supported on Webex Teams\n' +
        'Cards with images can take a few seconds to render, in the meantime you can see the full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Sporting Event example.");
    } catch (err) {
      let msg = 'Failed to render Sporting Event card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...and yet the Skins still didn\'t cover the spread...\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Sporting Event card. Error:${e.message}`));
  };

};

module.exports = SportingEvent;