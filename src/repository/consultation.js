const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

const SELECT_COLUMNS = [
    `${tables.consultation}`, 'startingTime', 'endTime',
    `${tables.user}.id as user_id`, `${tables.doctor}.id as doctor_id`
];

const formatConsultation = ({ user_id, user_firstName, user_lastName, doctor_id, doctor_firstName, doctor_lastName, doctor_department_id, ...rest }) => ({
    ...rest,
    user: {
        id: user_id,
        firstName: user_firstName,
        lastName: user_lastName,
    },
    doctor: {
        id: doctor_id,
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        department_id: doctor_department_id,
    },
});

const findAll = async({
    limit,
    offset
}) => {
    const consultations = await getKnex()(tables.consultation)
        .select(SELECT_COLUMNS)
        .join(tables.user, `${tables.consultation}.user_id`,'=',`${tables.user}.id`)
        .join(tables.doctor, `${tables.consultation}.doctor_id`,'=',`${tables.doctor}.id`)
        .limit(limit)
        .offset(offset)
        .orderBy('startingTime','ASC');
    return consultations.map(formatConsultation);    
};

const findById = async (id) => {
    const consultation = await getKnex()(tables.consultation)
        .first(SELECT_COLUMNS)
        .where(`${tables.consultation}.id`,id)
        .join(tables.user, `${tables.consultation}.user_id`,'=',`${tables.user}.id`)
        .join(tables.doctor, `${tables.consultation}.doctor_id`,'=',`${tables.doctor}.id`)
    return consultation && formatConsultation(consultation);    
};

const create = async({
    firstName,
    lastName,
    userId,
    doctorId,
}) => {
    try{
        const id = uuid.v4();
        await getKnex()(tables.consultation)
            .insert({
                id,
                firstName,
                lastName,
                user_id: userId,
                doctor_id: doctorId
            });
            return await findById(id);
    } catch(error)
    {
        const logger = getChildLogger('consultations-repo');
        logger.error('Error in create', {
            error,
        });
        throw error;
    }
};

const updateById = async(id, {
    firstName,
    lastName,
    userId,
    doctorId,
}) => {
    try{
        await getKnex()(tables.consultation)
            .update({
                firstName,
                lastName,
                user_id: userId,
                doctor_id: doctorId
            })
            .where(`${tables.consultation}.id`,id);
            return await findById(id);
        }catch(error)
        {
            const logger = getChildLogger('consultations-repo');
            logger.error('Error in updateById', {
                error,
            });
            throw error;
        }
};

const deleteById = async (id) => {
    try{
        const rowsAffected = await getKnex()(tables.consultation)
            .delete()
            .where(`${tables.consultation}.id`,id);
            return rowsAffected > 0;
    } catch(error)
    {
        const logger = getChildLogger('consultations-repo');
        logger.error('Error in deleteById', {
            error
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