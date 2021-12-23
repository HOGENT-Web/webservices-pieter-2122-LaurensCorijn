const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

const SELECT_COLUMNS = [
    `${tables.doctor}.id`,'firstName','lastName',
    `${tables.department}.id as department_id`,`${tables.department}.name as department_name`,
    `${tables.department}.location as department_location`, `${tables.department}.hospital as department_hospital`,
];

const formatDoctor = ({ department_id, department_name, department_location, department_hospital, ...rest}) => ({
    ...rest,
    department: {
        id: department_id,
        name: department_name,
        location: department_location,
        hospital: department_hospital
    }
});

const findAll = async({
    limit,
    offset,
}) => {
    const doctors = await getKnex()(tables.doctor)
        .select(SELECT_COLUMNS)
        .join(tables.department, `${tables.doctor}.department_id`,'=', `${tables.department}.id`)
        .limit(limit)
        .offset(offset)
        .orderBy('firstName','ASC');

    return doctors.map(formatDoctor);    
};

const findById = async (id) => {
    const doctor = await getKnex()(tables.doctor)
        .first(SELECT_COLUMNS)
        .where(`${tables.doctor}.id`,id)
        .join(tables.department, `${tables.doctor}.department_id`,'=',`${tables.department}.id`)

    return doctor && formatDoctor(doctor);    
};

const create = async ({
    firstName,
    lastName,
    departmentId
}) => {
    try{
        const id = uuid.v4();
        await getKnex()(tables.doctor)
            .insert({
                id,
                firstName,
                lastName,
                department_id: departmentId,
            });
        return await findById(id);    
    } catch(error) {
        const logger = getChildLogger('doctors-repo');
        logger.error('Error in create', {
            error,
        });
        throw error;
    }
};

  const updateById = async(id, {
      firstName,
      lastName,
      departmentId,
  }) => {
      try{
          await getKnex()(tables.doctor)
            .update({
                firstName,
                lastName,
                department_id: departmentId,
            })
            .where(`${tables.doctor}.id`,id);
          return await findById(id);  
      } catch(error){
          const logger = getChildLogger('doctors-repo');
          logger.error('Error in updateById', {
              error,
          });
          throw error;
      }
  };

  const deleteById = async (id) => {
      try {
          const rowsAffected = await getKnex()(tables.doctor)
            .delete()
            .where(`${tables.doctor}.id`,id);
            return rowsAffected > 0;
      } catch(error){
          const logger = getChildLogger('doctors-repo');
          logger.error('Error in deleteById', {
              error,
          });
          throw error;
      }
  };


module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};