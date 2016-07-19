const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function noKeywordFound(user) {
	var unknowCommand = [
		'Que dó, @' + user + ', você está carente? Não digitou nenhum comando válido, só pode estar querendo puxar papo comigo! Não tem problema, me chama em pvt e a gente bate um papo depois do expediente. :kissing_heart:',
		'Foi engano, não foi? Sabia! :joy::joy::joy::joy:\nTudo bem. Quando lembrar o comando, é só entrar em contato de novo e eu faço o que você pedir.',
		'Raios duplos me partam, @' + user + '. Não consegui entender uma só palavra do que você disse. Dê uma olhada na lista de comandos válidos. Digite `help` e eu te ajudarei.',
		'Está tudo bem, @' + user + '. Eu estou disposto a deixar tudo isso para trás e recomeçar com o pé direito. Digite apenas `help` e eu mostrarei a lista de comandos válidos.',
		'Pelas pulgas de mil camelos, @' + user + '. Me sinto até envergonhado, mas confesso que não captei vossa mensagem. Digite `help` para conhecer meus comandos.',
		'Você esta me escrevendo em espanhol, @' + user + '?. Não entendi direito o que você escreveu, pero que si pero que no :thinking_face:. Digite `help` para conhecer meus comandos.'
	];

	var index = Math.floor(Math.random() * unknowCommand.length);
	return unknowCommand[index];
	//bot.reply(message, reply);
}

function getMobileNumbers(text) {

	var mobileNumbers = [];

	var r = /\d+/g;
	var s = text;
	var m;
	while ((m = r.exec(s)) != null) {
		mobileNumbers.push(m[0]);
	}

	return mobileNumbers;

}

function getEmails(text) {
	var emails = [];

	var r = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/img;
	var s = text;
	var m;
	while ((m = r.exec(s)) != null) {
		emails.push(m[0]);
	}

	if (emails[0]) {
		var email = emails[0];
		if (email.indexOf("|") >= 0) {
			email = email.split("|")[0];
		}
		return email;
	} else {
		return null;
	}
}

function emailOrNumber(userText) {

	console.log('userText: ', userText);
	var email = getEmails(userText);
	if (email) {
		return email;
	} else {
		mobileNumbers = getMobileNumbers(userText);
		switch (mobileNumbers.length) {
			case 0:
				{
					return '';
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
						var formatedPhone = phoneUtil.format(phoneNumber, PNF.E164).replace("+", "");
						console.log('formatedPhone: ', formatedPhone)
						return formatedPhone;
					} else {
						return '';
					}
					break;
				}
		}

	}
}

module.exports = {
	getMobileNumbers: getMobileNumbers,
	noKeywordFound: noKeywordFound,
	emailOrNumber: emailOrNumber
}