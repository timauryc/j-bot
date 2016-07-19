var request = require('request');

//http://localhost:3000
//|
module.exports.registerExperience = function(consumer, experience, callback) {
    var options = {
        url: '',
        headers: {
            ''
        }
    };

    request.get(options, function(error, res, body) {
        if (error) {
            return callback(error);
        } else {
            try {
                var res = JSON.parse(body);
                return callback(res);
            } catch (e) {
                return callback(null);
            }
        }
    });
}


module.exports.formatRegisterExperience = function(response) {
    if (response === true) {
        var response = 'Cadastro concluido com exito.:metal:\n';
    } else {
        var response = 'O cadastro não foi concluido :disappointed:\n';
    }
    return response;
}

module.exports.formatDiagnosis = function(e) {
    if (e) {
        var noIssues = true;
        var response = 'Você quer saber o diagnostico de bonuz. Acertei? :sunglasses:\n';

        if (e.wrongDDD) {
            noIssuesFlag = false;
            response += '```\n';
            response += 'Telefones com número DDD errado        : ' + e.wrongDDD + '\n';
            response += '```\n';
        }

        if (e.wrongDigitNumber) {
            noIssuesFlag = false;
            response += '```\n';
            response += 'Telefones com numero de dígitos errados        : ' + e.wrongDigitNumber + '\n';
            response += '```\n';
        }

        if (e.experiencesWrong) {
            noIssuesFlag = false;
            response += '```\n';
            response += 'Experiencias com problemas        :\n';
            for (var i in e.experiencesWrong) {
                response += 'Nome da experiencia        :' + e.experiencesWrong[i].name + '\n'
            }
            response += '```\n';
        }

        if (!noIssues) {
            response += '```\n';
            response += 'No se encontrou problema nenhum.:sunglasses:\n';
            response += '```\n';
        }

        return response;
    } else {
        var response = 'Desculpe, @' + userName + '. Não consegui fazer o diagnostico do bonuz. :thinking_face:\n';
        return response;
    }
}

module.exports.getBalance = function(experience, callback) {
    var options = {
        url: '',
        headers: {
            ''
        }
    };

    request.get(options, function(error, res, body) {
        if (error) {
            return callback(error);
        } else {
            try {
                var res = JSON.parse(body);
                return callback(res);
            } catch (e) {
                return callback(null);
            }
        }
    });
}

//http://localhost:3000
//|
module.exports.getExperienceName = function(experience, callback) {
    var options = {
        url: '',
        headers: {
            ''
        }
    };

    request.get(options, function(error, res, body) {

        if (error) {
            console.log('error');
            return callback(error);
        } else {
            try {
                console.log('estoy en el try');
                var res = JSON.parse(body);
                return callback(res);
            } catch (e) {
                console.log('cai en el catch: ' , e);
                return callback(null);
            }
        }
    });
}

module.exports.formatBalance = function(userName, payload) {
    if (payload) {
        if (payload.budget && (payload.budget.balance >= 0)) {
            var response = 'Você quer saber o saldo da experiência *' + payload.name + '*. Acertei? :sunglasses:\n';
            response += '```';
            response += 'Experiência        : ' + payload.name + '\n';
            response += 'Saldo remanescente : R$ ' + numberWithCommas(payload.budget.balance) + ',00' + '\n';
            response += '```';
            return response;
        } else {
            return '_O controle de saldo não é feito dentro da experiência. Tente pesquisar no Bonuz Negócios._\n';
        }
    } else {
        var response = 'Desculpe, @' + userName + '. Não consegui informaçao sobre aquela experiência. :thinking_face:\n';
        response += '_Dica: Verifique se digitou corretamente o nome da sua experiência e retente._\n';
        return response;
    }
}


function formatMinutes(numberToFormat) {
    if (numberToFormat > 60) {
        var minutes = numberToFormat % 60;
        var hours = (numberToFormat - minutes) / 60;
        return hours + ' horas e ' + Math.floor(minutes) + ' minutos';

    } else {
        var minutes = Math.floor(numberToFormat);
        var seconds = Math.floor((numberToFormat % 1) * 59 / 0.99);
        return minutes + ' minutos e ' + seconds + ' segundos';
    }
}

//http://localhost:3000
//|
module.exports.getBonuzSummary = function(callback) {
    var options = {
        url: '',
        headers: {
            ''
        }
    };

    request.get(options, function(error, res, body) {
        if (error) {
            return callback(error);
        } else {
            try {
                var res = JSON.parse(body);
                return callback(res);
            } catch (e) {
                console.log('tuve un error ', e);
                return callback(null);
            }
        }

    });
}

//http://localhost:3000
//|
module.exports.getExperienceStatus = function(experience, callback) {
    var options = {
        url: '',
        headers: {
            ''
        }
    };

    request.get(options, function(error, res, body) {
        if (error) {
            return callback(error);
        } else {
            try {
                var res = JSON.parse(body);
                return callback(res);
            } catch (e) {
                console.log('tuve un error ', e);
                return callback(null);
            }
        }

    });
}

module.exports.formatExperienceStatus = function(userName, e) {
    if (e) {
        if (e.balance && e.balance.name) {
            var response = 'Você quer saber o status da experiência *' + e.balance.name + '*. Acertei? :sunglasses:\n';
        } else {
            var response = 'Você quer saber o status da Bonuz. Acertei? :sunglasses:\n';
        }

        //Balance
        if (e.balance && e.balance.budget && e.balance.budget.balance) {
            response += '```\n';
            response += 'Saldo: R$ ' + numberWithCommas(e.balance.budget.balance) + ',00' + '\n';
            response += '```\n';
        }

        //triggers info
        if (e.triggers && e.triggers.total) {
            response += '```\n';
            var triggersInfo = "";
            response += 'Triggers recebidas: ' + numberWithCommas(e.triggers.total) + '\n';

            for (var i in e.triggers.detailed) {
                var count = e.triggers.detailed[i].count;
                triggersInfo += '\t' + e.triggers.detailed[i]._id + ': ' + numberWithCommas(count) + ' (' + ((count / e.triggers.total) * 100).toFixed(2) + '%)' + '\n';
            }

            response += triggersInfo;
            response += '```\n';
        }

        //Rewards
        if (e.rewardsInfo.total) {
            response += '```\n';
            if (e.triggers && e.triggers.total) {
                response += 'Rewards criadas: ' + numberWithCommas(e.rewardsInfo.total) + ' (' + ((e.rewardsInfo.total / e.triggers.total) * 100).toFixed(2) + '% do total de triggers)' + '\n';
            } else {
                response += 'Rewards criadas: ' + numberWithCommas(e.rewardsInfo.total) + '\n';
            }
            response += '```\n';
        }

        //Ticket
        if (e.rewardsInfo.totalTicket) {
            response += '```\n';
            response += 'Valor total em bônus: R$ ' + numberWithCommas(e.rewardsInfo.totalTicket) + ',00' + '\n';
            response += '```\n';
        }

        //Efetividade (deliveredAmount/rewardAmount desconsiderando rewardAmount = 0)
        if (e.rewardsAmount) {
            response += '```\n';
            response += 'Efetividade de entrega (deliveredAmount/rewardAmount): ' + ((e.deliveredAmount / e.rewardsAmount) * 100).toFixed(2) + '% ' + '\n';
            response += '```\n';
        }

        //Qualificação por canal
        var qualificaçãoInfo = '```\n';
        qualificaçãoInfo += 'Qualificação segmentada por canal: ' + '\n';
        var qualificaçãoSum = 0;
        for (var i in e.rewardsInfo.detailed) {
            var count = e.rewardsInfo.detailed[i].count;
            qualificaçãoSum += count;
            qualificaçãoInfo += '\t' + e.rewardsInfo.detailed[i]._id + ': ' + numberWithCommas(count) + ' (' + ((count / e.rewardsInfo.total) * 100).toFixed(2) + '%)' + '\n';
        }
        if (qualificaçãoSum) {
            qualificaçãoInfo += '```\n';
            response += qualificaçãoInfo;
        }


        //Tempo médio para qualificação das rewards

        if (e.avgTimeQualification) {
            response += '```\n';
            response += 'Tempo médio para qualificação das rewards: ' + formatMinutes(e.avgTimeQualification) + '\n';
            response += '```\n';
        }

        //Quantidade média de fallbacks por reward criada

        if (e.avgFallback) {
            response += '```\n';
            response += 'Percentual de fallbacks por reward criada: ' + e.avgFallback.toFixed(2) + '% ' + '\n';
            response += '```\n';
        }
        //Tempo médio para escolha do novo prêmio no processo de fallback

        if (e.avgChooseTime) {
            response += '```\n';
            response += 'Tempo médio para escolha do novo prêmio no processo de fallback: ' + formatMinutes(e.avgChooseTime) + '\n';
            response += '```\n';
        }
        //Tempo médio para conclusão das rewards (com sucesso ou falhar) em projetos ​com e sem​ fallback 

        if (e.fallbackAvgConclusion || e.avgConclusion) {
            response += '```\n';
            response += 'Tempo médio para conclusão das rewards: ' + '\n';
            if (e.avgConclusion) {
                response += '\tno ciclo regular: ' + formatMinutes(e.avgConclusion) + '\n';
            }
            if (e.fallbackAvgConclusion) {
                response += '\tno ciclo fallback: ' + formatMinutes(e.fallbackAvgConclusion) + '\n';
            }
            response += '```\n';
        }

        //Media de fallback per rewards de com fallback
        if (e.avgFallbackPerReward) {
            response += '```\n';
            response += 'Média de fallbacks por reward que gerou fallback: ' + e.avgFallbackPerReward.toFixed(2) + '\n';
            response += '```\n';
        }

        //Eficiencia do Fallback
        if (e.fallbackEffectiveness) {
            response += '```\n';
            response += 'Efetividade de entrega do Fallback: ' + e.fallbackEffectiveness.toFixed(2) + '% ' + '\n';
            response += '```\n';
        }

        return response;
    } else {
        var response = 'Desculpe, @' + userName + '. Não consegui informaçao sobre aquela experiência. :thinking_face:\n';
        response += '_Dica: Verifique se digitou corretamente o nome da sua experiência e retente._\n';
        return response;
    }

}

module.exports.getConsumerData = function(consumer, callback) {

    //http://localhost:3000
    //|
    request.get('' + consumer, {
        'auth': {
            ''
        }
    }, function(error, res, body) {
        callback(body);
    });
}

module.exports.formatUserProfile = function(userName, consumer) {
    //console.log(' consumer ', consumer);
    c = JSON.parse(consumer);
    if (c) {
        var response = '```';
        response += 'Engagement points: ' + (c.rank ? (c.rank + '\n') : ('não informado\n'));
        response += 'Consumer: ' + (c.mobile ? (c.mobile + '\n') : ('não informado\n'));
        response += 'Name    : ' + (c.name ? (c.name + '\n') : ('não informado\n'));
        response += 'Email   : ' + (c.email ? (c.email + '\n') : ('não informado\n'));
        response += 'Birthday: ' + (c.birthday ? (c.birthday + '\n') : ('não informado\n'));
        response += 'Facebook: ' + (c.facebook ? ('http://www.facebook.com/' + c.facebook + '\n') : ('não informado\n'));
        response += 'Client  : ' + ((c.client && c.client === 'App') ? (c.client + (c.clientVersion ? ' v' + c.clientVersion : '')) : 'SMS') + '\n';
        response += 'Operator: ' + (c.operator ? (c.operator + '\n') : ('não informado\n'));
        if (c.tags) {
            response += 'Tags:\n';
            for (var i in c.tags) {
                response += '\t - ' + c.tags[i] + '\n';
            }
        }
        response += '```';
        return response;
    } else {
        var response = 'Desculpe, @' + userName + '. Não consegui informaçao sobre aquele cliente. :thinking_face:\n';
        response += '_Dica: Verifique se digitou corretamente o número de telefone ou email._\n';
        return response;
    }
}

//http://localhost:3000
//|
module.exports.getUserProfile = function(_mobile, callback) {
    var options = {
        url: '',
        headers: {
            ''
        }
    };


    request.get(options, function(error, res, body) {
        if (error) {
            return callback(error);
        } else {
            return callback(body);
        }

    });
}

//aplicar para todo el output
function numberWithCommas(x) {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
        return 0;
    }

}