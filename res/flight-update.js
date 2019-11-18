/**
 * Adaptive Card Flight Update Sample from https://adaptivecards.io/samples/FlightUpdate.html
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the separator, spacing, width attributes
 * Image with the size and attribute
 * Speak attribute of the card type
 * Text Blocks with many attributes including size, weight, isSubtle, color, spacing and horizontalAlignment
 *
 * The speak attribute from original sample was removed as this is not supported on Webex Teams
 * 
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction, and also to detect which button the user chose
 **/

class FlightUpdate {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      //"speak": "Flight KL0605 to San Fransisco has been delayed.It will not leave until 10:10 AM.",
      "body": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "Image",
                  "size": "small",
                  "url": "http://adaptivecards.io/content/airplane.png"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Flight Status",
                  "horizontalAlignment": "right",
                  "isSubtle": true
                },
                {
                  "type": "TextBlock",
                  "text": "DELAYED",
                  "horizontalAlignment": "right",
                  "spacing": "none",
                  "size": "large",
                  "color": "attention"
                }
              ]
            }
          ]
        },
        {
          "type": "ColumnSet",
          "separator": true,
          "spacing": "medium",
          "columns": [
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Passengers",
                  "isSubtle": true,
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "Sarah Hum",
                  "spacing": "small"
                },
                {
                  "type": "TextBlock",
                  "text": "Jeremy Goldberg",
                  "spacing": "small"
                },
                {
                  "type": "TextBlock",
                  "text": "Evan Litvak",
                  "spacing": "small"
                }
              ]
            },
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Seat",
                  "horizontalAlignment": "right",
                  "isSubtle": true,
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "14A",
                  "horizontalAlignment": "right",
                  "spacing": "small"
                },
                {
                  "type": "TextBlock",
                  "text": "14B",
                  "horizontalAlignment": "right",
                  "spacing": "small"
                },
                {
                  "type": "TextBlock",
                  "text": "14C",
                  "horizontalAlignment": "right",
                  "spacing": "small"
                }
              ]
            }
          ]
        },
        {
          "type": "ColumnSet",
          "spacing": "medium",
          "separator": true,
          "columns": [
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Flight",
                  "isSubtle": true,
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "KL0605",
                  "spacing": "small"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Departs",
                  "isSubtle": true,
                  "horizontalAlignment": "center",
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "10:10 AM",
                  "color": "attention",
                  "weight": "bolder",
                  "horizontalAlignment": "center",
                  "spacing": "small"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Arrives",
                  "isSubtle": true,
                  "horizontalAlignment": "right",
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "12:00 AM",
                  "color": "attention",
                  "horizontalAlignment": "right",
                  "weight": "bolder",
                  "spacing": "small"
                }
              ]
            }
          ]
        },
        {
          "type": "ColumnSet",
          "spacing": "medium",
          "separator": true,
          "columns": [
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Amsterdam",
                  "isSubtle": true
                },
                {
                  "type": "TextBlock",
                  "text": "AMS",
                  "size": "extraLarge",
                  "color": "accent",
                  "spacing": "none"
                }
              ]
            },
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "TextBlock",
                  "text": " "
                },
                {
                  "type": "Image",
                  "url": "http://adaptivecards.io/content/airplane.png",
                  "size": "small"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "San Francisco",
                  "isSubtle": true,
                  "horizontalAlignment": "right"
                },
                {
                  "type": "TextBlock",
                  "text": "SFO",
                  "horizontalAlignment": "right",
                  "size": "extraLarge",
                  "color": "accent",
                  "spacing": "none"
                }
              ]
            }
          ]
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'flight-update.js' :
      srcBaseUrl + '/flight-update.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Flight Update sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the separator, spacing, width attributes\n' +
        '* Image with the size and attribute\n' +
        '* Speak attribute of the card type\n' +
        '* Text Blocks with many attributes including size, weight, isSubtle, color, spacing and horizontalAlignment\n\n' +
        'The speak attribute from original sample was removed as this is not supported on Webex Teams\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Flight Update example.");
      bot.reply(message, '...Yay, extra time in Amsterdam!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
    } catch (err) {
      let msg = 'Failed to render Flight Update card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };


};

module.exports = FlightUpdate;