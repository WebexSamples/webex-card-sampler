/**
 * Adaptive Card Flight ItinerarySample from https://adaptivecards.io/samples/FlightItinerary.html
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSets and Columns with the separator and width attributes
 * Image with the size and spacing attributes
 * Speak attribute of the card type
 * Text Blocks with many attributes including size, weight, color, wrap, spacing and horizontalAlignment
 *
 * The speak attribute from original sample was removed as this is not supported on Webex Teams
 * isSubtle attribute is not supported for Text Blocks
 *
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction, and also to detect which button the user chose
 **/

class FlightItinerary {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.0",
      "type": "AdaptiveCard",
      //"speak": "Your flight is confirmed for you and 3 other passengers from San Francisco to Amsterdam on Friday, October 10 8:30 AM",
      "body": [
        {
          "type": "TextBlock",
          "text": "Passengers",
          "weight": "bolder"
        },
        {
          "type": "TextBlock",
          "text": "Sarah Hum",
          "separator": true
        },
        {
          "type": "TextBlock",
          "text": "Jeremy Goldberg",
          "spacing": "none"
        },
        {
          "type": "TextBlock",
          "text": "Evan Litvak",
          "spacing": "none"
        },
        {
          "type": "TextBlock",
          "text": "2 Stops",
          "weight": "bolder",
          "spacing": "medium"
        },
        {
          "type": "TextBlock",
          "text": "Fri, October 10 8:30 AM",
          "weight": "bolder",
          "spacing": "none"
        },
        {
          "type": "ColumnSet",
          "separator": true,
          "columns": [
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "San Francisco"
                },
                {
                  "type": "TextBlock",
                  "size": "extraLarge",
                  "color": "accent",
                  "text": "SFO",
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
                  "size": "small",
                  "spacing": "none"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "right",
                  "text": "Amsterdam"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "right",
                  "size": "extraLarge",
                  "color": "accent",
                  "text": "AMS",
                  "spacing": "none"
                }
              ]
            }
          ]
        },
        {
          "type": "TextBlock",
          "text": "Non-Stop",
          "weight": "bolder",
          "spacing": "medium"
        },
        {
          "type": "TextBlock",
          "text": "Fri, October 18 9:50 PM",
          "weight": "bolder",
          "spacing": "none"
        },
        {
          "type": "ColumnSet",
          "separator": true,
          "columns": [
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Amsterdam"
                },
                {
                  "type": "TextBlock",
                  "size": "extraLarge",
                  "color": "accent",
                  "text": "AMS",
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
                  "size": "small",
                  "spacing": "none"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "right",
                  "text": "San Francisco"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "right",
                  "size": "extraLarge",
                  "color": "accent",
                  "text": "SFO",
                  "spacing": "none"
                }
              ]
            }
          ]
        },
        {
          "type": "ColumnSet",
          "spacing": "medium",
          "columns": [
            {
              "type": "Column",
              "width": "1",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Total",
                  "size": "medium"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "right",
                  "text": "$4,032.54",
                  "size": "medium",
                  "weight": "bolder"
                }
              ]
            }
          ]
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'flight-itinerary.js' :
      srcBaseUrl + '/flight-itinerary.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Flight Itinerary sample demonstrates the following types of controls:\n' +
        '* ColumnSets and Columns with the separator and width attributes\n' +
        '* Image with the size and spacing attributes\n' +
        '* Text Blocks with many attributes including size, weight, isSubtle, color, wrap, spacing and horizontalAlignment\n\n' +
        'The speak attribute from original sample was removed as this is not supported on Webex Teams\n\n' +
        'Cards with images can take a few seconds to render.\n' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Flight Itinerary example.");
      await bot.reply(message, '...Not a fan of the two stops on the outbound!\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.');
    } catch (err) {
      let msg = 'Failed to render Flight Itinerary card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };


};

module.exports = FlightItinerary;
