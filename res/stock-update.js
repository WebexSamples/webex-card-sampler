/**
 * Adaptive Card Stock Update Sample from https://adaptivecards.io/samples/StockUpdate.html
 * This sample demonstrates the following types of controls:
 * 
 * The Container, ColumnSet and Column elements with the spacing, width attributes
 * TextBlocks with the size, isSubtle, color, spacing
 * The FactSet element
 * The speak attribute of the card element
 *
 * We removed the "speak" attribute from the original sample as this property of the 
 * card object is not supported on Webex Teams
 **/

class StockUpdate {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      // The speak attribute is not supported by Webex Teams
      //"speak": "Microsoft stock is trading at $62.30 a share, which is down .32%",
      "body": [
        {
          "type": "Container",
          "items": [
            {
              "type": "TextBlock",
              "text": "Microsoft Corp (NASDAQ: MSFT)",
              "size": "medium",
              "isSubtle": true
            },
            {
              "type": "TextBlock",
              "text": "September 19, 4:00 PM EST",
              "isSubtle": true
            }
          ]
        },
        {
          "type": "Container",
          "spacing": "none",
          "items": [
            {
              "type": "ColumnSet",
              "columns": [
                {
                  "type": "Column",
                  "width": "stretch",
                  "items": [
                    {
                      "type": "TextBlock",
                      "text": "62.30",
                      "size": "extraLarge"
                    },
                    {
                      "type": "TextBlock",
                      "text": "▼ 0.20 (0.32%)",
                      "size": "small",
                      "color": "attention",
                      "spacing": "none"
                    }
                  ]
                },
                {
                  "type": "Column",
                  "width": "auto",
                  "items": [
                    {
                      "type": "FactSet",
                      "facts": [
                        {
                          "title": "Open",
                          "value": "62.24"
                        },
                        {
                          "title": "High",
                          "value": "62.98"
                        },
                        {
                          "title": "Low",
                          "value": "62.20"
                        }
                      ]
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
      srcBaseUrl + 'stock-update.js' :
      srcBaseUrl + '/stock-update.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Stock Update sample demonstrates the following types of controls:\n' +
        '* The Container, ColumnSet and Column elements with the spacing, width attributes\n' +
        '* TextBlocks with the size, isSubtle, color, spacing\n' +
        '* The FactSet element\n' +
        '* The speak attribute of the card element\n\n' +
        'We removed the "speak" attribute from the original sample as this property of the ' +
        'card object is not supported on Webex Teams\n\n' +
        'You can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Stock Update example.");
    } catch (err) {
      let msg = 'Failed to render Stock Update card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...Uh-oh, better sell Microsoft!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Stock Update card. Error:${e.message}`));
  };

};

module.exports = StockUpdate;