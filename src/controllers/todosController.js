const httpStatus = require('http-status');
const { dataTodos } = require('../helpers/customResponse');
const { Activities } = require('../models/Activities');
const { Todos } = require('../models/Todos');

const createTodos = async (req, res) => {
  const { activity_group_id, title } = req.body;

  try {
    if (!activity_group_id) return res.sendWrapped('activity_group_id cannot be null', {}, httpStatus.BAD_REQUEST);
    if (!title) return res.sendWrapped('title cannot be null', {}, httpStatus.BAD_REQUEST);

    const checkActivity = await Activities.findByPk(activity_group_id);

    if (!checkActivity) return res.sendWrapped(`Activity with ID ${activity_group_id} Not Found`, {}, httpStatus.BAD_REQUEST);

    const data = {
      activityGroupId: activity_group_id,
      title,
    };

    const created = await Todos.create(data);

    if (!created) return res.sendWrapped('Fail to create todo', {}, httpStatus.CONFLICT);

    const response = dataTodos(created);

    res.sendWrapped('Success', response, httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: error });
  }
};

const getAllTodos = async (req, res) => {
  const { activity_group_id } = req.query;

  try {
    let todos = [];

    if (activity_group_id) {
      todos = await Todos.findAll({
        where: {
          activityGroupId: activity_group_id,
        },
      });
    } else {
      todos = await Todos.findAll();
    }

    if (!todos) return res.sendWrapped('Fail to get all todo', [], httpStatus.CONFLICT);
    if (todos.length < 0) return res.sendWrapped('Success', [], httpStatus.OK);

    const arrayResponse = [];

    todos.forEach((value) => {
      const response = dataTodos(value);

      arrayResponse.push(response);
    });

    res.sendWrapped('Success', arrayResponse, httpStatus.OK);
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: error });
  }
};

module.exports = {
  createTodos,
  getAllTodos,
};
