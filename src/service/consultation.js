const config = require('config');
const { getChildLogger } = require('../core/logging');
const consultationRepository = require('../repository/consultation');

const DEFAULT_PAGINATION_LIMIT = config.get('pagination.limit');
const DEFAULT_PAGINATION_OFFSET = config.get('pagination.offset');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('consultation-service');
	this.logger.debug(message, meta);
};

const getAll = async(
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = DEFAULT_PAGINATION_OFFSET,
) => {
  debugLog('Fetching all consultations', {limit, offset});
  const data = await consultationRepository.findAll({limit,offset});
  return{
    data,
    limit,
    offset
  };
};

const getById = async (id) => {
  debugLog(`Fetching consultation with id ${id}`);
  const consultation = await consultationRepository.findById(id);

  if(!consultation){
    throw new Error(`There is no consultation with id ${id}`);
  }
  return consultation;
}

const create = async ({ startingtime, endtime, userId, doctorId}) => {
  debugLog('Creating new consultation', {startingtime, endtime, userId, doctorId});

  return consultationRepository.create({
    startingtime, endtime, userId, doctorId
  });
};

const updateById = async (id, {startingtime, endtime, userId, doctorId}) => {
  debugLog(`Updating consultation with id ${id}`, {
    startingtime, endtime, userId, doctorId
  });

  return consultationRepository.updateById(id, {startingtime, endtime, userId, doctorId});
};

const deleteById = async (id) => {
  debugLog(`Deleting consultation with id ${id}`);
  await consultationRepository.deleteById(id);
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};