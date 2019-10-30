/**
 * Adaptive Card Input Form Sample from https://adaptivecards.io/samples/FlightDetails.html
 * This sample demonstrates the following types of controls
 *   -- Image and Background Image
 *   -- Text Blocks with many attributes including size, weight, color, wrap, spacing and horizontalAlignment
 *   -- A Submit button
 *
 * The original sample did not have to be modified in any way to render properly on Webex Teams
 * 
 * A data object was added to the Action.Submit type so our app can tell which card generated 
 * the attachmentAction, and also to detect which button the user chose
 **/

class FlightDetails {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "type": "AdaptiveCard",
      "body": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "type": "Container",
                  "backgroundImage": "http://messagecardplayground.azurewebsites.net/assets/TxP_Background.png",
                  "items": [
                    {
                      "type": "Image",
                      "horizontalAlignment": "Center",
                      "url": "http://messagecardplayground.azurewebsites.net/assets/TxP_Flight.png"
                    }
                  ],
                  "bleed": true
                },
                {
                  "type": "Container",
                  "spacing": "None",
                  "style": "emphasis",
                  "items": [
                    {
                      "type": "TextBlock",
                      "size": "ExtraLarge",
                      "weight": "Lighter",
                      "color": "Accent",
                      "text": "Flight to Paris",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "spacing": "Small",
                      "text": "Delta Air Lines flight 8471",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "spacing": "None",
                      "text": "Confirmation code: ABCDEF",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "spacing": "None",
                      "text": "10 hours 45 minutes",
                      "wrap": true
                    }
                  ],
                  "bleed": true,
                  "height": "stretch"
                }
              ],
              "width": 45,
              "height": "stretch"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "Container",
                  "height": "stretch",
                  "items": [
                    {
                      "type": "ColumnSet",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "size": "ExtraLarge",
                              "weight": "Lighter",
                              "text": "BLR"
                            }
                          ],
                          "width": "auto"
                        },
                        {
                          "type": "Column",
                          "verticalContentAlignment": "Center",
                          "items": [
                            {
                              "type": "Image",
                              "url": "http://messagecardplayground.azurewebsites.net/assets/graydot2x2.png",
                              "width": "10000px",
                              "height": "2px"
                            }
                          ],
                          "width": "stretch"
                        },
                        {
                          "type": "Column",
                          "spacing": "Small",
                          "verticalContentAlignment": "Center",
                          "items": [
                            {
                              "type": "Image",
                              "url": "http://messagecardplayground.azurewebsites.net/assets/smallairplane.png",
                              "height": "16px"
                            }
                          ],
                          "width": "auto"
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "horizontalAlignment": "Right",
                              "size": "ExtraLarge",
                              "weight": "Lighter",
                              "text": "CDG"
                            }
                          ],
                          "width": "auto"
                        }
                      ]
                    },
                    {
                      "type": "ColumnSet",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "size": "Medium",
                              "text": "1:55 AM"
                            }
                          ],
                          "width": 1
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "horizontalAlignment": "Right",
                              "size": "Medium",
                              "text": "8:10 AM"
                            }
                          ],
                          "width": 1
                        }
                      ]
                    },
                    {
                      "type": "ColumnSet",
                      "spacing": "None",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "text": "November 12, 2017",
                              "isSubtle": true,
                              "wrap": true
                            }
                          ],
                          "width": 1
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "horizontalAlignment": "Right",
                              "text": "November 12, 2017",
                              "isSubtle": true,
                              "wrap": true
                            }
                          ],
                          "width": 1
                        }
                      ]
                    },
                    {
                      "type": "ColumnSet",
                      "spacing": "None",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "text": "Bengaluru",
                              "isSubtle": true
                            }
                          ],
                          "width": 1
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "horizontalAlignment": "Right",
                              "text": "Paris",
                              "isSubtle": true
                            }
                          ],
                          "width": 1
                        }
                      ],
                      "height": "stretch"
                    },
                    {
                      "type": "ActionSet",
                      "separator": true,
                      "actions": [
                        {
                          "type": "Action.Submit",
                          "title": "Check in",
                          "style": "positive",
                          "data": {
                            "cardType": "flightDetails",
                            "action": "checkIn"
                          }
                        },
                        {
                          "type": "Action.Submit",
                          "title": "View in calendar",
                          "data": {
                            "cardType": "flightDetails",
                            "action": "viewInCalendar"
                          }
                        }
                      ],
                      "spacing": "Medium"
                    }
                  ]
                }
              ],
              "width": 55
            }
          ],
          "height": "stretch"
        }
      ],
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.0"
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'flight-details.js' :
      srcBaseUrl + '/flight-details.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Flight Details sample demonstrates the following types of controls\n' +
        ' * Image and Background Image\n' +
        '* Text Blocks with many attributes including size, weight, color, wrap, spacing and horizontalAlignment\n' +
        '* A Submit button\n\n' +
        'Cards with images can take a few seconds to render. ' +
        'In the meantime you can see the full source here: ' + this.srcUrl);
      await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Flight Details example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Flight Details card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* action: ' + inputs.action;
    bot.say({
      text: msg,
      parentId: attachmentAction.messageId
    })
      .catch((e) => logger.error(`Failed to post Flight Details card response to space. Error:${e.message}`));
  };

};

module.exports = FlightDetails;