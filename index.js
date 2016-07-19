'use strict';

const dictionary = require('./resources/dictionary');
const helpController = require('./controllers/help-controller');
const conflictController = require('./controllers/conflict-controller');
const integrationController = require('./controllers/reports-integration-controller');
const eggController = require('./controllers/easter-eggs-controller');
const conversationController = require('./controllers/conversation-controller');
const authorizedUsers = require('./resources/authorized-users');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const slack = require('slack');
const Botkit = require('botkit');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.token
}).startRTM();


function getUsername(message, callback) {
  slack.users.info({
    token: process.env.token,
    user: message.user
  }, (err, data) => {
    if (!err && data.user && data.user.name) {
      callback(data.user.name);
    } else {
      callback('user');
    }
  });
}


function setGlobalVariables(username, bot, message) {
  GLOBAL.username = username;
  GLOBAL.bot = bot;
  GLOBAL.message = message;
}



//experience status
controller.hears(dictionary.actionRegex.experienceStatus, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    //set the global variables
    setGlobalVariables(username, bot, message);
    if (message.match[3]) {
      integrationController.getExperienceStatus(message.match[3], (result) => {
        if (result) {
          bot.reply(message, integrationController.formatExperienceStatus(username, result));
        } else {
          //ask for an experience name or desist
          conversationController.speakForStatus();
        }
      });
    } else {
      //ask for an experience name or desist
      conversationController.speakForStatus();
    }
  });
});

//consumer data
controller.hears(dictionary.actionRegex.consumerData, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    //set the global variables
    setGlobalVariables(username, bot, message);
    var searchKey = conflictController.emailOrNumber(message.match[3]);
    if (searchKey) {
      bot.reply(message, 'Você quer o consultar os dados do cliente *' + searchKey + '*. Acertei? :sunglasses:\n');
      //aca se debe tratar el argumento para tomarlo como email o numero
      integrationController.getUserProfile(searchKey, (result) => {
        if (result) {
          bot.reply(message, integrationController.formatUserProfile(username, result));
        } else {
          conversationController.speakForConsumerData();
        }
      });

    } else {
      conversationController.speakForConsumerData();
    }
  });
});

//experience balance
controller.hears(dictionary.actionRegex.experienceBalance, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    //set the global variables
    setGlobalVariables(username, bot, message);
    if (message.match[3]) {
      integrationController.getBalance(message.match[3], (result) => {
        if (result) {
          bot.reply(message, integrationController.formatBalance(username, result));
        } else {
          //ask for an experience name or desist
          conversationController.speakForBalance();
        }
      });
    } else {
      //ask for an experience name or desist
      conversationController.speakForBalance();
    }

  });
});

//register a tag for user
controller.hears(dictionary.actionRegex.registerExperience, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    if (authorizedUsers.registerExperienceUsers.indexOf(username) >= 0) {
      setGlobalVariables(username, bot, message);
      if (message.match[3]) {
        var originalText = message.match[3];
        var mobileNumbers = conflictController.getMobileNumbers(originalText);
        switch (mobileNumbers.length) {
          case 0:
            {
              conversationController.speakToRegister();
              break;
            }
          default:
            {
              //for getting the experience purposes
              var lastNumber = mobileNumbers[mobileNumbers.length - 1];
              var experienceClues = originalText.split(lastNumber);

              var phoneNumber = mobileNumbers.join(" ");
              try {
                phoneNumber = phoneUtil.parse(phoneNumber, 'BR');
              } catch (err) {
                phoneNumber = null;
              }

              if (phoneNumber && phoneUtil.isValidNumber(phoneNumber) && experienceClues[1].length > 0) {
                var formatedPhone = phoneUtil.format(phoneNumber, PNF.E164).replace("+", "");
                var experience = experienceClues[1].replace(/(\?|\!)/g, "");
                console.log(experience);
                integrationController.getExperienceName(experience, function(result) {
                  if (result && result.experience) {
                    conversationController.confirmToRegister(formatedPhone, result.experience);
                  } else {
                    conversationController.experienceNotFound(formatedPhone);
                  }
                });
              } else {
                conversationController.speakToRegister();
              }
              break;
            }
        }
      } else {
        conversationController.speakToRegister();
      }
    } else {
      var jarvisResponse = 'Detesto ser o portador de uma notícia tão ruim, @' + username + '. Infelizmente seu usuário não tem\n';
      jarvisResponse += 'permissão para executar este comando. #baixoastral\n';
      bot.reply(message, jarvisResponse);
    }
  });
});

//status of bonuz
controller.hears(dictionary.actions.actionBonuz, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    integrationController.getBonuzSummary(result => {
      bot.reply(message, integrationController.formatExperienceStatus(username, result));
    });
  });
});

//help user
controller.hears(dictionary.actions.actionJarvisHelp, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    bot.reply(message, helpController.sendHelpMessage(username));
  });
});

//easterEggRambo
controller.hears(dictionary.actions.easterEggRambo, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
  getUsername(message, (username) => {
    bot.reply(message, eggController.ramboEgg());
  });
});

//easterEggPauloWhyte
controller.hears(dictionary.actions.easterEggPauloWhyte, ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  getUsername(message, (username) => {
    bot.reply(message, eggController.whyteRandonFact());
  });
});

//easterEggCaetano
controller.hears(dictionary.actions.easterEggCaetano, ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  getUsername(message, (username) => {
    bot.reply(message, eggController.caetanoRandonResponse());
  });
});

//easterEggResetJarvis
controller.hears(dictionary.actions.easterEggResetJarvis, ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  getUsername(message, (username) => {
    bot.reply(message, eggController.resetJarvis(username));
  });
});

//no keyword identified 
controller.hears('.+', ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  getUsername(message, (username) => {
    bot.reply(message, conflictController.noKeywordFound(username));
  });
});