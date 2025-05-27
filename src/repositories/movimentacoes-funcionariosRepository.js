const db = require('../config/db');

const getAllMovimentacoes = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM movimentacoes ORDER BY data_movimentacao DESC';
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllMovimentacoes
};
