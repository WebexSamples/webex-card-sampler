/**
 * This is the top level card that allows a user to enter custom json to render
 **/

class CustomJsonInput {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "TextBlock",
          "size": "Medium",
          "weight": "Bolder",
          "text": "Custom JSON Design Input",
          "horizontalAlignment": "Center"
        },
        {
          "type": "TextBlock",
          "text": "In addition to showing you some pre-built samples, I can submit your custom design for you.  This helps to see how it will render on different clients, or to see what type of payload your app will need to process if a user hits an Action.Submit button.",
          "wrap": true
        },
        {
          "type": "TextBlock",
          "text": "One way to get design JSON to paste here is to use the \"Copy Card JSON\" button from the [Buttons and Cards Designer](https://developer.webex.com/buttons-and-cards-designer). "
        },
        {
          "type": "Container",
          "items": [
            {
              "type": "Input.Text",
              "placeholder": "Paste card JSON here",
              "id": "cardJson",
              "isMultiline": true,
              "height": "stretch"
            }
          ],
          "minHeight": "266px"
        },
        {
          "type": "TextBlock",
          "text": "You can also send me a message with files to render.  I'll attempt to render any file as if it is the design for a card."
        },
      ],
      "actions": [
        {
          "type": "Action.Submit",
          "title": "Display My Card",
          "data": {
            "cardType": "customJsonInput",
            "nextAction": "submitJson"
          }
        },
        {
          "type": "Action.Submit",
          "title": "Go Back To The Built In Samples",
          "data": {
            "cardType": "customJsonInput",
            "nextAction": "samplePicker"
          }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'custom-json-input.js' :
      srcBaseUrl + '/custom-json-input.js';
  }

  async renderCard(bot, logger) {
    if (bot.isGroup) {
      this.card.body.push(        {
        "type": "TextBlock",
        "text": "Don't forget to at-mention me in the message with your files!"
      });
    }

    bot.sendCard(this.card, "If you see this your client cannot render our Custom JSON Input card.")
      .catch((err) => {
        let msg = 'Failed to render Custom JSON Input card.';
        logger.error(`${msg} Error:${err.message}`);
        bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
          .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
      });
  };

};

module.exports = CustomJsonInput;