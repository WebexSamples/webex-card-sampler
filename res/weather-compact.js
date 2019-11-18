/**
 * Adaptive Card Weather Compact Sample from https://adaptivecards.io/samples/WeatherCompact.html
 * This sample demonstrates the following types of controls:
 * 
 * The ColumnSet and Column elements with the width attribute
 * TextBlocks with the size, isSubtle, horizontalAlignment, and spacing attributes
 * Image with the size attribute, horizontalAlignment
 *
 * We removed the "speak" attribute from the original sample as this property of the 
 * card object is not supported on Webex Teams
 **/

class WeatherCompact {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      //"speak": "The forecast for Seattle January 20 is mostly clear with a High of 51 degrees and Low of 40 degrees",
      "body": [
        {
          "type": "TextBlock",
          "text": "Seattle, WA",
          "size": "large",
          "isSubtle": true
        },
        {
          "type": "TextBlock",
          "text": "September 18, 7:30 AM",
          "spacing": "none"
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "Image",
                  "url": "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png",
                  "size": "small"
                }
              ]
            },
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "42",
                  "size": "extraLarge",
                  "spacing": "none"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "°F",
                  "weight": "bolder",
                  "spacing": "small"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Hi 51",
                  "horizontalAlignment": "left"
                },
                {
                  "type": "TextBlock",
                  "text": "Lo 40",
                  "horizontalAlignment": "left",
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
      srcBaseUrl + 'weather-compact.js' :
      srcBaseUrl + '/weather-compact.js';
  }

  async renderCard(bot, logger) {
    let message = {};
    try {
      message = await bot.say('The Weather Compact sample demonstrates the following types of controls:\n' +
        '* The Container, ColumnSet and Column elements with the width, separator and spacing attributes\n' +
        '* TextBlocks with the size, horizontalAlignment, wrap, spacing, and weight attributes\n' +
        '* Image with the size attribute, horizontalAlignment\n' +
        'We removed the "speak" attribute from the original sample as this property of the \n' +
        'card object is not supported on Webex Teams\n' +
        'Cards with images can take a few seconds to render, in the meantime you can see the full source with the modifications here: ' + this.srcUrl);
      message = await bot.sendCard(this.card, "If you see this your client cannot render our Weather Compact example.");
    } catch (err) {
      let msg = 'Failed to render Weather Compact card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
    bot.reply(message, '...you might want a jacket in the morning.\n\n' +
        'There is no user input for this card. Post any message to me if you want to see another card.')
      .catch((e) => logger.error(`Failed to post follow-up to Weather Compact card. Error:${e.message}`));
  };

};

module.exports = WeatherCompact;