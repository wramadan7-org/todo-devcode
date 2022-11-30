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

module.exports = {
  createActivities,
  getAllActivities,
};
