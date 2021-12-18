const uuid = require('uuid');
const { getChildLogger } = require('../core/logging');
//let {DEPARTMENTS} = require('../data/mock_data');
const departmentRepository = require('../repository/department');


const debugLog = (message, meta = {}) => {
  if(!this.logger)this.logger = getChildLogger('department-service');
  this.logger.debug(message, meta);
};	

const getAll = async (
	limit = 100,
	offset = 0,
) => {
	const data = await departmentRepository.findAll({ limit, offset });
	return {
		data,
		limit,
		offset
	};
};

const getById = (id) => {
  debugLog(`Fetching department with id ${id}`);
  return DEPARTMENTS.filter((department) => department.id == id)[0];
};

const create = ({name,location, hospital}) => {
  const newDepartment = {id: uuid.v4(), name, location, hospital};
  debugLog('Creating new department',newDepartment);
  DEPARTMENTS = [...DEPARTMENTS, newDepartment];
  return newDepartment;
}

const updateById = (id, {name, location, hospital}) => {
  debugLog(`Updating department with id ${id}`,{name,location,hospital});
  const index = DEPARTMENTS.findIndex((department) => department.id === id);

  if(index < 0) return null;

  const department = DEPARTMENTS[index];
  department.name = name;
  department.location  = location;
  department.hospital = hospital;

  return department;
}

const deleteById = (id) => {
  debugLog(`Deleting department with id ${id}`);
  DEPARTMENTS = DEPARTMENTS.filter((department) => department.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
	updateById,
	deleteById,
}