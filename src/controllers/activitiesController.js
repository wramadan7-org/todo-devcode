const httpStatus = require('http-status');
const { dataActivities } = require('../helpers/customResponse');
const catchAsync = require('../helpers/catchAsync');
const { generateRandomString } = require('../helpers/randomString');
const { Activities } = require('../models/Activities');

const createActivities = catchAsync(async (req, res) => {
  let { title, email } = req.body;

  if (!email || email.length === 0) {
    const random = generateRandomString(7);
    email = `${random}@gmail.com`;
  }

  if (!title || title.length === 0) return res.sendWrapped('title cannot be null', {}, httpStatus.BAD_REQUEST);

  const data = { title, email };

  const created = await Activities.create(data);

  const response = dataActivities(created);

  res.sendWrapped('Success', response, httpStatus.CREATED);
});

const getAllActivities = catchAsync(async (req, res) => {
  const activities = await Activities.findAll();

  if (!activities) return res.sendWrapped('Fail to get all activities.', [], httpStatus.CONFLICT);

  if (activities.length < 0) return res.sendWrapped('Success', activities, httpStatus.OK);

  const arrayResponse = [];

  activities.forEach(async (value) => {
    const response = dataActivities(value);

    arrayResponse.push(response);
  });

  res.sendWrapped('Success', arrayResponse, httpStatus.OK);
});

const getOneActivities = catchAsync(async (req, res) => {
  const { idActivities } = req.params;

  const activities = await Activities.findByPk(idActivities);

  if (!activities) return res.sendWrapped(`Activity with ID ${idActivities} Not Found`, {}, httpStatus.NOT_FOUND);

  const response = dataActivities(activities);

  res.sendWrapped('Success', response, httpStatus.OK);
});

const updatePatchActivities = catchAsync(async (req, res) => {
  const { idActivities } = req.params;
  const requestBody = req.body;

  const activities = await Activities.findByPk(idActivities);

  if (!activities) return res.sendWrapped(`Activity with ID ${idActivities} Not Found`, {}, httpStatus.NOT_FOUND);

  if (!requestBody.title || requestBody.title.length === 0) return res.sendWrapped('title cannot be null', {}, httpStatus.BAD_REQUEST);

  const update = await Activities.update(requestBody, {
    where: {
      id: idActivities,
    },
  });

  const afterUpdate = await Activities.findByPk(idActivities);

  const response = dataActivities(afterUpdate);

  res.sendWrapped('Success', response, httpStatus.OK);
});

const deleteActivies = catchAsync(async (req, res) => {
  const { idActivities } = req.params;

  const activities = await Activities.findByPk(idActivities);

  if (!activities) return res.sendWrapped(`Activity with ID ${idActivities} Not Found`, {}, httpStatus.NOT_FOUND);

  await Activities.destroy({
    where: {
      id: idActivities,
    },
  });

  res.sendWrapped('Success', {}, httpStatus.OK);
});

module.exports = {
  createActivities,
  getAllActivities,
  getOneActivities,
  updatePatchActivities,
  deleteActivies,
};
