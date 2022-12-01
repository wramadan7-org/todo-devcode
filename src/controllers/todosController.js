const httpStatus = require('http-status');
const {
  priority,
} = require('../constants/todosConstant');
const { dataTodos } = require('../helpers/customResponse');
const { Activities } = require('../models/Activities');
const catchAsync = require('../helpers/catchAsync');
const { Todos } = require('../models/Todos');

const createTodos = catchAsync(async (req, res) => {
  const { activity_group_id, title } = req.body;

  if (!activity_group_id) return res.sendWrapped('activity_group_id cannot be null', {}, httpStatus.BAD_REQUEST);
  if (!title || title.length === 0) return res.sendWrapped('title cannot be null', {}, httpStatus.BAD_REQUEST);

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
});

const getAllTodos = catchAsync(async (req, res) => {
  const { activity_group_id } = req.query;

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
});

const getOneTodos = catchAsync(async (req, res) => {
  const { idTodo } = req.params;

  const todo = await Todos.findOne({
    where: {
      id: idTodo,
    },
  });

  if (!todo) return res.sendWrapped(`Todo with ID ${idTodo} Not Found`, {}, httpStatus.NOT_FOUND);

  const response = dataTodos(todo);

  res.sendWrapped('Success', response, httpStatus.OK);
});

const updatePatchTodos = catchAsync(async (req, res) => {
  const { idTodo } = req.params;
  const requestBody = req.body;
  const {
    VERYHIGH, HIGH, MEDIUM, LOW, VERYLOW,
  } = priority;

  let isActive;

  const todo = await Todos.findByPk(idTodo);

  if (!todo) return res.sendWrapped(`Todo with ID ${idTodo} Not Found`, {}, httpStatus.NOT_FOUND);

  if (requestBody.title?.length === 0) return res.sendWrapped('title cannot be null', {}, httpStatus.BAD_REQUEST);
  if (requestBody?.is_active && typeof requestBody?.is_active !== 'boolean') return res.sendWrapped('is_active only contain boolean', {}, httpStatus.BAD_REQUEST);
  if ((requestBody?.priority || requestBody.priority?.length === 0) && (requestBody.priority !== VERYHIGH && requestBody.priority !== HIGH && requestBody.priority !== MEDIUM && requestBody.priority !== LOW && requestBody.priority !== VERYLOW)) return res.sendWrapped(`priority is only contain ${VERYHIGH}, ${HIGH}, ${MEDIUM}, ${LOW}, ${VERYLOW}`, {}, httpStatus.BAD_REQUEST);

  const getKey = Object.keys(requestBody);

  const checkKey = getKey.some((value) => value === 'is_active');

  if (checkKey) {
    isActive = requestBody.is_active;

    delete Object.assign(requestBody, { isActive }).is_active;
  }

  const update = await Todos.update(requestBody, {
    where: {
      id: idTodo,
    },
  });

  const afterUpdate = await Todos.findByPk(idTodo);

  const response = dataTodos(afterUpdate);

  res.sendWrapped('Success', response, httpStatus.OK);
});

const deleteTodos = catchAsync(async (req, res) => {
  const { idTodo } = req.params;

  const todo = await Todos.findByPk(idTodo);

  if (!todo) return res.sendWrapped(`Todo with ID ${idTodo} Not Found`, {}, httpStatus.NOT_FOUND);

  await Todos.destroy({
    where: {
      id: idTodo,
    },
  });

  res.sendWrapped('Success', {}, httpStatus.OK);
});

module.exports = {
  createTodos,
  getAllTodos,
  getOneTodos,
  updatePatchTodos,
  deleteTodos,
};
