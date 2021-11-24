let {DOCTORS} = require('../data/mock-data');
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