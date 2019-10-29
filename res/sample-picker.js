/**
 * This is the top level card that allows a user to select a card sample to experience
 **/

class SamplePicker {
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
          "text": "Try a sample Adaptive Card",
          "horizontalAlignment": "Center"
        },
        {
          "type": "TextBlock",
          "text": "Please pick the sample card you'd like to try:"
        },
        {
          "type": "Input.ChoiceSet",
          "id": "cardSelection",
          "choices": [
            {
              "title": "Activity Update",
              "value": "activityUpdate"
            },
            {
              "title": "Agenda",
              "value": "agenda"
            },
            {
              "title": "Calendar Reminder",
              "value": "calendarReminder"
            },
            {
              "title": "Input Form",
              "value": "inputForm"
            },
            {
              "title": "Flight Details",
              "value": "flightDetails"
            },
            {
              "title": "Flight Itinerary",
              "value": "flightItinerary"
            },
            {
              "title": "Flight Update",
              "value": "flightUpdate"
            },
            {
              "title": "Food Order",
              "value": "foodOrder"
            },

            {
              "title": "Stock Update",
              "value": "stockUpdate"
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.Submit",
          "title": "Submit",
          "data": { "cardType": "samplePicker" }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'sample-picker.js' :
      srcBaseUrl + '/sample-picker.js';
  }

  async renderCard(bot, logger) {
    bot.say({
      // Fallback text for clients that don't render cards
      markdown: "If you see this your client cannot render our Sample Picker Client.",
      attachments: [{
        "contentType": this.contentType,
        "content": this.card
      }]
    })
      .catch((err) => {
        let msg = 'Failed to render Sample Picker card.';
        logger.error(`${msg} Error:${err.message}`);
        bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
          .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
      });
  };

};

module.exports = SamplePicker;