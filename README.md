# webex-card-sampler
Webex Teams Bot to demonstrate the use of Buttons and Cards using the [Adaptive Cards Samples](https://adaptivecards.io/samples/).

Each time a sample is displayed, we'll provide a link to the source with comments that describe how (if) the original sample was modified to make it more Webex Teams friendly.

## Checklist (absolute bare minimum to get a jira-notifier bot working)

Prerequisites:

- [ ] node.js (minimum supported v8.15.1 )

- [ ] Sign up for Webex Teams (logged in with your web browser)

----

- [ ] Sign up for nGrok (save API key) and start it on your machine (save the port number and public web address): https://ngrok.com/download

- [ ] Create a Webex Teams Bot (save the email address and API key): https://developer.webex.com/add-bot.html

## Starting the server

Set the following environmnt varibles in a file if running locally or in your production environment
* WEBHOOK - the url where the application is running WITHOUT the '/jira' on the end.  For example: http://myserver.ngrok.io
* TOKEN - the token that you got when you created your bot at https://developer.webex.com/add-bot.html
* PORT - the port where your app is running.  This is typically needed when running locally with ngrok, and set automatically when running in a production environemnt.
* ADMIN_EMAIL - the email address of the Cisco Spark user to notify about bot activity.  This is generally the developer who maintains this bot
* BOTNAME - the name of the webex bot (used for statistics messages sent to the admin)

Start your node server in your enviornment.  This can be done via a debugger when running locally or by entering the following:
    ```npm start```

## Using the bot

Once the server is up and running Webex Teams users can add the bot to a teams space.

Any message will generate a "selection" card with a drop down list of samples to try.   

