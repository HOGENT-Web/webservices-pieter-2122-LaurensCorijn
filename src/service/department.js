let {DEPARTMENTS} = require('../data/mock_data');

const getAll = () => {
	return { data: DEPARTMENTS , count: DEPARTMENTS.length };
}	


module.exports = {
  getAll,
  //getById,
  //create,
	//updateById,
	//deleteById,
}