const { uuid } = require("uuidv4");

let data = [];

class TodoController {
  async index(req, res) {
    return res.json(data);
  }

  async show(req, res) {
    const todo = data.find((todo) => todo.id === req.params.id);

    if (todo) {
      return res.json(todo);
    }

    res.status(403).json({ error: "Todo não encontrado!" });
  }

  async store(req, res) {
    const { title, description, owner, endDate } = req.body;

    const todo = {
      id: uuid(),
      title,
      description,
      owner,
      // CREATRED, INPROGRESS, FINALIZED
      status: "CREATRED",
      endDate,
      createdAt: new Date(),
    };

    data.push(todo);

    return res.json(todo);
  }

  async update(req, res) {
    const index = data.findIndex((todo) => todo.id === req.params.id);

    if (index > -1) {
      data[index] = { ...data[index], ...req.body };

      return res.json(data[index]);
    }

    return res.status(403).json({ error: "Todo não encontrado!" });
  }

  async destroy(req, res) {
    const index = data.findIndex((todo) => todo.id === req.params.id);

    if (index > -1) {
      data.splice(index, 1);

      return res.send();
    }

    return res.status(403).json({ error: "Todo não encontrado!" });
  }
}

module.exports = new TodoController();
