const httpStatus = require('http-status');
const { dataTodos } = require('../helpers/customResponse');
const { Todos } = require('../models/Todos');

const createTodoes = async (req, res) => {
  const { activity_group_id, title } = req.body;

  try {
    if (!activity_group_id) return res.sendWrapped('activity_group_id cannot be null', {}, httpStatus.BAD_REQUEST);
    if (!title) return res.sendWrapped('title cannot be null', {}, httpStatus.BAD_REQUEST);

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

module.exports = {
  createTodoes,
};
