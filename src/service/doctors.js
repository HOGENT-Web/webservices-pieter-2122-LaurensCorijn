let {DOCTORS} = require('../data/mock_data');

const getAll = () => {
	return { data: DOCTORS, count: DOCTORS.length };
}	

module.exports = {
  getAll,
  //getById,
  //create,
	//updateById,
	//deleteById,
}