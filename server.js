/*
Cisco Webex Bot to demonstrate the Adaptive Card samples
*/
/*jshint esversion: 6 */  // Help out our linter

var Flint = require('node-flint');
var webhook = require('node-flint/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
logger = require('./logger');

// When running locally read environment variables from a .env file
require('dotenv').config();

// Configure the flint bot for the environment we are running in
var flintConfig = {};
var cardsConfig = {};
if ((process.env.WEBHOOK) && (process.env.TOKEN) &&
  (process.env.PORT) && (process.env.CARD_CONENT_TYPE)) {
  flintConfig.webhookUrl = process.env.WEBHOOK;
  flintConfig.token = process.env.TOKEN;
  flintConfig.port = process.env.PORT;
  cardsConfig.srcBaseUrl = process.env.CARD_SRC_BASE_URL;
  cardsConfig.contentType = process.env.CARD_CONENT_TYPE;
} else {
  logger.error('Cannot start server.  Missing required environment varialbles WEBHOOK, TOKEN or CARD_CONTENT_TYPE');
  return;
}

// The admin will get extra notifications about bot usage
let adminEmail = '';
let botName = '';
let botEmail = ''
if ((process.env.ADMIN_EMAIL) && (process.env.BOTNAME) && (process.env.BOT_EMAIL)) {
  adminEmail = process.env.ADMIN_EMAIL;
  botName = process.env.BOTNAME;
  botEmail = process.env.BOT_EMAIL;
} else {
  logger.error('No ADMIN_EMAIL environment variable.  Will not notify author about bot activity');
}
var adminsBot = null;


//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));

// init flint
var flint = new Flint(flintConfig);
flint.start();
flint.messageFormat = 'markdown';
logger.info("Starting flint, please wait...");

// Read in the sample cards we'll be using
SamplePicker = require('./res/sample-picker.js');
let samplePicker = new SamplePicker(cardsConfig.srcBaseUrl, cardsConfig.contentType);
ActivityUpdate = require('./res/activity-update.js');
let activityUpdate = new ActivityUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Agenda = require('./res/agenda.js');
let agenda = new Agenda(cardsConfig.srcBaseUrl, cardsConfig.contentType);
CalendarReminder = require('./res/calendar-reminder.js');
let calendarReminder = new CalendarReminder(cardsConfig.srcBaseUrl, cardsConfig.contentType);
InputForm = require('./res/input-form.js');
let inputForm = new InputForm(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FlightDetails = require('./res/flight-details.js');
let flightDetails = new FlightDetails(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FlightItinerary = require('./res/flight-itinerary.js');
let flightItinerary = new FlightItinerary(cardsConfig.srcBaseUrl, cardsConfig.contentType);
FlightUpdate = require('./res/flight-update.js');
let flightUpdate = new FlightUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);
StockUpdate = require('./res/stock-update.js');
let stockUpdate = new StockUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);


flint.on("initialized", function () {
  logger.info("Flint initialized successfully! [Press CTRL-C to quit]");
});

flint.on('spawn', function (bot) {
  // An instance of the bot has been added to a room
  logger.info(`bot spawned in room: ${bot.room.title}`);
  // See if this instance is the 1-1 space with the admin
  if (bot.isDirectTo.toLocaleLowerCase() === adminEmail.toLocaleLowerCase()) {
    adminsBot = bot;
  }
  // Notify the admin if the bot has been added to a new space
  if ((flint.initialized) && (adminsBot)) {
    samplePicker.renderCard(bot, logger);
    adminsBot.say(`${botName} was added to a space: ${bot.room.title}`);
  }
});

// Respond to message input
var responded = false;

flint.hears('getAdminStats', function (bot) {
  logger.verbose('Processing getAdminStats Request for ' + bot.isDirectTo);
  if (adminEmail === bot.isDirectTo) {
    updateAdmin(`${botName} has been added to the following spaces:`, true);
  } else {
    bot.say('Unauthorized Request');
  }
  responded = true;
});

flint.hears(/help/i, function (bot) {
  bot.say('This bot provides Webex Teams users and developers with an ' +
    'opportunity to try several types of Buttons and Cards described on the ' +
    '[Adaptive Card Samples website](https://adaptivecards.io/samples/).\n\n' +
    'For each card, we\'ll demonstrate how it renders in Webex Teams, and ' +
    'provide a description of the card elements being demonstrated.\n\nWe\'ll ' +
    'also provide a link to the source used for the card, along with any ' +
    'descriptions of how the original sample was modified to work more ' +
    'effectively in a Webex Teams environment.');
});

// send an example card in response to any input
flint.hears(/.*/, function (bot, trigger) {
  if (!responded) {
    samplePicker.renderCard(bot, logger);
  }
  responded = false;
});

// Process a submitted card
flint.on('attachmentAction', function (bot, attachmentAction) {
  if (attachmentAction.inputs.cardType === 'samplePicker') {
    renderSelectedCard(bot, attachmentAction.inputs.cardSelection);
  } else {
    processSampleCardResponse(bot, attachmentAction);
  }
  logger.verbose(`Got an attachmentAction:\n${JSON.stringify(attachmentAction, null, 2)}`);
});

function renderSelectedCard(bot, cardSelection) {
  switch (cardSelection) {
    case ('activityUpdate'):
      activityUpdate.renderCard(bot);
      break;

    case ('agenda'):
      agenda.renderCard(bot, logger);;
      break;

    case ('calendarReminder'):
      calendarReminder.renderCard(bot);
      break;

    case ('inputForm'):
      inputForm.renderCard(bot);
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

    case ('stockUpdate'):
      stockUpdate.renderCard(bot);
      break;

    default:
      logger.error(`Sample Picker Card cardSelection:${attachmentAction.inputs.cardType}!`);
      bot.say('Please make a choice from the drop down list');
  }
}

function processSampleCardResponse(bot, attachmentAction) {
  flint.spark.personGet(attachmentAction.personId)
    .then((person) => {
      switch (attachmentAction.inputs.cardType) {
        case ("samplePicker"):
          // Display the chosen card

          activityUpdate.handleSubmit(attachmentAction, person, bot);
          break;

        case ("activityUpdate"):
          activityUpdate.handleSubmit(attachmentAction, person, bot);
          break;

        case ('calendarReminder'):
          calendarReminder.handleSubmit(attachmentAction, person, bot);
          break;

        case ("inputForm"):
          inputForm.handleSubmit(attachmentAction, person, bot);
          break;

        case ("flightDetails"):
          flightDetails.handleSubmit(attachmentAction, person, bot);
          break;

        default:
          logger.error(`Got unexpected cardType:${attachmentAction.inputs.cardType}!`);
          bot.say('Don\'t know how to handle the card input. ' +
            'Please contact the Webex Developer Support: https://developer.webex.com/support');
      }
    })
    .catch((err) => {
      logger.error(`Couldn't get person details from attachmentAction.personId:${attachmentAction.personId}. Error:${err}`);
      bot.say('Don\'t know how to handle the card input. ' +
        'Please contact the Webex Developer Support: https://developer.webex.com/support');
    });
}

function updateAdmin(message, listAll = false) {
  if (!adminsBot) { return; }
  try {
    if (listAll) {
      let count = 0;
      message += '\n';
      flint.bots.forEach(function (bot) {
        message += '* ' + bot.room.title + '\n';
        count += 1;
      });
      message += `\n\nFor a total of ${count} instances.`;
    }
    // Don't notify about users after a scheduled shutdown/restart
    if ((!lastShutdown) || (lastShutdown.isBefore(moment().subtract(5, 'minutes')))) {
      adminsBot.say({ 'markdown': message });
    }
  } catch (e) {
    logger.warn('Unable to spark Admin the news ' + message);
    logger.warn('Reason: ' + e.message);
  }
}


// define express path for incoming webhooks
app.post('/', webhook(flint));

// Health Check
app.get('/', function (req, res) {
  res.send(`I'm alive.  To use this app add ${botEmail} to a Webex Teams space.`);
});

// start express server
var server = app.listen(flintConfig.port, function () {
  flint.debug('Flint listening on port %s', flintConfig.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function () {
  flint.debug('stoppping...');
  server.close();
  flint.stop().then(function () {
    process.exit();
  });
});

