const httpStatus = require('http-status');
const { Activities } = require('../models/Activities');
const { dataActivities } = require('../helpers/customResponse');

const createActivities = async (req, res) => {
  try {
    const { title, email } = req.body;

    if (!title || title.length < 0) throw Error('Title can\'t be empty');

    const created = await Activities.create({ title, email });

    const response = dataActivities(created);

    res.sendWrapped('Success', response, httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.send({ status: 500, message: error });
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activities.findAll();

    if (!activities) throw new Error('Fail to get all activities.');

    if (activities.length < 0) return res.send({ message: 200, data: activities });

    const arrayResponse = [];

    activities.forEach(async (value) => {
      const response = dataActivities(value);

      arrayResponse.push(response);
    });

    res.sendWrapped('Success', arrayResponse, httpStatus.OK);
  } catch (error) {
    console.log(error);
    res.send({ status: 500, message: error });
  }
};

const getOneActivities = async (req, res) => {
  const { idActivities } = req.params;
  try {
    const activities = await Activities.findByPk(idActivities);

    if (!activities) return res.sendWrapped('Not Found', {}, httpStatus.NOT_FOUND);

    const response = dataActivities(activities);

    res.sendWrapped('Success', response, httpStatus.OK);
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: error });
  }
};

const updatePatchActivities = async (req, res) => {
  const { idActivities } = req.params;
  const requestBody = req.body;

  try {
    const activities = await Activities.findByPk(idActivities);

    if (!activities) return res.sendWrapped('Not Foind', {}, httpStatus.NOT_FOUND);

    const update = await Activities.update(requestBody, {
      where: {
        id: idActivities,
      },
    });

    if (update[0] === 0) return res.sendWrapped('Fail to update', {}, httpStatus.CONFLICT);

    const afterUpdate = await Activities.findByPk(idActivities);

    const response = dataActivities(afterUpdate);

    res.sendWrapped('Success', response, httpStatus.OK);
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: error });
  }
};

module.exports = {
  createActivities,
  getAllActivities,
  getOneActivities,
  updatePatchActivities,
};
