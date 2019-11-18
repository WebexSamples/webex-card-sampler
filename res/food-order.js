/**
 * Adaptive Card Food Order Sample from https://adaptivecards.io/samples/FoodOrder.html
 * This sample demonstrates the following types of controls:
 * 
 * Text block with the weight, size, isSubtle, and wrap attributes
 * ImageSet with the imageSize attribute
 * Image
 * Input.ChoiceSet with the style attribute
 * Input.Text with the isMultiline and placeholder attributes
 * Action.ShowCard and Action.Sumbit
 *
 * A cardType attribute was added to the data object in the Action.Submit element
 * so our app can tell which card generated the attachmentAction
 **/

class FoodOrder {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "TextBlock",
          "text": "Your registration is almost complete",
          "size": "medium",
          "weight": "bolder"
        },
        {
          "type": "TextBlock",
          "text": "What type of food do you prefer?",
          "wrap": true
        },
        {
          "type": "ImageSet",
          "imageSize": "medium",
          "images": [
            {
              "type": "Image",
              "url": "http://contososcubademo.azurewebsites.net/assets/steak.jpg"
            },
            {
              "type": "Image",
              "url": "http://contososcubademo.azurewebsites.net/assets/chicken.jpg"
            },
            {
              "type": "Image",
              "url": "http://contososcubademo.azurewebsites.net/assets/tofu.jpg"
            }
          ]
        }
      ],
      "actions": [
        {
          "type": "Action.ShowCard",
          "title": "Steak",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "TextBlock",
                "text": "How would you like your steak prepared?",
                "size": "medium",
                "wrap": true
              },
              {
                "type": "Input.ChoiceSet",
                "id": "SteakTemp",
                "style": "expanded",
                "choices": [
                  {
                    "title": "Rare",
                    "value": "rare"
                  },
                  {
                    "title": "Medium-Rare",
                    "value": "medium-rare"
                  },
                  {
                    "title": "Well-done",
                    "value": "well-done"
                  }
                ]
              },
              {
                "type": "Input.Text",
                "id": "SteakOther",
                "isMultiline": true,
                "placeholder": "Any other preparation requests?"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK",
                "data": {
                  "cardType": "foodOrder",
                  "FoodChoice": "Steak"
                }
              }
            ]
          }
        },
        {
          "type": "Action.ShowCard",
          "title": "Chicken",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "TextBlock",
                "text": "Do you have any allergies?",
                "size": "medium",
                "wrap": true
              },
              {
                "type": "Input.ChoiceSet",
                "id": "ChickenAllergy",
                "style": "expanded",
                "isMultiSelect": true,
                "choices": [
                  {
                    "title": "I'm allergic to peanuts",
                    "value": "peanut"
                  }
                ]
              },
              {
                "type": "Input.Text",
                "id": "ChickenOther",
                "isMultiline": true,
                "placeholder": "Any other preparation requests?"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK",
                "data": {
                  "cardType": "foodOrder",
                  "FoodChoice": "Chicken"
                }
              }
            ]
          }
        },
        {
          "type": "Action.ShowCard",
          "title": "Tofu",
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "type": "TextBlock",
                "text": "Would you like it prepared vegan?",
                "size": "medium",
                "wrap": true
              },
              {
                "type": "Input.Toggle",
                "id": "Vegetarian",
                "title": "Please prepare it vegan",
                "valueOn": "vegan",
                "valueOff": "notVegan"
              },
              {
                "type": "Input.Text",
                "id": "VegOther",
                "isMultiline": true,
                "placeholder": "Any other preparation requests?"
              }
            ],
            "actions": [
              {
                "type": "Action.Submit",
                "title": "OK",
                "data": {
                  "cardType": "foodOrder",
                  "FoodChoice": "Vegetarian"
                }
              }
            ]
          }
        }
      ]
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'food-order.js' :
      srcBaseUrl + '/food-order.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Food Order sample demonstrates the following types of controls:\n' +
        '* Text block with the weight, size, isSubtle, and wrap attributes\n' +
        '* ImageSet with the imageSize attribute\n' +
        '* Image\n' +
        '* Input.ChoiceSet with the style attribute\n' +
        '* Input.Text with the isMultiline and placeholder attributes\n' +
        '* Action.ShowCard and Action.Sumbit\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.sendCard(this.card, "If you see this your client cannot render our Food Order example.");
    } catch (err) {
      let msg = 'Failed to render Food Order card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* FoodChoice: ' + inputs.FoodChoice + '\n';
    switch (inputs.FoodChoice) {
      case ("Chicken"):
        msg += (inputs.ChickenAllergy) ? '* ChickenAllergy: ' + inputs.ChickenAllergy + '\n' : '';
        msg += (inputs.ChickenOther) ? '* ChickenOther: ' + inputs.ChickenOther + '\n' : '';
        break;

      case ("Steak"):
        msg += (inputs.SteakTemp) ? '* SteakTemp: ' + inputs.SteakTemp + '\n' : '';
        msg += (inputs.SteakOther) ? '* SteakOther: ' + inputs.SteakOther + '\n' : '';
        break;

      case ("Vegetarian"):
        msg += (inputs.Vegetarian) ? '* Vegetarian: ' + inputs.Vegetarian + '\n' : '';
        msg += (inputs.VegOther) ? '* VegOther: ' + inputs.VegOther + '\n' : '';
        break;

      default:
        msg = submitter.displayName +
          ' replied but we got an unexpected foodType value:' + inputs.foodType;
        bot.say({
          text: msg,
          parentId: attachmentAction.messageId
        })
          .catch((e) => logger.error(`Failed to post error msg after a Food Choice card response. Error:${e.message}`));
        return;
    }
    bot.reply(attachmentAction, msg)
      .catch((e) => logger.error(`Failed to post Food Choice response to space. Error:${e.message}`));
  };

};

module.exports = FoodOrder;