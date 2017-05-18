# A GroupMe bot that occasionally mocks people, Spongebob-style 

## IMPORTANT NOTE

You will need to edit the .env file by replacing the "INSERT ID HERE" with the GroupMe ID of your bot. This is required for the bot to work.

## Introduction

This is a Groupme bot that occasionally [mocks people, Spongebob-style](http://knowyourmeme.com/memes/mocking-spongebob). Based in most part off [this tutorial and GitHub project](https://github.com/groupme/bot-tutorial-nodejs).

## Contents

  * [Functionality](#functionality)
  * [Variables](#variables)

# Functionality <a name="functionality"></a>

Once added to a GroupMe group, this bot randomly responds to messages in a Mocking Spongebob style. The bot only inspects messages that have text of a certain length.

# Variables <a name="variables"></a>

These variables are located in the bot.js file.

## PROB_RESPONSE

This controls the probability that a bot responds to a message with the Mocking Spongebob meme. A random number between 1 and PROB_RESPONSE is generated; if this number is equal to 1 (and the message is one deemed to be respondable) then the bot responds. Thus higher numbers mean a lower chance of a response. This variable defaults to 25.

## MIN_LENGTH

This controls the minimum message length, in characters, that the bot will respond to. If a message is less than this many characters long (as determined by string.length) then the bot will not respond to it. This is because longer messages are more meaningful and thus funnier to mock.