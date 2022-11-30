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

const dataTodos = (dataParam) => {
  const data = {
    id: dataParam.dataValues.id,
    activity_group_id: dataParam.dataValues.activityGroupId,
    title: dataParam.dataValues.title,
    is_active: dataParam.dataValues.isActive,
    priority: dataParam.dataValues.priority,
    created_at: dataParam.dataValues.createdAt,
    updated_at: dataParam.dataValues.updatedAt,
    deleted_at: dataParam.dataValues.deletedAt,
  };

  return data;
};

module.exports = {
  dataActivities,
  dataTodos,
};
