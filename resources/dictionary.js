// Prováveis comandos para uma determinada ação
//
var actionList = {
	actionBonuz: ['bonuz'],
	actionJarvisHelp: ['help', 'ajuda', 'comandos', 'entende', 'ouve', 'escuta', 'hello', 'olá', 'ola', 'oi', 'jarvis'],
	easterEggRambo: ['rambo', 'celebrar'],
	easterEggPauloWhyte: ['whyte', 'batman'],
	easterEggCaetano: ['caetano', 'gordinho', 'milord'],
	easterEggResetJarvis: ['shutdown', 'reboot', 'restart', 'logoff']
}

var actionRegex = {
	experienceStatus: '(.*)(resumo|experiencia|experiência|status|estatística|overview|report|relatório|relatorio|campanha|promoção|promocao|promoçao|promocão)(.*)',
	experienceBalance: '(.*)(saldo|balance|dinheiro|grana|reais)(.*)',
	consumerData: '(.*)(quem|whois|fulano|camarada|cliente|consumer|consumidor|telefone|celular|numero|número|mobile)(.*)',
	registerExperience: '(.*)(convide|cadastre|cadastro|cadastrar)(.*)'

}

module.exports = {
	actions: actionList,
	actionRegex : actionRegex
}
