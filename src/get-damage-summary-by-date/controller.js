const repository = require('./repository');

module.exports = {
    async execute(dateStart, dateEnd) {
        const dbAlerts = await repository.execute(dateStart, dateEnd);

        return dbAlerts
            .reduce((result, alert) => {
                const dateAlreadySummarized = result.find(({ date }) => date === alert.date);

                const {
                    damages: oldDamages,
                    maxDamageEvent: oldMaxDamageEvent,
                    minDamageEvent: oldMinDamageEvent,
                } = dateAlreadySummarized || {};

                const date = alert.date;
                const damages = (oldDamages || []).concat([alert.damage]);
                let maxDamageEvent = alert;
                if (oldMaxDamageEvent && oldMaxDamageEvent.damage > alert.damage) {
                    maxDamageEvent = oldMaxDamageEvent;
                }

                let minDamageEvent = alert;
                if (oldMinDamageEvent && oldMinDamageEvent.damage < alert.damage) {
                    minDamageEvent = oldMinDamageEvent;
                }

                if (dateAlreadySummarized) {
                    dateAlreadySummarized.damages = damages;
                    dateAlreadySummarized.maxDamageEvent = maxDamageEvent;
                    dateAlreadySummarized.minDamageEvent = minDamageEvent;
                } else {
                    result.push({
                        date,
                        damages,
                        maxDamageEvent,
                        minDamageEvent,
                    });
                }

                return result;
            }, [])
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((summary) => {
                // Correção
                if (summary.damages && summary.damages.length > 0) { // Verifica se há 'damages'
                    summary.avgDamage = summary.damages.reduce((result, damage) => result + damage, 0) / summary.damages.length;
                    delete summary.damages;
                } else {
                    summary.avgDamage = 0;
                    delete summary.damages;
                }
                return summary;
            });
    },
};
