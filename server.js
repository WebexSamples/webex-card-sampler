/*
Cisco Webex Bot to demonstrate the Adaptive Card samples
*/
/*jshint esversion: 6 */  // Help out our linter

var Framework = require('webex-node-bot-framework');
var webhook = require('webex-node-bot-framework/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
logger = require('./logger');

// When running locally read environment variables from a .env file
require('dotenv').config();

// Configure the Framework bot for the environment we are running in
var frameworkConfig = {};
var cardsConfig = {};
if ((process.env.WEBHOOK) && (process.env.TOKEN) &&
  (process.env.PORT) && (process.env.CARD_CONENT_TYPE)) {
  frameworkConfig.webhookUrl = process.env.WEBHOOK;
  frameworkConfig.token = process.env.TOKEN;
  frameworkConfig.port = process.env.PORT;
  // Adaptive Card with images can take a long time to render
  // Extend the timeout when waiting for a webex API request to return
  frameworkConfig.requestTimeout = 60000;

  // Read the card schema and URL for the source example from environment
  cardsConfig.srcBaseUrl = process.env.CARD_SRC_BASE_URL;
  cardsConfig.contentType = process.env.CARD_CONENT_TYPE;
} else {
  logger.error('Cannot start server.  Missing required environment varialbles WEBHOOK, TOKEN or CARD_CONTENT_TYPE');
  process.exit();
}

// The admin will get extra notifications about bot usage
let adminEmail = '';
let botName = '';
let botEmail = '';
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

// init framework
var framework = new Framework(frameworkConfig);
framework.start();
framework.messageFormat = 'markdown';
logger.info("Starting framework, please wait...");

// Read in the sample cards we'll be using
SamplePicker = require('./res/sample-picker.js');
let samplePicker = new SamplePicker(cardsConfig.srcBaseUrl, cardsConfig.contentType);
ActivityUpdate = require('./res/activity-update.js');
let activityUpdate = new ActivityUpdate(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Agenda = require('./res/agenda.js');
let agenda = new Agenda(cardsConfig.srcBaseUrl, cardsConfig.contentType);
CalendarReminder = require('./res/calendar-reminder.js');
let calendarReminder = new CalendarReminder(cardsConfig.srcBaseUrl, cardsConfig.contentType);
ExpenseReport = require('./res/expense-report.js');
let expenseReport = new ExpenseReport(cardsConfig.srcBaseUrl, cardsConfig.contentType);
Input = require('./res/input.js');
let input = new Input(cardsConfig.srcBaseUrl, cardsConfig.contentType);
InputForm = require('./res/input-form.js');
let inputForm = new InputForm(cardsConfig.srcBaseUrl, cardsConfig.contentType);
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
Restaurant = require('./res/restaurant.js');
let restaurant = new Restaurant(cardsConfig.srcBaseUrl, cardsConfig.contentType);
SimpleFallback = require('./res/simple-fallback.js');
let simpleFallback = new SimpleFallback(cardsConfig.srcBaseUrl, cardsConfig.contentType);
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
});

framework.on('spawn', function (bot) {
  // See if this instance is the 1-1 space with the admin
  if ((!adminsBot) && (bot.isDirect) &&
    (bot.isDirectTo.toLocaleLowerCase() === adminEmail.toLocaleLowerCase())) {
    adminsBot = bot;
  }
  // Notify the admin if the bot has been added to a new space
  if (!framework.initialized) {
    // An instance of the bot has been added to a room
    logger.info(`Framework startup found bot in existing room: ${bot.room.title}`);
  } else {
    logger.info(`Our bot was added to a new room: ${bot.room.title}`);
    if (adminsBot) {
      adminsBot.say(`${botName} was added to a space: ${bot.room.title}`)
        .catch((e) => logger.error(`Failed to new bot space update to Admin. Error:${e.message}`));
    }
    showHelp(bot);
  }
});

// Respond to message input
var responded = false;

framework.hears('getAdminStats', function (bot) {
  logger.verbose('Processing getAdminStats Request for ' + bot.isDirectTo);
  if (adminEmail === bot.isDirectTo) {
    updateAdmin(`${botName} has been added to the following spaces:`, true);
  } else {
    bot.say('Unauthorized Request')
      .catch((e) => logger.error(`Failed to post Unauthorized Request message to space. Error:${e.message}`));
  }
  responded = true;
});

framework.hears(/help/i, function (bot) {
  responded = true;
  showHelp(bot);
});

// send an example card in response to any input
framework.hears(/.*/, function (bot) {
  if (!responded) {
    samplePicker.renderCard(bot, logger);
  }
  responded = false;
});

// Process a submitted card
framework.on('attachmentAction', function (bot, trigger) {
  if (trigger.type != 'attachmentAction') {
    throw new Error(`Invaid trigger type: ${trigger.type} in attachmentAction handler`);
  }
  let attachmentAction = trigger.attachmentAction;
  if (attachmentAction.inputs.cardType === 'samplePicker') {
    renderSelectedCard(bot, attachmentAction.inputs.cardSelection);
  } else {
    processSampleCardResponse(bot, attachmentAction, trigger.person);
  }
  logger.verbose(`Got an attachmentAction:\n${JSON.stringify(attachmentAction, null, 2)}`);
});

function renderSelectedCard(bot, cardSelection) {
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

    case ("restaurant"):
      restaurant.renderCard(bot, logger);
      break;

    case ('simpleFallback'):
      simpleFallback.renderCard(bot, logger);
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

function processSampleCardResponse(bot, attachmentAction, person) {
  switch (attachmentAction.inputs.cardType) {
    case ("samplePicker"):
      // Display the chosen card

      activityUpdate.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("activityUpdate"):
      activityUpdate.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ('calendarReminder'):
      calendarReminder.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("expenseReport"):
      expenseReport.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("input"):
      input.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("inputForm"):
      inputForm.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("flightDetails"):
      flightDetails.handleSubmit(attachmentAction, person, bot, logger);
      break;

    case ("foodOrder"):
      foodOrder.handleSubmit(attachmentAction, person, bot, logger);
      break;

    default:
      logger.error(`Got unexpected cardType:${attachmentAction.inputs.cardType}!`);
      bot.say('Don\'t know how to handle the card input. ' +
        'Please contact the Webex Developer Support: https://developer.webex.com/support')
        .catch((e) => logger.error(`Failed to post unknown cardTyp error message to space. Error:${e.message}`));
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
      'effectively in a Webex Teams environment.');
    samplePicker.renderCard(bot, logger);
  } catch (e) {
    logger.error(`Failed to post help message to space. Error:${e.message}`);
  }
}


function updateAdmin(message, listAll = false) {
  if (!adminsBot) { return; }
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
      adminsBot.say({ 'markdown': message })
        .catch((e) => logger.error(`Failed to post shutdown message to admin. Error:${e.message}`));
    }
  } catch (e) {
    logger.warn('Unable to spark Admin the news ' + message);
    logger.warn('Reason: ' + e.message);
  }
}


// define express path for incoming webhooks
app.post('/', webhook(framework));

// Health Check
app.get('/', function (req, res) {
  res.send(`I'm alive.  To use this app add ${botEmail} to a Webex Teams space.`);
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

