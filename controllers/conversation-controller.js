'use strict'

const integrationController = require('./reports-integration-controller');
const conflictController = require('./conflict-controller');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function speakForBalance() {
	// start a conversation to handle this response.
	var initialQuestion = 'Desculpe, @' + GLOBAL.username + '. Não consegui identificar nenhuma experiência. :thinking_face:\n';
	initialQuestion += 'Escreva o nome da alguma experiencia ou `sair` para terminar nosso papo.\n'

	GLOBAL.bot.startConversation(GLOBAL.message, function(err, convo) {
		convo.ask(initialQuestion, [{
			pattern: 'sair',
			callback: function(response, convo) {
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				// just repeat the question
				console.log('entre aqui');
				integrationController.getBalance(response.text, (result) => {
					console.log('termine el get balance');
					if (result) {
						console.log('dio resultado');
						GLOBAL.bot.reply(GLOBAL.message, integrationController.formatBalance(GLOBAL.username, result));
					} else {
						console.log('no dio resultado');
						//ask for an experience name or desist
						convo.repeat();
					}
				});
				convo.next();
			}
		}]);

	})
}

function speakForConsumerData() {
	// start a conversation to handle this response.
	var initialQuestion = 'Desculpe, @' + GLOBAL.username + '. Não consegui identificar nenhum numero de telefone ou email. :thinking_face:\n';
	initialQuestion += 'Escreva um telefone ou email, ou `sair` para terminar nosso papo.\n'

	bot.startConversation(GLOBAL.message, function(err, convo) {
		convo.ask(initialQuestion, [{
			pattern: 'sair',
			callback: function(response, convo) {
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				// just repeat the question
				var searchKey = conflictController.emailOrNumber(response.text);
				if (searchKey) {
					GLOBAL.bot.reply(message, 'Você quer o consultar os dados do cliente *' + searchKey + '*. Acertei? :sunglasses:\n');
					integrationController.getUserProfile(searchKey, (result) => {
						if (result) {
							GLOBAL.bot.reply(GLOBAL.message, integrationController.formatUserProfile(GLOBAL.username, result));
						} else {
							convo.repeat();
						}
					});

				} else {
					convo.repeat();
				}
				convo.next();
			}
		}]);
	});
}

function speakForStatus() {
	// start a conversation to handle this response.
	var initialQuestion = 'Desculpe, @' + GLOBAL.username + '. Não consegui identificar nenhuma experiência. :thinking_face:\n';
	initialQuestion += 'Escreva o nome da alguma experiencia ou `sair` para terminar nosso papo.\n'

	bot.startConversation(GLOBAL.message, function(err, convo) {
		convo.ask(initialQuestion, [{
			pattern: 'sair',
			callback: function(response, convo) {
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				// just repeat the question
				integrationController.getExperienceStatus(response.text, (result) => {
					if (result) {
						GLOBAL.bot.reply(GLOBAL.message, integrationController.formatExperienceStatus(GLOBAL.username, result));
					} else {
						//ask for an experience name or desist
						convo.repeat();
					}
				});
				convo.next();
			}
		}]);
	})
}

function confirmToRegister(mobileNumber, experience) {
	// start a conversation to handle this response.
	var initialQuestion = 'Você quer fazer um cadastro para o cliente com o numero *' + mobileNumber + '* na experiência *' + experience + '*. Acertei? :sunglasses:\n';
	initialQuestion += 'Por favor, escreva `sim` para confirmar ou `não` para cancelar.\n';

	GLOBAL.bot.startConversation(GLOBAL.message, function(err, convo) {
		convo.ask(initialQuestion, [{
			pattern: 'sim',
			callback: function(response, convo) {
				registerExperience(experience, mobileNumber);
				convo.stop();
			}
		}, {
			pattern: 'não',
			callback: function(response, convo) {
				// stop the conversation. this will cause it to end with status == 'stopped'
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				convo.repeat();
				convo.next();
			}
		}]);
	});
}

function registerExperience(experience, mobile) {
	console.log('registerExperience: %s %d', experience, mobile);
	integrationController.registerExperience(mobile, experience, function(_e) {
		if (_e === true) {
			GLOBAL.bot.reply(GLOBAL.message, 'O usuario foi cadastrado com sucesso. :sunglasses:\n');
			integrationController.getUserProfile(mobile, function(_u) {
				GLOBAL.bot.reply(GLOBAL.message, integrationController.formatUserProfile(GLOBAL.username, _u));
			});
		} else if (_e === false) {
			GLOBAL.bot.reply(GLOBAL.message, 'O cadastro não foi concluido. :thinking_face:\nO usuario já executou essa experiencia ou já posuí essa tag.\n');
			integrationController.getUserProfile(mobile, function(_u) {
				GLOBAL.bot.reply(GLOBAL.message, integrationController.formatUserProfile(GLOBAL.username, _u));
			});
		} else {
			GLOBAL.bot.reply(GLOBAL.message, 'O cadastro não foi concluido. :thinking_face: \n');
		}
	});
}

function experienceNotFound(mobileNumber) {
	var initialQuestion = 'Desculpe, @' + GLOBAL.username + '. Não consegui identificar nenhuma experiência. :thinking_face:\n';
	initialQuestion += 'Escreva o nome da alguma experiencia para continuar o processo de cadastro ou `sair` para terminar nosso papo.\n';

	GLOBAL.bot.startConversation(GLOBAL.message, function(err, convo) {
		convo.ask(initialQuestion, [{
			pattern: 'sair',
			callback: function(response, convo) {
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				integrationController.getExperienceName(response.text, function(result) {
					if (result && result.experience) {
						confirmToRegister(mobileNumber, result.experience);
					} else {
						experienceNotFound(mobileNumber);
					}
				});
				convo.next();
			}
		}]);
	});
}

function getValidPhoneNumber(originalText) {
	var mobileNumbers = conflictController.getMobileNumbers(originalText);
	switch (mobileNumbers.length) {
		case 0:
			{
				return null;
			}
		default:
			{
				var phoneNumber = mobileNumbers.join(" ");
				try {
					phoneNumber = phoneUtil.parse(phoneNumber, 'BR');
				} catch (err) {
					phoneNumber = null;
				}

				if (phoneNumber && phoneUtil.isValidNumber(phoneNumber)) {
					return phoneUtil.format(phoneNumber, PNF.E164).replace("+", "");
				} else {
					return null;
				}
				break;
			}
	}
}

function speakToRegister() {
	var question = '';

	var askForPhone = function(response, convo) {
		question = 'Desculpe, @' + GLOBAL.username + '. Não consegui identificar nenhuma experiência nem telefone. :thinking_face:\n';
		question += 'Escreva um numero de telefone para continuar o processo de cadastro ou `sair` para terminar nosso papo.\n';

		convo.ask(question, [{
			pattern: 'sair',
			callback: function(response, convo) {
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				var phone = getValidPhoneNumber(response.text);
				if (phone) {
					//pasar a la siguiente pregunta y pasar el telefono
					askForExperience(phone, convo);
					convo.next();
				} else {
					//repetir la pregunta
					convo.repeat();
					convo.next();
				}
			}
		}]);
	};

	var askForExperience = function(mobile, convo) {
		question = 'Escreva um nome de experiência para continuar o processo de cadastro ou `sair` para terminar nosso papo.\n';
		convo.ask(question, [{
			pattern: 'sair',
			callback: function(response, convo) {
				convo.say('Até mais!');
				convo.next();
			}
		}, {
			default: true,
			callback: function(response, convo) {
				integrationController.getExperienceName(response.text, function(result) {
					if (result && result.experience) {
						confirmToRegister(mobile, result.experience);
					} else {
						experienceNotFound(mobile);
					}
				});
				convo.next();
			}
		}]);
	};

	bot.startConversation(GLOBAL.message, askForPhone);
}

module.exports = {
	speakForBalance: speakForBalance,
	speakForConsumerData: speakForConsumerData,
	speakForStatus: speakForStatus,
	speakToRegister: speakToRegister,
	experienceNotFound: experienceNotFound,
	confirmToRegister: confirmToRegister
}