//const uuid = require('uuid');
//const { debug } = require('winston');
const config = require('config');
const { getChildLogger } = require('../core/logging');
//let {DEPARTMENTS} = require('../data/mock_data');
const departmentRepository = require('../repository/department');

const DEFAULT_PAGINATION_LIMIT = config.get('pagination.limit');
const DEFAULT_PAGINATION_OFFSET = config.get('pagination.offset');

const debugLog = (message, meta = {}) => {
  if(!this.logger)this.logger = getChildLogger('department-service');
  this.logger.debug(message, meta);
};	

const getAll = async (
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = DEFAULT_PAGINATION_OFFSET,
) => {
  debugLog('Fetching all departements', {limit, offset});
  const data = await departmentRepository.findAll({limit,offset});
  const count = await departmentRepository.findCount();
  return {data,count,limit,offset};
};

const getById = (id) => {
  debugLog(`Fecthing department with id ${id}`);
  return departmentRepository.findById(id);
};

const create = ({ name, location, hospital }) => {
  const newDepartment = { name, location, hospital };
  debugLog('Creating new department', newDepartment);
  return departmentRepository.create(newDepartment);
};

const updateById = (id, { name, location, hospital }) => {
  const updatedDepartment = { name, location, hospital };
  debugLog(`Updating department with id ${id}`, updatedDepartment);
  return departmentRepository.updateById(id, updatedDepartment);
};

const deleteById = async (id) => {
  debugLog(`Deleting department with id ${id}`);
  await departmentRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
	updateById,
	deleteById,
}