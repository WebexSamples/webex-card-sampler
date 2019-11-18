/**
 * Adaptive Card Activity UpdateSample from https://adaptivecards.io/samples/ActivityUpdate.html
 * This sample demonstrates the following types of controls:
 * 
 * ColumnSet and Column elements with the width, size, and style attributes
 * Text block with the weight, size, isSubtle, spacing and wrap attributes
 * Input.Text element with the isMultiline and placeholder attributes
 * Input.Date element
 * Image with the size and style attributes
 * Fact Set
 * ShowCard and Submit actions
 *
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction
 **/

class ActivityUpdate {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "TextBlock",
          "text": "Publish Adaptive Card schema",
          "weight": "bolder",
          "size": "medium"
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
                  "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                  "size": "small",
                  "style": "person"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Matt Hidinger",
                  "weight": "bolder",
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "spacing": "none",
                  "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                  "isSubtle": true,
                  "wrap": true
                }
              ]
            }
          ]
        },
        {
          "type": "TextBlock",
          "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
          "wrap": true
        },
        {
          "type": "FactSet",
          "facts": [
            {
              "title": "Board:",
              "value": "Adaptive Card"
            },
            {
              "title": "List:",
              "value": "Backlog"
            },
            {
              "title": "Assigned to:",
              "value": "Matt Hidinger"
            },
            {
              "title": "Due date:",
              "value": "Not set"
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.ShowCard",
          "title": "Set due date",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "Input.Date",
                "id": "dueDate"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK",
                "data": { "cardType": "activityUpdate" }
              }
            ]
          }
        },
        {
          "type": "Action.ShowCard",
          "title": "Comment",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "Input.Text",
                "id": "comment",
                "isMultiline": true,
                "placeholder": "Enter your comment"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK",
                "data": { "cardType": "activityUpdate" }
              }
            ]
          }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'activity-update.js' :
      srcBaseUrl + '/activity-update.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Activity Update sample demonstrates the following types of controls:\n' +
        '* ColumnSet and Column elements with the width, size, and style attributes\n' +
        '* Text block with the weight, size, isSubtle, spacing and wrap attributes\n' +
        '* Input.Text element with the isMultiline and placeholder attributes\n' +
        '* Input.Date element\n' +
        '* Image with the size and style attributes\n' +
        '* Fact Set\n' +
        '* ShowCard and Submit actions\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Activity Update example.");
    } catch (err) {
      let msg = 'Failed to render Activity Update card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* Due Date: ' + inputs.dueDate + '\n' +
      '* Comment: ' + inputs.comment;
    bot.reply(attachmentAction, msg)
      .catch((e) => logger.error(`Failed to post Activity Update response to space. Error:${e.message}`));
  };

};

module.exports = ActivityUpdate;