/**
 * Adaptive Card Input Sample from https://adaptivecards.io/samples/Inputs.html
 * This sample demonstrates the following types of controls:
 * 
 * Text Blocks with size, weight, and horizontalAlignment attributes
 * Input.Text with the placeholder, isMultiline, maxLength, and style attributes
 * Input.Number with the placholder, min, max and value attributes
 * Input.Date with the placeholder and value attributes
 * Input.Time with the placeholder and value attributes
 * Input.ChoiceSet with the style, value and isMultiSelect attributes
 * Input.Toggle with the title, valueOn and valueOff attributes
 * Action.ShowCard and Action.Submit elements
 *
 * The original sample did not have to be modified in any way to render properly on Webex Teams
 * 
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction
 * We also modified the return values on the color picker inputs to return colors instead of numbers
 **/

class Input {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "TextBlock",
          "size": "medium",
          "weight": "bolder",
          "text": "Input.Text elements",
          "horizontalAlignment": "center"
        },
        {
          "type": "Input.Text",
          "placeholder": "Name",
          "style": "text",
          "maxLength": 0,
          "id": "SimpleVal"
        },
        {
          "type": "Input.Text",
          "placeholder": "Homepage",
          "style": "url",
          "maxLength": 0,
          "id": "UrlVal"
        },
        {
          "type": "Input.Text",
          "placeholder": "Email",
          "style": "email",
          "maxLength": 0,
          "id": "EmailVal"
        },
        {
          "type": "Input.Text",
          "placeholder": "Phone",
          "style": "tel",
          "maxLength": 0,
          "id": "TelVal"
        },
        {
          "type": "Input.Text",
          "placeholder": "Comments",
          "style": "text",
          "isMultiline": true,
          "maxLength": 0,
          "id": "MultiLineVal"
        },
        {
          "type": "Input.Number",
          "placeholder": "Quantity",
          "min": -5,
          "max": 5,
          "value": 1,
          "id": "NumVal"
        },
        {
          "type": "Input.Date",
          "placeholder": "Due Date",
          "id": "DateVal",
          "value": "2017-09-20"
        },
        {
          "type": "Input.Time",
          "placeholder": "Start time",
          "id": "TimeVal",
          "value": "16:59"
        },
        {
          "type": "TextBlock",
          "size": "medium",
          "weight": "bolder",
          "text": "Input.ChoiceSet",
          "horizontalAlignment": "center"
        },
        {
          "type": "TextBlock",
          "text": "What color do you want? (compact)"
        },
        {
          "type": "Input.ChoiceSet",
          "id": "CompactSelectVal",
          "style": "compact",
          "value": "Red",
          //"value": "1",
          "choices": [
            {
              "title": "Red",
              "value": "Red"
              //"value": "1"
            },
            {
              "title": "Green",
              "value": "Green"
              //"value": "2"
            },
            {
              "title": "Blue",
              "value": "Blue"
              //"value": "3"
            }
          ]
        },
        {
          "type": "TextBlock",
          "text": "What color do you want? (expanded)"
        },
        {
          "type": "Input.ChoiceSet",
          "id": "SingleSelectVal",
          "style": "expanded",
          "value": "Red",
          //"value": "1",
          "choices": [
            {
              "title": "Red",
              "value": "Red"
              //"value": "1"
            },
            {
              "title": "Green",
              "value": "Green"
              //"value": "2"
            },
            {
              "title": "Blue",
              "value": "Blue"
              //"value": "3"
            }
          ]
        },
        {
          "type": "TextBlock",
          "text": "What colors do you want? (multiselect)"
        },
        {
          "type": "Input.ChoiceSet",
          "id": "MultiSelectVal",
          "isMultiSelect": true,
          "value": "Red,Blue",
          //"value": "1,3",
          "choices": [
            {
              "title": "Red",
              "value": "Red"
              //"value": "1"
            },
            {
              "title": "Green",
              "value": "Green"
              //"value": "2"
            },
            {
              "title": "Blue",
              "value": "Blue"
              //"value": "3"
            }
          ]
        },
        {
          "type": "TextBlock",
          "size": "medium",
          "weight": "bolder",
          "text": "Input.Toggle",
          "horizontalAlignment": "center"
        },
        {
          "type": "Input.Toggle",
          "title": "I accept the terms and conditions (True/False)",
          "valueOn": "true",
          "valueOff": "false",
          "id": "AcceptsTerms"
        },
        {
          "type": "Input.Toggle",
          "title": "Red cars are better than other cars",
          "valueOn": "RedCars",
          "valueOff": "NotRedCars",
          "id": "ColorPreference"
        }
      ],
      "actions": [
        {
          "type": "Action.Submit",
          "title": "Submit",
          "data": {
            "cardType": "input",
            "id": "1234567890"    // not sure what info this conveys, but it was in the sample
          }
        },
        {
          "type": "Action.ShowCard",
          "title": "Show Card",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "Input.Text",
                "placeholder": "enter comment",
                "style": "text",
                "maxLength": 0,
                "id": "CommentVal"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK",
                "data": { "cardType": "input" }
              }
            ]
          }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'input.js' :
      srcBaseUrl + '/input.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Input sample demonstrates the following types of controls:\n' +
        '* Text Blocks with size, weight, and horizontalAlignment attributes\n' +
        '* Input.Text with the placeholder, isMultiline, maxLength, and style attributes\n' +
        '* Input.Number with the placholder, min, max and value attributes\n' +
        '* Input.Date with the placeholder and value attributes\n' +
        '* Input.Time with the placeholder and value attributes\n' +
        '* Input.ChoiceSet with the style, value and isMultiSelect attributes\n' +
        '* Input.Toggle with the title, valueOn and valueOff attributes\n' +
        '* Action.ShowCard and Action.Submit elements\n\n' +
        'You can see the full source here: ' + this.srcUrl);
      await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Input example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Input card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n';
    delete inputs.cardType;  // We use this internally to get to the right handler
    for (var key in inputs) {
      msg += inputs[key] ? `* ${key}: ${inputs[key]}\n` : ''; 
    }
    bot.say({
      text: msg,
      parentId: attachmentAction.messageId
    })
      .catch((e) => logger.error(`Failed to post Input response to space. Error:${e.message}`));
  };
};

module.exports = Input;