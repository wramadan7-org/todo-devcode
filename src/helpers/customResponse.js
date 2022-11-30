const dataActivities = (dataParam) => {
  const data = {
    id: dataParam.dataValues.id,
    email: dataParam.dataValues.email,
    title: dataParam.dataValues.title,
    created_at: dataParam.dataValues.createdAt,
    updated_at: dataParam.dataValues.updatedAt,
    deleted_at: dataParam.dataValues.deletedAt,
  };

  return data;
};

module.exports = {
  dataActivities,
};
