const db = require('../config/db');

exports.buscarProdutoPorCodigo = (codigo) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM estoque WHERE codigo = ?', [codigo], (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null);
        });
    });
};

exports.atualizarQuantidadeProduto = (produtoId, novaQuantidade) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE estoque SET quantidade = ? WHERE id = ?', [novaQuantidade, produtoId], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.inserirMovimentacao = ({ produto, funcionarioEmail, quantidade, tipoMovimentacao, observacao }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO movimentacoes (
                produto_id, produto_codigo, produto_nome, produto_descricao,
                quantidade, funcionario_email, observacao, tipo, data_movimentacao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                produto.id,
                produto.codigo,
                produto.nome,
                produto.descricao,
                quantidade,
                funcionarioEmail,
                observacao,
                tipoMovimentacao,
                new Date()
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId });
            }
        );
    });
};
