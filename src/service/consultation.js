let {CONSULTATIONS} = require('../data/mock_data');

const getAll = () => {
	return { data: CONSULTATIONS , count: CONSULTATIONS.length };
}	

module.exports = {
  getAll
}