const httpStatus = require('http-status');
const { Activities } = require('../models/Activities');
const { arrayDataActivities } = require('../helpers/customResponse');

const createActivities = async (req, res) => {
  try {
    const { title, email } = req.body;

    if (!title || title.length < 0) throw Error('Title can\'t be empty');

    const created = await Activities.create({ title, email });

    res.send(created);
  } catch (error) {
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
      const response = arrayDataActivities(value);

      arrayResponse.push(response);
    });

    res.sendWrapped('Success', arrayResponse, httpStatus.OK);
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};

module.exports = {
  createActivities,
  getAllActivities,
};
