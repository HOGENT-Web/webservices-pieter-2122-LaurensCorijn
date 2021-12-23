const config = require('config');
const {getChildLogger} = require('../core/logging');
const doctorRepository = require('../repository/doctor');

const DEFAULT_PAGINATION_LIMIT = config.get('pagination.limit');
const DEFAULT_PAGINATION_OFFSET = config.get('pagination.offset');

const debugLog = (message, meta = {}) => {
  if(!this.logger)this.logger = getChildLogger('doctor-service');
  this.logger.debug(message,meta);
};

const getAll = async(
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = DEFAULT_PAGINATION_OFFSET,
) => {
  debugLog('Fetching all doctors', {limit, offset});
  const data = await doctorRepository.findAll({limit, offset});
  return{
    data,
    limit,
    offset
  };
};

const getById = async (id) => {
  debugLog(`Fetching doctor with id ${id}`);
  const doctor = await doctorRepository.findById(id);

  if(!doctor)
  {
    throw new Error(`There is no doctor with id ${id}`);
  }
  return doctor;
};

const create = async({ firstName, lastName, departmentId}) => {
  debugLog('Creating new doctor', {firstName, lastName, departmentId});
  return doctorRepository.create({firstName, lastName, departmentId});
};

const updateById = async (id, {firstName, lastName, departmentId}) => {
  debugLog(`Updating doctor with id ${id}`,{
    firstName, lastName, departmentId
  });
  return doctorRepository.updateById(id, {firstName, lastName, departmentId});
};

const deleteById = async (id) => {
  debugLog(`Deleting doctor with id ${id}`);
  await doctorRepository.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
	updateById,
	deleteById,
}