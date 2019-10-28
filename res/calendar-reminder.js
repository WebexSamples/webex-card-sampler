/**
 * Adaptive Card Agenda Sample from https://adaptivecards.io/samples/CalendarReminder.html
 * This sample demonstrates the following types of controls
 *   -- Text block with the size, weight, isSubtle, spacing and wrap attributes
 *   -- Input.ChoiceSet with the style attribute
 *   -- Action.Submit buttons
 *
 * We commented out the speak attribute of the card as this is not yet
 * supported on Webex Teams

 * We modified the data fields in the Action.Submit buttons to inlcude the cardType attribute
 * which our app uses to provide an appropriate response.
 **/

class CalendarReminder {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      // "speak": "Your  meeting about \"Adaptive Card design session\" is starting at 12:30pmDo you want to snooze  or do you want to send a late notification to the attendees?",
      "body": [
        {
          "type": "TextBlock",
          "text": "Adaptive Card design session",
          "size": "large",
          "weight": "bolder"
        },
        {
          "type": "TextBlock",
          "text": "Conf Room 112/3377 (10)",
          "isSubtle": true
        },
        {
          "type": "TextBlock",
          "text": "12:30 PM - 1:30 PM",
          "isSubtle": true,
          "spacing": "none"
        },
        {
          "type": "TextBlock",
          "text": "Snooze for"
        },
        {
          "type": "Input.ChoiceSet",
          "id": "snooze",
          "style": "compact",
          "value": "5",
          "choices": [
            {
              "title": "5 minutes",
              "value": "5"
            },
            {
              "title": "15 minutes",
              "value": "15"
            },
            {
              "title": "30 minutes",
              "value": "30"
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.Submit",
          "title": "Snooze",
          "data": {
            "cardType": "calendarReminder",
            "action": "snooze"
          }
        },
        {
          "type": "Action.Submit",
          "title": "I'll be late",
          "data": {
            "cardType": "calendarReminder",
            "action": "late"
          }
        }
      ]
    }
    ;
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + ' calendar-reminder.js' :
      srcBaseUrl + '/calendar-reminder.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Calendar Reminder sample demonstrates the following types of controls\n' +
        '* Text block with the size, weight, isSubtle, spacing and wrap attributes\n' +
        '* Input.ChoiceSet with the style attribute\n' +
        '* Action.Submit buttons\n' +
        'Full Source Here:' + this.srcUrl);
      bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Calendar Reminder example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch(e) {
      logger.error(`Something went wrong: ${e}`);
    }
  };

  async handleSubmit(attachmentAction, submitter, bot) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* action: ' + inputs.action;
    bot.say({
      text: msg,
      parentId: attachmentAction.messageId
    });
  };  


};

module.exports = CalendarReminder;