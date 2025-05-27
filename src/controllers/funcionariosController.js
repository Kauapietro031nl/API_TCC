const service = require('../services/funcionarioService');

module.exports = {
  async getAll(req, res, next) {
    try {
      const search = req.query.search || null;
      const employees = await service.getAll(search);
      res.json({ success: true, employees });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const employee = await service.getById(req.params.id);
      res.json({ success: true, employee });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      await service.create(req.body);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      await service.update(req.params.id, req.body);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await service.remove(req.params.id);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
};
