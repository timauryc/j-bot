'use strict';

function sendHelpMessage(user) {
	var reply = '*Olá, ' + user + '. Precisa de ajuda? Pode receber a minha ajuda digitando os seguintes comandos* :robot_face:\n'
	reply += '```\n';
	reply += 'help                  = Dãããã... Exibe esta mensagem\n';
	reply += 'saldo <experiência>   = Saldo da experiência (apenas quando o saldo é controlado pelo Engine)\n';
	reply += 'status <experiência>  = Sumário com informações relevantes sobre a experiência\n';
	reply += 'cliente <consumer>    = Dados sobre o consumer (inclusive ranking de engajamento)\n';
	reply += 'cadastro <consumer> <experiência> = Cadastro de tag de experiencia para o consumer (só pessoal autorizado)\n';
	reply += 'bonuz                 = Estatísticas gerais sobre a plataforma bonuz.com\n';
	reply += '```\n';
	reply += 'Tambem consigo entender palavras como: `resumo`, `estatística`, `cliente`, `consumer`, `dinheiro`, `balance`, `convide`, `cadastrar`, `ajuda`\n';
	reply += '_Eu sou capaz de fazer pequenas análises semânticas. Tente se comunicar comigo da maneira que achar mais natural._\n';
	reply += '_Ahhh, também tenho alguns easter-eggs. Espero que se divirta com eles, caso seja capaz de encontrá-los!_ :troll:\n';

	return reply;
}

module.exports = {
	sendHelpMessage: sendHelpMessage
}