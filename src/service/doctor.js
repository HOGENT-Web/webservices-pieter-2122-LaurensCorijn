const {getChildLogger} = require('../core/logging');
let {DOCTORS} = require('../data/mock_data');

const debugLog = (message, meta = {}) => {
  if(!this.logger)this.logger = getChildLogger('doctor-service');
  this.logger.debug(message,meta);
};

const getAll = () => {
  debugLog('Fetching all doctors');
	return { data: DOCTORS, count: DOCTORS.length };
}	

const getById = (id) => {
  debugLog(`Fetching doctor with id ${id}`);
  return DOCTORS.filter((doctor) => doctor.id === id)[0];
}
const create;

const updateById;

const deleteById = (id) => {
  debugLog(`Deleting place with id ${id}`);
  DOCTORS = DOCTORS.filter((doctor) => doctor.id !== id);
}

module.exports = {
  getAll,
  getById,
  //create,
	//updateById,
	deleteById,
}