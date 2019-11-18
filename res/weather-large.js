/**
 * Adaptive Card Weather Large Sample from https://adaptivecards.io/samples/WeatherCompact.html
 * This sample demonstrates the following types of controls:
 * 
 * The ColumnSet and Column elements with the width attribute
 * TextBlocks with the size, weight, color, isSubtle, horizontalAlignment, wrap, and spacing attributes
 * Image with the size attribute, horizontalAlignment
 * Action.OpenUrl
 *
 * We removed the "speak" and "backgroundImage" attributes from the original sample as
 * these properties of the card object are not supported on Webex Teams
 * 
 * We also changed the urls to go to a weather related site
 **/

class WeatherLarge {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      // "speak": "Weather forecast for Monday is high of 62 and low of 42 degrees with a 20% chance of rainWinds will be 5 mph from the northeast",
      // "backgroundImage": "http://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Background-Dark.jpg",
      "body": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "35",
              "items": [
                {
                  "type": "Image",
                  "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png",
                  "size": "stretch"
                }
              ]
            },
            {
              "type": "Column",
              "width": "65",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Monday April 1",
                  "weight": "bolder",
                  "size": "large",
                  "color": "light"
                },
                {
                  "type": "TextBlock",
                  "text": "63 / 42",
                  "size": "medium",
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "isSubtle": true,
                  "text": "20% chance of rain",
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "isSubtle": true,
                  "text": "Winds 5 mph NE",
                  "spacing": "none"
                }
              ]
            }
          ]
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "20",
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "Fri"
                },
                {
                  "type": "Image",
                  "size": "auto",
                  "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "62"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "isSubtle": true,
                  "wrap": false,
                  "text": "52",
                  "spacing": "none"
                }
              ],
              "selectAction": {
                "type": "Action.OpenUrl",
                "title": "View Friday",
                "url": "https://www.wunderground.com/"
              }
            },
            {
              "type": "Column",
              "width": "20",
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "Sat"
                },
                {
                  "type": "Image",
                  "size": "auto",
                  "url": "https://messagecardplayground.azurewebsites.net/assets/Drizzle-Square.png"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "60"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "isSubtle": true,
                  "wrap": false,
                  "text": "48",
                  "spacing": "none"
                }
              ],
              "selectAction": {
                "type": "Action.OpenUrl",
                "title": "View Saturday",
                "url": "https://www.wunderground.com/"
              }
            },
            {
              "type": "Column",
              "width": "20",
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "Sun"
                },
                {
                  "type": "Image",
                  "size": "auto",
                  "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "59"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "isSubtle": true,
                  "wrap": false,
                  "text": "49",
                  "spacing": "none"
                }
              ],
              "selectAction": {
                "type": "Action.OpenUrl",
                "title": "View Sunday",
                "url": "https://www.wunderground.com/"
              }
            },
            {
              "type": "Column",
              "width": "20",
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "Mon"
                },
                {
                  "type": "Image",
                  "size": "auto",
                  "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "wrap": false,
                  "text": "64"
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "center",
                  "isSubtle": true,
                  "wrap": false,
                  "text": "51",
                  "spacing": "none"
                }
              ],
              "selectAction": {
                "type": "Action.OpenUrl",
                "title": "View Monday",
                "url": "https://www.wunderground.com/"
              }
            }
          ]
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'weather-large.js' :
      srcBaseUrl + '/weather-large.js';
  }

  async renderCard(bot, logger) {
    let message = {}; 
    try {
      message = await bot.say('The Weather Large sample demonstrates the following types of controls:\n' +
        '* The ColumnSet and Column elements with the width attribute\n' +
        '* TextBlocks with the size, weight, color, isSubtle, horizontalAlignment, wrap, and spacing attributes\n' +
        '* Image with the size attribute, horizontalAlignment\n' +
        '* Action.OpenUrl\n\n' +
        'We removed the "speak" and "backgroundImage" attributes from the original sample as ' +
        'these properties of the card object are not supported on Webex Teams\n\n' +
        'Cards with images can take a few seconds to render, in the meantime you can see the ' +
        'full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Weather Large example.")
    } catch (err) {
      let msg = 'Failed to render Weather Large card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...doesn\'t it always seem to rain on the weekends?\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Weather Large card. Error:${e.message}`));
  };

};

module.exports = WeatherLarge;