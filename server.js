/*
Cisco Webex Bot to demonstrate the Webex Teams Card samples

This bot is built on the webex-node-bot-framework
https://github.com/WebexSamples/webex-node-bot-framework

This framework provides many conveniences for building
a Webex Teams bot in node.js and all functions with names
like bot.* and framework.* are processed by the framework.
See the framework's readme for more details on how it works
*/
/*jshint esversion: 6 */  // Help out our linter

// When running locally read environment variables from a .env file
require('dotenv').config();

// Print out some details about the environment we are running in
const package_version = require('./package.json').version;
console.log(`Running app version: ${package_version}`);
console.log(`Running node version: ${process.version}`);

var Framework = require('webex-node-bot-framework');
var bodyParser = require('body-parser');
var request = require("request");
var express = require('express');
var app = express();
logger = require('./logger');


// Object for determining full message size of an adaptive card
const CardSize = require('./card-size');
const cardSize = new CardSize();

// Configure the Framework bot for the environment we are running in
var frameworkConfig = {};
var cardsConfig = {};
if ((process.env.TOKEN) &&
  (process.env.PORT) && (process.env.CARD_CONENT_TYPE)) {
  frameworkConfig.token = process.env.TOKEN;
  frameworkConfig.port = process.env.PORT;
  // Adaptive Card with images can take a long time to render
  // Extend the timeout when waiting for a webex API request to return
  frameworkConfig.requestTimeout = 75000;

  // Read the card schema and URL for the source example from environment
  cardsConfig.srcBaseUrl = process.env.CARD_SRC_BASE_URL;
  cardsConfig.contentType = process.env.CARD_CONENT_TYPE;
} else {
  logger.error('Cannot start server.  Missing required environment varialbles TOKEN or CARD_CONTENT_TYPE');
  process.exit();
}


// The admin user or 'admin space' gets extra notifications about bot 
// usage and feedback. If both are set we prefer the space
let adminEmail = '';
let adminSpaceId = '';
let adminsBot = null;
let botName = '';
let botEmail = 'the bot';
let warnCardSize = 60000;
if (process.env.ADMIN_SPACE_ID) {
  adminSpaceId = process.env.ADMIN_SPACE_ID;
} else if (process.env.ADMIN_EMAIL) {
  adminEmail = process.env.ADMIN_EMAIL;
} else {
  logger.warn('No ADMIN_SPACE_ID or ADMIN_EMAIL environment variable. \n' +
    'Will not notify anyone about bot activity');
}
// We can use the bot's email and name from environment variables or
// discover them after our first spawn
if (process.env.BOTNAME) {botName = process.env.BOTNAME;}
if (process.env.BOT_EMAIL) {botEmail = process.env.BOT_EMAIL;}

// We can warn about cards that are too big.  If set read the warning size from env
if (process.env.WARNING_CARD_SIZE) {warnCardSize = process.env.WARNING_CARD_SIZE;}

// Card data can be big!
app.use(bodyParser.json({limit: '50mb'}));

// init framework
var framework = new Framework(frameworkConfig);
framework.start();
framework.messageFormat = 'markdown';
logger.info("Starting framework, please wait...");

// Read in the sample cards we'll be using
SamplePicker = require('./res/sample-picker.js');
let samplePicker = new SamplePicker(cardsConfig.srcBaseUrl, cardsConfig.contentType);
CustomJsonInput = require('./res/custom-json-input.js');
let customJsonInput = new CustomJsonInput(cardsConfig.srcBaseUrl, cardsConfig.contentType);
ActivityUpdate = require('./res/activity-update.js');
let activityUpdate = new ActivityUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Agenda = require('./res/agenda.js');
let agenda = new Agenda(cardsConfig.srcBaseUrl, cardsConfig.contentType);
CalendarReminder = require('./res/calendar-reminder.js');
let calendarReminder = new CalendarReminder(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FlightDetails = require('./res/flight-details.js');
let flightDetails = new FlightDetails(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FlightItinerary = require('./res/flight-itinerary.js');
let flightItinerary = new FlightItinerary(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FlightUpdate = require('./res/flight-update.js');
let flightUpdate = new FlightUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FoodOrder = require('./res/food-order.js');
let foodOrder = new FoodOrder(cardsConfig.srcBaseUrl, cardsConfig.contentType);
ImageGallery = require('./res/image-gallery.js');
let imageGallery = new ImageGallery(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Input = require('./res/input.js');
let input = new Input(cardsConfig.srcBaseUrl, cardsConfig.contentType);
InputForm = require('./res/input-form.js');
let inputForm = new InputForm(cardsConfig.srcBaseUrl, cardsConfig.contentType);
ProductAnnouncement = require('./res/product-announcement.js');
let productAnnouncement = new ProductAnnouncement(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Restaurant = require('./res/restaurant.js');
let restaurant = new Restaurant(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Solitaire = require('./res/solitaire.js');
let solitaire = new Solitaire(cardsConfig.srcBaseUrl, cardsConfig.contentType);
SportingEvent = require('./res/sporting-event.js');
let sportingEvent = new SportingEvent(cardsConfig.srcBaseUrl, cardsConfig.contentType);
StockUpdate = require('./res/stock-update.js');
let stockUpdate = new StockUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);
WeatherCompact = require('./res/weather-compact.js');
let weatherCompact = new WeatherCompact(cardsConfig.srcBaseUrl, cardsConfig.contentType);
WeatherLarge = require('./res/weather-large.js');
let weatherLarge = new WeatherLarge(cardsConfig.srcBaseUrl, cardsConfig.contentType);

framework.on("initialized", function () {
  logger.info("Framework initialized successfully! [Press CTRL-C to quit]");
  if ((adminSpaceId) && (!adminsBot)) {
    // Our admin space was not one of the ones found during initialization
    logger.verbose('Attempting to force spawn of the bot for the Admin space');
    framework.webex.memberships.list({
      roomId: adminSpaceId,
      personId: framework.person.id
    })
      .then((memberships) => {
        if ((memberships.items) && (memberships.items.length)) {
          framework.spawn(memberships.items[0]);
        }
      })
      .catch((e) => logger.error(`Failed trying to force spawn of admin bot: ${e.message}`));
  }
});

// Called when the framework discovers a space our bot is in
// At startup, (before the framework is fully initialized), this
// is called when the framework discovers an existing spaces.
// After initialization, if our bot is added to a new space the 
// framework processes the membership:created event, creates a
// new bot object and generates this event with the addedById param
// The framework can also "lazily" discover older spaces that it missed
// during startup when any kind of activity occurs there.  In these
// cases addedById will always be null
// TL;DR we use the addedById param to see if this is a new space for our bot
framework.on('spawn', function (bot, id, addedById) {
  // Do some housekeeping if the bot for our admin space hasn't spawned yet
  if (!adminsBot) {
    tryToInitAdminBot(bot, framework);
  }
  
  // See if this instance is the 1-1 space with the admin
  if ((!adminsBot) && (adminEmail) && (bot.isDirect) &&
    (bot.isDirectTo.toLocaleLowerCase() === adminEmail.toLocaleLowerCase())) {
    adminsBot = bot;
  }

  if (!addedById) {
    // Framework discovered an existing space with our bot, log it
    if (!framework.initialized) {
      logger.info(`During startup framework spawned bot in existing room: ${bot.room.title}`);
    } else {
      logger.info(`Bot object spawn() in existing room: "${bot.room.title}" ` +
        `where activity has occured since our server started`);
    }
  } else {
    logger.info(`Our bot was added to a new room: ${bot.room.title}`);
    if (adminsBot) {
      adminsBot.say(`${botName} was added to a space: ${bot.room.title}`)
        .catch((e) => logger.error(`Failed to update to Admin about a new space our bot is in. Error:${e.message}`));
    }
    showHelp(bot);
  }
});

// Respond to message input
var responded = false;

// A secret for our admin only
framework.hears('getAdminStats', function (bot) {
  logger.info('Processing getAdminStats Request for ' + bot.isDirectTo);
  if (adminEmail === bot.isDirectTo) {
    updateAdmin(`${botName} has been added to the following spaces:`, true);
  } else {
    bot.say('Unauthorized Request')
      .catch((e) => logger.error(`Failed to post Unauthorized Request message to space. Error:${e.message}`));
  }
  responded = true;
});

// All bots should respond to help!
framework.hears(/help/i, function (bot) {
  responded = true;
  showHelp(bot);
});

// send an the sample card in response to any input without files
framework.hears(/.*/, function (bot, trigger) {
  if ((!responded) && (!trigger.message.files)) {
    logger.info(`Processing a message "${trigger.message.text}" from space "${bot.room.title}".`);
    samplePicker.renderCard(bot, logger);
  }
  responded = false;
});

// If files were sent, try to render them as cards
framework.on('files', function (bot, trigger) {
  let response = 'Will attempt to render your message file attachments as cards';
  if (trigger.text) {
    response += ", while ignoring any message text...";
  } else {
    response += '...';
  }
  response += 'Don\'t forget! You can send me any text message to get back to the sample picker.';
  logger.info(`Processing a message "${trigger.message.text}" from space "${bot.room.title}" with files: ${trigger.message.files}`);
  bot.reply(trigger.message, response)
    .then(() => renderJsonFileRequest(bot, trigger))
    .catch((e) => logger.error(`Failed to respond to posted files: ${e.message}`));
});

// Process an Action.Submit button press
framework.on('attachmentAction', function (bot, trigger) {
  if (trigger.type != 'attachmentAction') {
    throw new Error(`Invaid trigger type: ${trigger.type} in attachmentAction handler`);
  }
  let attachmentAction = trigger.attachmentAction;
  if (attachmentAction.inputs.cardType === 'samplePicker') {
    if (attachmentAction.inputs.customRequested) {
      customJsonInput.renderCard(bot, logger);
    } else {
      renderSelectedCard(bot, attachmentAction.inputs.cardSelection);
    }
  } else {
    processSampleCardResponse(bot, attachmentAction, trigger.person);
  }
  logger.verbose(`Got an attachmentAction:\n${JSON.stringify(attachmentAction, null, 2)}`);
});

// Render the selected sample
function renderSelectedCard(bot, cardSelection) {
  logger.info(`Got a request to render the ${cardSelection} card from space: ${bot.room.title}`);
  switch (cardSelection) {
    case ('activityUpdate'):
      activityUpdate.renderCard(bot, logger);
      break;

    case ('agenda'):
      agenda.renderCard(bot, logger);;
      break;

    case ('calendarReminder'):
      calendarReminder.renderCard(bot, logger);
      break;

    case ('expenseReport'):
      expenseReport.renderCard(bot, logger);
      break;

    case ('input'):
      input.renderCard(bot, logger);
      break;

    case ('inputForm'):
      inputForm.renderCard(bot, logger);
      break;

    case ('flightDetails'):
      flightDetails.renderCard(bot, logger);
      break;

    case ('flightItinerary'):
      flightItinerary.renderCard(bot, logger);
      break;

    case ('flightUpdate'):
      flightUpdate.renderCard(bot, logger);
      break;

    case ('imageGallery'):
      imageGallery.renderCard(bot, logger);
      break;

    case ('foodOrder'):
      foodOrder.renderCard(bot, logger);
      break;
    
    case('productAnnouncement'):
      productAnnouncement.renderCard(bot, logger);
      break;
    
    case ("restaurant"):
      restaurant.renderCard(bot, logger);
      break;

    case ('solitaire'):
      solitaire.renderCard(bot, logger);
      break;

    case ('sportingEvent'):
      sportingEvent.renderCard(bot, logger);
      break;

    case ('stockUpdate'):
      stockUpdate.renderCard(bot, logger);
      break;

    case ('weatherCompact'):
      weatherCompact.renderCard(bot, logger);
      break;

    case ('weatherLarge'):
      weatherLarge.renderCard(bot, logger);
      break;

    default:
      logger.error(`Sample Picker Card cardSelection:${attachmentAction.inputs.cardType}!`);
      bot.say('Please make a choice from the drop down list')
        .catch((e) => logger.error(`Failed to post picker instructions message to space. Error:${e.message}`));
  }
}

// Process the button press for a specific card
function processSampleCardResponse(bot, attachmentAction, person) {
  logger.info(`Got a button push on card ${attachmentAction.inputs.cardType} from space: ${bot.room.title}`);
  switch (attachmentAction.inputs.cardType) {
    case ("samplePicker"):
      // Display the chosen card
      activityUpdate.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("customJsonInput"):
      if (attachmentAction.inputs && attachmentAction.inputs.nextAction === 'samplePicker') {
        samplePicker.renderCard(bot, logger);
      } else {
        renderCustomJson(bot, attachmentAction);
      }
      break;

    default:
      let msg = `This bot doesn't currently do any logic for the button that you pressed, but here ` +
        ` is the body of the attachmentAction so you can see what your app would need to process:\n\n` +
        '```json\n' + `${JSON.stringify(attachmentAction, null, 2)}`;
      bot.reply(attachmentAction, msg)
        .catch((e) => {
          let errorMsg = `Failed handling a button press: ${e.message}`;
          this.logger.error(errorMsg);
          bot.say(errorMsg);
        });
  }
}

async function showHelp(bot) {
  try {
    await bot.say('This bot provides Webex Teams users and developers with an ' +
      'opportunity to try several types of Buttons and Cards described on the ' +
      '[Adaptive Card Samples website](https://adaptivecards.io/samples/).\n\n' +
      'For each card, we\'ll demonstrate how it renders in Webex Teams, and ' +
      'provide a description of the card elements being demonstrated.\n\nWe\'ll ' +
      'also provide a link to the source used for the card, along with any ' +
      'descriptions of how the original sample was modified to work more ' +
      'effectively in a Webex Teams environment.\n\n' +
      'Users can also use me to try sending their own JSON design. ' +
      'To try this, click on the "Send My Own Design Instead" button, ' +
      'or if your card json is in a file already, post the file with no message text.');
    samplePicker.renderCard(bot, logger);
  } catch (e) {
    logger.error(`Failed to post help message to space. Error:${e.message}`);
  }
}

function renderCustomJson(bot, attachmentAction) {
  // Send the user entered JSON as a card
  if (attachmentAction.inputs && attachmentAction.inputs.cardJson) {
    try {
      let cardJson = JSON.parse(attachmentAction.inputs.cardJson);
      bot.sendCard(cardJson, 'The client could not render the entered card JSON')
        .catch((e) => reportCustomRenderError(bot, attachmentAction, cardJson, e));
    } catch (e) {
      bot.reply(attachmentAction, 'Your design does not appear to be ' +
        'valid JSON.  One way to get a valid design is to use the ' +
        '[Buttons and Cards Designer](https://developer.webex.com/buttons-and-cards-designer)\n\n' +
        'Validate your design and try again, or send me any ' +
        'message to see the list of samples again.');
    }
  }
}

function renderJsonFileRequest(bot, trigger) {
  for (url of trigger.message.files) {
    request({
      url: url,
      headers: {
        "Authorization": `Bearer ${frameworkConfig.token}`
      },
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        bot.sendCard(body, 'The client could not render the entered card JSON')
          .catch((e) => reportCustomRenderError(bot, trigger.message, body, e));
      } else {
        bot.say('markdown', `Could not read JSON from ${url}.\n\n${error.message}`);
      }
    });
  }
}

function reportCustomRenderError(bot, replyTo, cardJson, e) {
  let eMsg = 'Webex rejected the card design, ';
  if (e.statusCode !== undefined) {
    eMsg += `with a ${e.statusCode} response, `;
  }
  if (e.body !== undefined) {
    eMsg += 'and a response body:\n\n```\n\n' + JSON.stringify(e.body, null, 2);
  } else if ('statusMessage' in e) {
    if ('name' in e) {
      eMsg += ', ' + e.name + ': ' + e.statusMessage + ', ';
    } else {
      eMsg += ', ' + e.statusMessage,  + ', ';
    }
    eMsg += 'returning the error:\n\n```\n\n' + e.message;
  }
  bot.reply(replyTo, eMsg);
  // Remove the word error from the log line to avoid operational alerts
  eMsg = eMsg.replace(/error/gi, 'err-or');
  logger.info(`Custom JSON from space "${bot.room.title}" resulted in non success response: ${eMsg}`);
  logger.info(JSON.stringify(cardJson, 2, 2).replace(/error/gi, 'err-or'));
  postCardSizeorErrorDetails(bot, replyTo, e, cardJson);
};

function postCardSizeorErrorDetails(bot, replyTo, e, card) {
  let msg = '';
  let gotGenericError = false;
  if ((e.body !== undefined) && (typeof e.body === 'object') &&
    (e.body.message === "Unable to share content to room")) {
    gotGenericError = true;
  }
  return cardSize.calculateRoughCardSize(card)
    .then((sizeInfo) => {
      // Warn about big cards
      if (gotGenericError || (sizeInfo.total > warnCardSize)) {
        msg += `The overall card content may be ` +
          `too big for Webex.  Your card consists of the following:\n` +
          `* JSON Size: **${sizeInfo.jsonSize} bytes**\n` +
          `* Number of Images: ${sizeInfo.images.length}\n` +
          `* Total Size: **${sizeInfo.total} bytes**\n\n`;
        if (sizeInfo.images.length) {
          msg += `Image details:\n`;
          for (let i=0; i< sizeInfo.images.length; i++) {
            imgInfo = sizeInfo.images[i];
            msg += `${i+1}. ${imgInfo.url}: **${imgInfo.size} bytes**\n`;
          }  
        }
        msg += `\nYou may want to reduce the number of images or the size of ` +
          `the images you are using and try again.  As a rule of thumb, Webex `+
          `card sizes should not exceed ${(warnCardSize/1000).toFixed(1)}K ` +
          `bytes in total, but smaller sizes may also fail especially if they include ` +
          `many images, each of which adds its own overhad that contributes to the ` +
          `internal message storage requirements.`;
      }
      if (sizeInfo.imageErrors.length) {
        msg += `\n\nYour card design includes some images which could not be fetched:\n`;
        for (let i=0; i< sizeInfo.imageErrors.length; i++) {
          imgInfo = sizeInfo.imageErrors[i];
          msg += `${i+1}. ${imgInfo.url}\n`;
        }
        msg += `\nYour card may not properly render unless all image URLs are valid.`;
      }
      if (msg) {
        logger.info(`Custom JSON from space "${bot.room.title}" resulted in non succress: ${msg}`);
        return bot.reply(replyTo, {markdown: msg});
      }
    }).catch((e) => {
      if (e.name === 'TypeError') {
        let msg = '';
        if ((card) && (card.roomId)) {
          msg = 'Your data contains a `roomId`, so it looks like you may have submitted a full /messages API request load. ' +
            'Just send the card JSON.  For example, just the object in the attachments array from the body of a `POST /messages` ' +
            'request, or what you might copy from the [Buttons and Cards Designer](https://developer.webex.com/buttons-and-cards-designer)';
        } else {
          msg = `It looks like the data you submitted is not a valid Adaptive Card JSON.`  +
          'Try building your card in the [Buttons and Cards Designer](https://developer.webex.com/buttons-and-cards-designer) ' +
          'and copying the JSON from there.';
        }
        bot.reply(replyTo, msg);
        logger.info(`Custom JSON from space "${bot.room.title}" resulted in non success message: ${msg}`);
      } else { 
        logger.error(`postCardSizeErrorDetails(): failed sending size info: ${e.message}`);
      }
    });
}


function updateAdmin(message, listAll = false) {
  if (!adminsBot) {return;}
  try {
    if (listAll) {
      let count = 0;
      message += '\n';
      framework.bots.forEach(function (bot) {
        message += '* ' + bot.room.title + '\n';
        count += 1;
      });
      message += `\n\nFor a total of ${count} instances.`;
    }
    // Don't notify about users after a scheduled shutdown/restart
    if ((!lastShutdown) || (lastShutdown.isBefore(moment().subtract(5, 'minutes')))) {
      adminsBot.say({'markdown': message})
        .catch((e) => logger.error(`Failed to post shutdown message to admin. Error:${e.message}`));
    }
  } catch (e) {
    logger.warn('Unable to spark Admin the news ' + message);
    logger.warn('Reason: ' + e.message);
  }
}

function tryToInitAdminBot(bot, framework) {
  // Set our bot's email -- this is used by our health check endpoint
  if (botEmail === 'the bot') {  // should only happen once
    botEmail = bot.person.emails[0];
    botName = bot.person.displayName;
  }
  // See if this is the bot that belongs to our admin space
  if ((!adminsBot) && (bot.isDirect) && (adminEmail) &&
    (bot.isDirectTo.toLocaleLowerCase() === adminEmail.toLocaleLowerCase())) {
    adminsBot = bot;
    framework.adminsBot = adminsBot;
  } else if ((!adminsBot) && (adminSpaceId) && (bot.room.id === adminSpaceId)) {
    adminsBot = bot;
    framework.adminsBot = adminsBot;
  }
}



// Health Check
app.get('/', function (req, res) {
  if (process.env.DOCKER_BUILD) {
    res.send(`I'm alive, running in container built ${process.env.DOCKER_BUILD}.  To use this app add ${botEmail} to a Webex Teams space.`);
  } else {
    res.send(`I'm alive.  To use this app add ${botEmail} to a Webex Teams space.`);
  }
});

// start express server
var server = app.listen(frameworkConfig.port, function () {
  framework.debug('Framework listening on port %s', frameworkConfig.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function () {
  framework.debug('stoppping...');
  server.close();
  framework.stop().then(function () {
    process.exit();
  });
});

