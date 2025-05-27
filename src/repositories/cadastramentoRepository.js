const db = require('../config/db');

const cadastrarPecas = (pecas) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO estoque (codigo, nome, quantidade, descricao, localizacao, valor) VALUES ?';
        const values = pecas.map(peca => [
            peca.codigo,
            peca.nome,
            peca.quantidade,
            peca.descricao,
            peca.localizacao,
            peca.valor
        ]);
        
        db.query(query, [values], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    cadastrarPecas 
};