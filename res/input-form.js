/**
 * Adaptive Card Input Form Sample from https://adaptivecards.io/samples/InputForm.html
 * This sample demonstrates the following types of controls
 *   -- Text Input Fields and the style attribute
 *   -- Embedded Images
 *   -- A Submit button
 *
 * The original sample did not have to be modified in any way to render properly on Webex Teams
 * 
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction
 **/

class InputForm {
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
                  "text": "Tell us about yourself",
                  "weight": "bolder",
                  "size": "medium"
                },
                {
                  "type": "TextBlock",
                  "text": "We just need a few more details to get you booked for the trip of a lifetime!",
                  "isSubtle": true,
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "text": "Don't worry, we'll never share or sell your information.",
                  "isSubtle": true,
                  "wrap": true,
                  "size": "small"
                },
                {
                  "type": "TextBlock",
                  "text": "Your name",
                  "wrap": true
                },
                {
                  "type": "Input.Text",
                  "id": "myName",
                  "placeholder": "Last, First"
                },
                {
                  "type": "TextBlock",
                  "text": "Your email",
                  "wrap": true
                },
                {
                  "type": "Input.Text",
                  "id": "myEmail",
                  "placeholder": "youremail@example.com",
                  "style": "email"
                },
                {
                  "type": "TextBlock",
                  "text": "Phone Number"
                },
                {
                  "type": "Input.Text",
                  "id": "myTel",
                  "placeholder": "xxx.xxx.xxxx",
                  "style": "tel"
                }
              ]
            },
            {
              "type": "Column",
              "width": 1,
              "items": [
                {
                  "type": "Image",
                  "url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Diver_Silhouette%2C_Great_Barrier_Reef.jpg",
                  "size": "auto"
                }
              ]
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.Submit",
          "title": "Submit",
          "data": { "cardType": "inputForm" }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'input-form.js' :
      srcBaseUrl + '/input-form.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Input Form sample demonstrates the following types of controls\n' +
        '* Text Input Fields and the style attribute\n* Embedded Images\n* A Submit button\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Input Form example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Input Form card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* Name: ' + inputs.myName + '\n' +
      '* Email: ' + inputs.myEmail + '\n' +
      '* Phone: ' + inputs.myTel;
    bot.say({
      text: msg,
      parentId: attachmentAction.messageId
    })
      .catch((e) => logger.error(`Failed to post Input Form response to space. Error:${e.message}`));
  };

};

module.exports = InputForm;