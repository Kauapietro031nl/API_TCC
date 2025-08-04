const bcrypt = require('bcrypt');
const repository = require('../repositories/funcionariosRepository');

module.exports = {
  getAll: (search) => repository.findAll(search),
  getById: (id) => repository.findById(id),

  create: async (data) => {
    if (data.senha) {
      const saltRounds = 10;
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }
    return repository.create(data);
  },

  update: async (id, data) => {
    if (data.senha) {
      const saltRounds = 10;
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }
    return repository.update(id, data);
  },

  remove: (id) => repository.remove(id),
};
