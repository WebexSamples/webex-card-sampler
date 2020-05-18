/**
 * The Food Order sample from https://developer-portal-intb.ciscospark.com/buttons-and-cards-designer/food_order
 * This sample demonstrates the following types of controls:
 * 
 * Text block with the weight, size, isSubtle, and wrap attributes
 * ImageSet with the imageSize attribute
 * Image
 * Input.ChoiceSet with the style attribute
 * Input.Text with the isMultiline and placeholder attributes
 * Action.ShowCard and Action.Sumbit
 **/

class FoodOrder {
  constructor(srcBaseUrl, contentType) {
    this.card = require('./design/food_order.json');
    this.contentType = contentType;
    this.srcUrl = `${srcBaseUrl}/food_order`;
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
