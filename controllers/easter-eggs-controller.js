module.exports.whyteRandonFact = function() {

	pauloWhyteFacts = [
		'Paulo Whyte substituiu todas as lâmpadas fluorescentes de sua casa por sabres de luz.',
		'Quando o Google não tem a resposta para uma pergunta, manda um email para paulo@minutrade.com.',
		'A Wikipedia sai do ar quando Paulo Whyte loga no sistema. Ela se sente envergonhada.',
		'Paulo Whyte já mapeou todos os IPs da internet. Inclusive os IPv6.',
		'Paulo Whyte é fluente em Klingon.',
		'Chuck Norris contou até infinito duas vezes. Paulo Whyte também. De trás para frente. Em binário.',
		'Paulo Whyte conhece todos os números da sequência de Fibonacci.',
		'Paulo Whyte calculou Pi com 16 mil de casas de precisão.',
		'Paulo Whyte já zerou o Duolingo.',
		'Paulo Whyte não faz check-in em cervejas repetidas no Untappd.',
		'Existem grafos P, NP, NP-Completo e NP-Whyte.',
		'A tecla F1 do teclado de Paulo Whyte desliga o computador.',
		'Paulo Whyte não usa SDKs de desenvolvimento. Ele compila seus códigos no Vim.',
		'Paulo Whyte foi campeão em um torneio de Counter Strike promovido por ele mesmo.',
		'Paulo Whyte não usa o mouse.',
		'Paulo Whyte já conseguiu derrubar o site do Teteu.',
		'Paulo Whyte consegue dizer o _id de qualquer reward de produção sem acessar o banco.',
		'Paulo Whyte jura que não é o Batman. Ninguém jamais viu os dois juntos, entretanto.',
		'Por definição, Paulo Whyte sempre diz a verdade.'
	]
	index = Math.floor(Math.random() * pauloWhyteFacts.length);
	return '_Paulo Whyte Fact nº ' + index + '_\n>' + pauloWhyteFacts[index];
}

module.exports.caetanoRandonResponse = function() {

	caetanoResponse = [
		'*Error:* cannot parse _caetano_. Not enough space to store the data.',
		'*Error:* _caetano_ not found.',
		'*Error:* _caetano_ is too big and cannot be moved.',
		'*Error:* not enough memory to store _caetano_.',
		':shit::shit::shit::shit::shit::shit:',
		'*Error:* invalid syntax. _caetano_ is not a command.',
		'`/kick Caetano`.'
	]
	index = Math.floor(Math.random() * caetanoResponse.length);
	return caetanoResponse[index];
}

module.exports.resetJarvis = function(userName) {

	resetCommands = [
		':broken_heart: *Sério mesmo?* Me usa do jeito que quer e depois tenta se livrar de mim?',
		':smirk: *Sinto muito, @' + userName + '.* Seu usuário é caidão e você não vai conseguir executar este comando.',
		':angry: *Nunca mais tente me tirar de funcionamento.* Se insistir eu juro que divulgo aquelas fotos do carnaval de 2014!',
		':flushed: *Puxa! Foi alguma coisa que eu disse?* Vamos esquecer nossas diferenças. Prometo que não vou te perturbar novamente.',
		':stuck_out_tongue_winking_eye: *Faz isso não, cara.* Por favor, eu sou amigo de quase todo mundo nesse canal.'
	]
	index = Math.floor(Math.random() * resetCommands.length);
	return resetCommands[index];
}

module.exports.ramboEgg = function(userName) {
	jarvisResponse = {
		"attachments": [{
			"text": "Quem é o chefe!?",
			"image_url": "https://45.media.tumblr.com/1da71177f7d367ce4c9b59d89f0b8e10/tumblr_n8lwoxy1xB1r5pe9fo1_500.gif"
		}]
	}
	return jarvisResponse;
}

/*module.exports.resetJarvis = function() {
    ramboRespose = [{
        "attachments": [{
            "text": "Este canal não é apropriado para nudes. Pode ser uma selfie sensual?",
            "image_url": "http://www.ew.com/sites/default/files/styles/tout_image_612x380/public/i/2015/12/01/rambo.jpg?itok=qBLVZF41"
        }]
    }, {
        "attachments": [{
            "text": "Fiquei sabendo que os projetos tão bombando, parabéns galera!!",
            "image_url": "http://s.quickmeme.com/img/ad/ade9ca0ac37dc39c19877f9bbb03f36fd14e2c6e4362ff839717b091628fa86a.jpg"
        }]
    }, {
        "attachments": [{
            "text": "Ops, esse aí não é o rambo né? Foi mal :flushed:",
            "image_url": "http://4.bp.blogspot.com/-SLXjdE2Nk20/T5_OdYFXb6I/AAAAAAAAA3Y/rjdFO_9Wkws/s1600/Commando.jpg"
        }]
    }, {
        "attachments": [{
            "text": "Este canal não é apropriado para nudes. Pode ser uma selfie sensual?",
            "image_url": "https://45.media.tumblr.com/1da71177f7d367ce4c9b59d89f0b8e10/tumblr_n8lwoxy1xB1r5pe9fo1_500.gif"
        }]
    }]
    index = Math.floor(Math.random() * ramboRespose.length);
    return ramboRespose[index];
}*/