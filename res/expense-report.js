/**
 * Adaptive Card Expense Report Sample from https://adaptivecards.io/samples/ExpenseReport.html
 * This sample demonstrates the following types of controls
 *   -- Containers, ColumnSets and Columns with the spacing, style, width, 
 *      verticalContentAlignment, isVisible, and bleed attributes
 *   -- Text block with the size, color, weight, isSubtle, spacing and wrap attributes
 *   -- Image with the height, width and altText attributes
 *   -- FactSet with the spacing attribute
 *   -- ToggleVisibility, OpenURL and Submit Actions 
 *
 * We commented out the columns with the Action.ToggleVisibiity elements in them. 
 * Webex Teams will not render cards that use ToggleVisibility
 * 
 * We commented out the verticalContentAlignment and fallbackText attributes of some elements. 
 * Webex Teams will ignore this attribute
 * 
 * We added the cardType attribute to the data object returned by the Action.Submit elements, 
 * so our app can tell which card generated the attachmentAction
  **/

class ExpenseReport {
  constructor(srcBaseUrl, contentType) {
    this.card = {
      "type": "AdaptiveCard",
      "body": [
        {
          "type": "Container",
          "style": "emphasis",
          "items": [
            {
              "type": "ColumnSet",
              "columns": [
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "size": "Large",
                      "weight": "Bolder",
                      "text": "**EXPENSE APPROVAL**"
                    }
                  ],
                  "width": "stretch"
                },
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "Image",
                      "url": "https://adaptivecards.io/content/pending.png",
                      "height": "30px",
                      "altText": "Pending"
                    }
                  ],
                  "width": "auto"
                }
              ]
            }
          ],
          "bleed": true
        },
        {
          "type": "Container",
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
                      "text": "Trip to UAE",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "spacing": "Small",
                      "size": "Small",
                      "weight": "Bolder",
                      "color": "Accent",
                      "text": "[ER-13052](https://adaptivecards.io)"
                    }
                  ],
                  "width": "stretch"
                },
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "ActionSet",
                      "actions": [
                        {
                          "type": "Action.OpenUrl",
                          "title": "EXPORT AS PDF",
                          "url": "https://adaptivecards.io"
                        }
                      ]
                    }
                  ],
                  "width": "auto"
                }
              ]
            },
            {
              "type": "FactSet",
              "spacing": "Large",
              "facts": [
                {
                  "title": "Submitted By",
                  "value": "**Matt Hidinger**  matt@contoso.com"
                },
                {
                  "title": "Duration",
                  "value": "2019/06/19 - 2019/06/25"
                },
                {
                  "title": "Submitted On",
                  "value": "2019/04/14"
                },
                {
                  "title": "Reimbursable Amount",
                  "value": "$ 404.30"
                },
                {
                  "title": "Awaiting approval from",
                  "value": "**Thomas**  thomas@contoso.com"
                },
                {
                  "title": "Submitted to",
                  "value": "**David**   david@contoso.com"
                }
              ]
            }
          ]
        },
        {
          "type": "Container",
          "spacing": "Large",
          "style": "emphasis",
          "items": [
            {
              "type": "ColumnSet",
              "columns": [
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "weight": "Bolder",
                      "text": "DATE"
                    }
                  ],
                  "width": "auto"
                },
                {
                  "type": "Column",
                  "spacing": "Large",
                  "items": [
                    {
                      "type": "TextBlock",
                      "weight": "Bolder",
                      "text": "CATEGORY"
                    }
                  ],
                  "width": "stretch"
                },
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "weight": "Bolder",
                      "text": "AMOUNT"
                    }
                  ],
                  "width": "auto"
                }
              ]
            }
          ],
          "bleed": true
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "06/19",
                  "wrap": true
                }
              ],
              "width": "auto"
            },
            {
              "type": "Column",
              "spacing": "Medium",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Air Travel Expense",
                  "wrap": true
                }
              ],
              "width": "stretch"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "$ 300",
                  "wrap": true
                }
              ],
              "width": "auto"
            }//,
            // Action.ToggleVisibility is not supported by Webex Teams
            // Cards that use this will fail to render
            // {
            //   "type": "Column",
            //   "id": "chevronDown1",
            //   "spacing": "Small",
            //   // "verticalContentAlignment": "Center",  //not supported on Webex Teams
            //   "items": [
            //     {
            //       "type": "Image",
            //       "selectAction": {
            //         "type": "Action.ToggleVisibility",
            //         "title": "collapse",
            //         "targetElements": [
            //           "cardContent1",
            //           "chevronUp1",
            //           "chevronDown1"
            //         ]
            //       },
            //       "url": "https://adaptivecards.io/content/down.png",
            //       "width": "20px",
            //       "altText": "collapsed"
            //     }
            //   ],
            //   "width": "auto"
            // },
            // {
            //   "type": "Column",
            //   "id": "chevronUp1",
            //   "isVisible": false,
            //   "spacing": "Small",
            //   // "verticalContentAlignment": "Center",   // not supported on Webex Teams
            //   "items": [
            //     {
            //       "type": "Image",
            //       "selectAction": {
            //         "type": "Action.ToggleVisibility",
            //         "title": "expand",
            //         "targetElements": [
            //           "cardContent1",
            //           "chevronUp1",
            //           "chevronDown1"
            //         ]
            //       },
            //       "url": "https://adaptivecards.io/content/up.png",
            //       "width": "20px",
            //       "altText": "expanded"
            //     }
            //   ],
            //   "width": "auto"
            // }
          ]
        },
        {
          "type": "Container",
          "id": "cardContent1",
          "isVisible": false,
          "items": [
            {
              "type": "Container",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "* Leg 1 on Tue, Jun 19th, 2019 at 6:00 AM.",
                  "isSubtle": true,
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "text": "* Leg 2 on Tue,Jun 19th, 2019 at 7:15 PM.",
                  "isSubtle": true,
                  "wrap": true
                },
                {
                  "type": "Container",
                  "items": [
                    {
                      "type": "Input.Text",
                      "id": "comment1",
                      "placeholder": "Add your comment here."
                    }
                  ]
                }
              ]
            },
            {
              "type": "Container",
              "items": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "ActionSet",
                          "actions": [
                            {
                              "type": "Action.Submit",
                              "title": "Send",
                              "data": {
                                "cardType": "expenseReport",
                                "id": "_qkQW8dJlUeLVi7ZMEzYVw",
                                "action": "comment",
                                "lineItem": 1
                              }
                            }
                          ]
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ]
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
                  "horizontalAlignment": "Center",
                  "text": "06/19",
                  "wrap": true
                }
              ],
              "width": "auto"
            },
            {
              "type": "Column",
              "spacing": "Medium",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Auto Mobile Expense",
                  "wrap": true
                }
              ],
              "width": "stretch"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "$ 100",
                  "wrap": true
                }
              ],
              "width": "auto"
            }//,
            // Action.ToggleVisibility is not supported by Webex Teams
            // Cards that use this will fail to render
            // {
            //   "type": "Column",
            //   "id": "chevronDown2",
            //   "spacing": "Small",
            //   // "verticalContentAlignment": "Center",  // Not supported on Webex Teams
            //   "items": [
            //     {
            //       "type": "Image",
            //       "selectAction": {
            //         "type": "Action.ToggleVisibility",
            //         "title": "collapse",
            //         "targetElements": [
            //           "cardContent2",
            //           "chevronUp2",
            //           "chevronDown2"
            //         ]
            //       },
            //       "url": "https://adaptivecards.io/content/down.png",
            //       "width": "20px",
            //       "altText": "collapsed"
            //     }
            //   ],
            //   "width": "auto"
            // },
            // {
            //   "type": "Column",
            //   "id": "chevronUp2",
            //   "isVisible": false,
            //   "spacing": "Small",
            //   // "verticalContentAlignment": "Center",   // Not supported on Webex Teams
            //   "items": [
            //     {
            //       "type": "Image",
            //       "selectAction": {
            //         "type": "Action.ToggleVisibility",
            //         "title": "expand",
            //         "targetElements": [
            //           "cardContent2",
            //           "chevronUp2",
            //           "chevronDown2"
            //         ]
            //       },
            //       "url": "https://adaptivecards.io/content/up.png",
            //       "width": "20px",
            //       "altText": "expanded"
            //     }
            //   ],
            //   "width": "auto"
            // }
          ]
        },
        {
          "type": "Container",
          "id": "cardContent2",
          "isVisible": false,
          "items": [
            {
              "type": "Container",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "* Contoso Car Rentrals, Tues 6/19 at 7:00 AM",
                  "isSubtle": true,
                  "wrap": true
                },
                {
                  "type": "Container",
                  "items": [
                    {
                      "type": "Input.Text",
                      "id": "comment2",
                      "placeholder": "Add your comment here."
                    }
                  ]
                }
              ]
            },
            {
              "type": "Container",
              "items": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "ActionSet",
                          "actions": [
                            {
                              "type": "Action.Submit",
                              "title": "Send",
                              "data": {
                                "cardType": "expenseReport",
                                "id": "_qkQW8dJlUeLVi7ZMEzYVw",
                                "action": "comment",
                                "lineItem": 2
                              }
                            }
                          ]
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ]
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
                  "horizontalAlignment": "Center",
                  "text": "06/25",
                  "wrap": true
                }
              ],
              "width": "auto"
            },
            {
              "type": "Column",
              "spacing": "Medium",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Air Travel Expense",
                  "wrap": true
                }
              ],
              "width": "stretch"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "$ 4.30",
                  "wrap": true
                }
              ],
              "width": "auto"
            }//,
            // Action.ToggleVisibility is not supported by Webex Teams
            // Cards that use this will fail to render
            // {
            //   "type": "Column",
            //   "id": "chevronDown3",
            //   "spacing": "Small",
            //   // "verticalContentAlignment": "Center",    // Not supported on Webex Teams
            //   "items": [
            //     {
            //       "type": "Image",
            //       "selectAction": {
            //         "type": "Action.ToggleVisibility",
            //         "title": "collapse",
            //         "targetElements": [
            //           "cardContent3",
            //           "chevronUp3",
            //           "chevronDown3"
            //         ]
            //       },
            //       "url": "https://adaptivecards.io/content/down.png",
            //       "width": "20px",
            //       "altText": "collapsed"
            //     }
            //   ],
            //   "width": "auto"
            // },
            // {
            //   "type": "Column",
            //   "id": "chevronUp3",
            //   "isVisible": false,
            //   "spacing": "Small",
            //   // "verticalContentAlignment": "Center",   // Not supported on Webex Teams
            //   "items": [
            //     {
            //       "type": "Image",
            //       "selectAction": {
            //         "type": "Action.ToggleVisibility",
            //         "title": "expand",
            //         "targetElements": [
            //           "cardContent3",
            //           "chevronUp3",
            //           "chevronDown3"
            //         ]
            //       },
            //       "url": "https://adaptivecards.io/content/up.png",
            //       "width": "20px",
            //       "altText": "expanded"
            //     }
            //   ],
            //   "width": "auto"
            // }
          ]
        },
        {
          "type": "Container",
          "id": "cardContent3",
          "isVisible": false,
          "items": [
            {
              "type": "Container",
              "items": [
                {
                  "type": "Input.Text",
                  "id": "comment3",
                  "placeholder": "Add your comment here."
                }
              ]
            },
            {
              "type": "Container",
              "items": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "ActionSet",
                          "actions": [
                            {
                              "type": "Action.Submit",
                              "title": "Send",
                              "data": {
                                "cardType": "expenseReport",
                                "id": "_qkQW8dJlUeLVi7ZMEzYVw",
                                "action": "comment",
                                "lineItem": 3
                              }
                            }
                          ]
                        }
                      ],
                      "width": "auto"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "ColumnSet",
          "spacing": "Large",
          "separator": true,
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "Right",
                  "text": "Total Expense Amount \t",
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "Right",
                  "text": "Non-reimbursable Amount",
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "horizontalAlignment": "Right",
                  "text": "Advance Amount",
                  "wrap": true
                }
              ],
              "width": "stretch"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "404.30"
                },
                {
                  "type": "TextBlock",
                  "text": "(-) 0.00 \t"
                },
                {
                  "type": "TextBlock",
                  "text": "(-) 0.00 \t"
                }
              ],
              "width": "auto"
            },
            {
              "type": "Column",
              "width": "auto"
            }
          ]
        },
        {
          "type": "Container",
          "style": "emphasis",
          "items": [
            {
              "type": "ColumnSet",
              "columns": [
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "Right",
                      "text": "Amount to be Reimbursed",
                      "wrap": true
                    }
                  ],
                  "width": "stretch"
                },
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "weight": "Bolder",
                      "text": "$ 404.30"
                    }
                  ],
                  "width": "auto"
                },
                {
                  "type": "Column",
                  "width": "auto"
                }
              ]
            }
          ],
          "bleed": true
        },
        // Action.ToggleVisibility is not supported by Webex Teams
        // Cards that use this will fail to render
        // {
        //   "type": "Container",
        //   "items": [
        //     {
        //       "type": "ColumnSet",
        //       "columns": [
        //         {
        //           "type": "Column",
        //           "id": "chevronDown4",
        //           "selectAction": {
        //             "type": "Action.ToggleVisibility",
        //             "title": "show history",
        //             "targetElements": [
        //               "cardContent4",
        //               "chevronUp4",
        //               "chevronDown4"
        //             ]
        //           },
        //           // "verticalContentAlignment": "Center",   // Not Supported on Webex Teams
        //           "items": [
        //             {
        //               "type": "TextBlock",
        //               "horizontalAlignment": "Right",
        //               "color": "Accent",
        //               "text": "Show history",
        //               "wrap": true
        //             }
        //           ],
        //           "width": 1
        //         },
        //         {
        //           "type": "Column",
        //           "id": "chevronUp4",
        //           "isVisible": false,
        //           "selectAction": {
        //             "type": "Action.ToggleVisibility",
        //             "title": "hide history",
        //             "targetElements": [
        //               "cardContent4",
        //               "chevronUp4",
        //               "chevronDown4"
        //             ]
        //           },
        //           // "verticalContentAlignment": "Center",   // Not supported on Webex Teams
        //           "items": [
        //             {
        //               "type": "TextBlock",
        //               "horizontalAlignment": "Right",
        //               "color": "Accent",
        //               "text": "Hide history",
        //               "wrap": true
        //             }
        //           ],
        //           "width": 1
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          "type": "Container",
          "id": "cardContent4",
          "isVisible": false,
          "items": [
            {
              "type": "Container",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "* Expense submitted by **Matt** on Wed, Apr 14th, 2019",
                  "isSubtle": true,
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "text": "* Expense approved by **Thomas** on Thu, Apr 15th, 2019",
                  "isSubtle": true,
                  "wrap": true
                }
              ]
            }
          ]
        },
        {
          "type": "Container",
          "items": [
            {
              "type": "ActionSet",
              "actions": [
                {
                  "type": "Action.Submit",
                  "title": "Approve",
                  "style": "positive",
                  "data": {
                    "cardType": "expenseReport",
                    "id": "_qkQW8dJlUeLVi7ZMEzYVw",
                    "action": "approve"
                  }
                },
                {
                  "type": "Action.ShowCard",
                  "title": "Reject",
                  "style": "destructive",
                  "card": {
                    "type": "AdaptiveCard",
                    "body": [
                      {
                        "type": "Input.Text",
                        "id": "RejectCommentID",
                        "placeholder": "Please specify an appropriate reason for rejection.",
                        "isMultiline": true
                      }
                    ],
                    "actions": [
                      {
                        "type": "Action.Submit",
                        "title": "Send",
                        "data": {
                          "cardType": "expenseReport",
                          "id": "_qkQW8dJlUeLVi7ZMEzYVw",
                          "action": "reject"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ],
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.2"//,
      // fallbackText in the card schema is not supported by Webex Teams and is ignored
      // Set fallback text in the text or markdown attributes in the /messages request body instead
      // "fallbackText": "This card requires Adaptive Cards v1.2 support to be rendered properly."
    };
    this.contentType = contentType;
    this.srcUrl = (srcBaseUrl[srcBaseUrl.length - 1] === '/') ?
      srcBaseUrl + 'expense-report.js' :
      srcBaseUrl + '/expense-report.js';
  }

  async renderCard(bot, logger) {
    try {
      await bot.say('The Expense Report sample demonstrates the following types of controls:\n' +
        '* Containers, ColumnSets and Columns with the spacing, style, width, verticalContentAlignment, isVisible, and bleed attributes\n' +
        '* Text block with the size, color, weight, isSubtle, spacing and wrap attributes\n' +
        '* Image with the height, width and altText attributes\n' +
        '* FactSet with the spacing attribute\n' +
        '* ToggleVisibility, OpenURL and Submit Actions \n\n' +
        'This sample contains the `Action.ToggleVisibility` element and the `veriticalContentAlignment` and ' +
        '`fallback` attributes, which are not supported by Webex Teams.\n\n' +
        'You can see the original source with modifications here: ' + this.srcUrl);
      await bot.say({
        // Fallback text for clients that don't render cards
        markdown: "If you see this your client cannot render our Expense Report example.",
        attachments: [{
          "contentType": this.contentType,
          "content": this.card
        }]
      });
    } catch (err) {
      let msg = 'Failed to render Expense Report card example.';
      logger.error(`${msg} Error:${err.message}`);
      bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
        .catch((e) => logger.error(`Failed to post error message to space. Error:${e.message}`));
    }
  };

  async  handleSubmit(attachmentAction, submitter, bot, logger) {
    let inputs = attachmentAction.inputs;
    let msg = submitter.displayName + ' replied with the following:\n' +
      '* id: ' + inputs.id + '\n' +
      '* action: ' + inputs.action + '\n';
    msg += (inputs.RejectCommentID) ? '* RejectCommentID: ' + inputs.RejectCommentID : '';
    bot.say({
      text: msg,
      parentId: attachmentAction.messageId
    })
      .catch((e) => logger.error(`Failed to post Expense Report card response to space. Error:${e.message}`));
  };
};

module.exports = ExpenseReport;