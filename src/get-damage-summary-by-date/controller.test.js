const assert = require('assert');
const controller = require('./controller');

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
}

(async () => {
    try {
        const dateStart = '2023-12-22';
        const dateEnd = '2024-01-05';

        assert.ok(new Date(dateStart) <= new Date(dateEnd), 'dateStart deve ser menor ou igual a dateEnd');

        const result = await controller.execute(dateStart, dateEnd);

        assert.ok(Array.isArray(result), 'O resultado deve ser um array');

        assert.ok(result.length > 0, 'O array de resultados não deve estar vazio');

        result.forEach((summary, index) => {
            assert.strictEqual(typeof summary, 'object', `O elemento ${index} no array deve ser um objeto`);

            assert.ok(summary.hasOwnProperty('date'), 'Propriedade "date" não encontrada no objeto');

            assert.ok(isValidDate(summary.date), `A data ${summary.date} não está em um formato válido`);

            console.log(`Dados de retorno para o elemento ${index}:`, summary);
        });

        console.log('Teste bem-sucedido!');
    } catch (error) {
        console.error('Erro no teste:', error.message);
    }
})();
