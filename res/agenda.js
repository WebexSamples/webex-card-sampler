/**
 * Adaptive Card Agenda Sample from https://adaptivecards.io/samples/Agenda.html
 * This sample demonstrates the following types of controls
 *   -- Text block with the isSubtle, spacing and wrap attributes
 *   -- Image with the size and horizontalAlignment attributes
 *   -- backgroundImage with the fillmode and horizontalAlignment attributes
 *   -- ImageSet with the horizontalAlignment attributes
 *
 * We commented out the backgroundImage attribute of the ColumnSet as this is not yet
 * supported on Webex Teams
 **/

class Agenda {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "type": "AdaptiveCard",
      "body": [
        {
          "type": "ColumnSet",
          "horizontalAlignment": "Center",
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "type": "ColumnSet",
                  "horizontalAlignment": "Center",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/LocationGreen_A.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "**Redmond**"
                        },
                        {
                          "type": "TextBlock",
                          "spacing": "None",
                          "text": "8a - 12:30p"
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ],
              "width": 1
            },
            {
              "type": "Column",
              "spacing": "Large",
              "separator": true,
              "items": [
                {
                  "type": "ColumnSet",
                  "horizontalAlignment": "Center",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/LocationBlue_B.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "**Bellevue**"
                        },
                        {
                          "type": "TextBlock",
                          "spacing": "None",
                          "text": "12:30p - 3p"
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ],
              "width": 1
            },
            {
              "type": "Column",
              "spacing": "Large",
              "separator": true,
              "items": [
                {
                  "type": "ColumnSet",
                  "horizontalAlignment": "Center",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/LocationRed_C.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "**Seattle**"
                        },
                        {
                          "type": "TextBlock",
                          "spacing": "None",
                          "text": "8p"
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ],
              "width": 1
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
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "horizontalAlignment": "Left",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/Conflict.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "spacing": "None",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "2:00 PM"
                        }
                      ],
                      "width": "stretch"
                    }
                  ]
                },
                {
                  "type": "TextBlock",
                  "spacing": "None",
                  "text": "1hr",
                  "isSubtle": true
                }
              ],
              "width": "110px"
            },
            {
              "type": "Column",
              // "backgroundImage": {
              //   "url": "http://messagecardplayground.azurewebsites.net/assets/SmallVerticalLineGray.png",
              //   "fillMode": "RepeatVertically",
              //   "horizontalAlignment": "Center"
              // },
              "items": [
                {
                  "type": "Image",
                  "horizontalAlignment": "Center",
                  "url": "http://messagecardplayground.azurewebsites.net/assets/CircleGreen_coffee.png"
                }
              ],
              "width": "auto",
              "spacing": "None"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "**Contoso Campaign Status Meeting**"
                },
                {
                  "type": "ColumnSet",
                  "spacing": "None",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/location_gray.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "Conf Room Bravern-2/9050"
                        }
                      ],
                      "width": "stretch"
                    }
                  ]
                },
                {
                  "type": "ImageSet",
                  "spacing": "Small",
                  "imageSize": "Small",
                  "images": [
                    {
                      "type": "Image",
                      "url": "http://messagecardplayground.azurewebsites.net/assets/person_w1.png",
                      "size": "Small"
                    },
                    {
                      "type": "Image",
                      "url": "http://messagecardplayground.azurewebsites.net/assets/person_m1.png",
                      "size": "Small"
                    },
                    {
                      "type": "Image",
                      "url": "http://messagecardplayground.azurewebsites.net/assets/person_w2.png",
                      "size": "Small"
                    }
                  ]
                },
                {
                  "type": "ColumnSet",
                  "spacing": "Small",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/power_point.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "**Contoso Brand Guidelines** shared by **Susan Metters**"
                        }
                      ],
                      "width": "stretch"
                    }
                  ]
                }
              ],
              "width": 40
            }
          ]
        },
        {
          "type": "ColumnSet",
          "spacing": "None",
          "columns": [
            {
              "type": "Column",
              "width": "110px"
            },
            {
              "type": "Column",
              "backgroundImage": {
                "url": "http://messagecardplayground.azurewebsites.net/assets/SmallVerticalLineGray.png",
                "fillMode": "RepeatVertically",
                "horizontalAlignment": "Center"
              },
              "items": [
                {
                  "type": "Image",
                  "horizontalAlignment": "Center",
                  "url": "http://messagecardplayground.azurewebsites.net/assets/Gray_Dot.png"
                }
              ],
              "width": "auto",
              "spacing": "None"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/car.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "about 45 minutes",
                          "isSubtle": true
                        }
                      ],
                      "width": "stretch"
                    }
                  ]
                }
              ],
              "width": 40
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
                  "spacing": "None",
                  "text": "8:00 PM"
                },
                {
                  "type": "TextBlock",
                  "spacing": "None",
                  "text": "1hr",
                  "isSubtle": true
                }
              ],
              "width": "110px"
            },
            {
              "type": "Column",
              "backgroundImage": {
                "url": "http://messagecardplayground.azurewebsites.net/assets/SmallVerticalLineGray.png",
                "fillMode": "RepeatVertically",
                "horizontalAlignment": "Center"
              },
              "items": [
                {
                  "type": "Image",
                  "horizontalAlignment": "Center",
                  "url": "http://messagecardplayground.azurewebsites.net/assets/CircleBlue_flight.png"
                }
              ],
              "width": "auto",
              "spacing": "None"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "**Alaska Airlines AS1021 flight to Chicago**"
                },
                {
                  "type": "ColumnSet",
                  "spacing": "None",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "Image",
                          "url": "http://messagecardplayground.azurewebsites.net/assets/location_gray.png"
                        }
                      ],
                      "width": "auto"
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "Seattle Tacoma International Airport (17801 International Blvd, Seattle, WA, United States)",
                          "wrap": true
                        }
                      ],
                      "width": "stretch"
                    }
                  ]
                },
                {
                  "type": "Image",
                  "url": "http://messagecardplayground.azurewebsites.net/assets/SeaTacMap.png",
                  "size": "Stretch"
                }
              ],
              "width": 40
            }
          ]
        }
      ],
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.0"
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'agenda.js' :
      srcBaseUrl + '/agenda.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Agenda sample demonstrates the following types of controls\n' +
        '* Text block with the isSubtle, spacing and wrap attributes\n' +
        '* Image with the size and horizontalAlignment attributes\n' +
        '* backgroundImage with the fillmode and horizontalAlignment attributes\n' +
        '* ImageSet with the horizontalAlignment attributes\n' +
        'Full Source Here:' + this.srcUrl);
      await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Agenda example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
      await bot.say('...don\'t forget to bring a coat to Chicago!\n\n' +
        'There is no user input for this card. Post any message if you want to see another card.');
    } catch(e) {
      logger.error(`Something went wrong: ${e}`);
    }
  };

};

module.exports = Agenda;