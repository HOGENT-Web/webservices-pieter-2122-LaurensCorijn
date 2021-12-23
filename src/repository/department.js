const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

const findAll = ({
    limit,
    offset,
}) => {
    return getKnex()(tables.department)
        .select()
        .limit(limit)
        .offset(offset)
        .orderBy('id','ASC');
};

const findById = (id) => {
    return getKnex()(tables.department)
        .where('id',id)
        .first();
};

const findCount = async () => {
    const [count] = await getKnex()(tables.department)
        .count();
    return count['count(*)'];    
}

const create = async({
    name,
    location,
    hospital
}) => {
    try{
        const id = uuid.v4();
        await getKnex()(tables.department)
            .insert({
                id,
                name,
                location,
                hospital                
            });
        return await findById(id);    
    } catch(error)
    {
        const logger = getChildLogger('department-repo');
        logger.error('Error in create', {
            error
        });
        throw error;
    }
};

const updateById = async( id, {
    name, 
    location,
    hospital
}) => {
    try{
        await getKnex()(tables.department)
            .update({
                name,
                location,
                hospital
            }).where('id',id);
        return await findById(id);            
    }catch(error){
        const logger = getChildLogger('department-repo');
        logger.error('Error in update',{
            error
        });
        throw error;
    }
};

const deleteById = async (id) => {
    try{
        const rowsAffected = await getKnex()(tables.department)
            .delete()
            .where('id',id);

        return rowsAffected > 0;    
    }catch(error){
        const logger = getChildLogger('department-repo');
        logger.error('Error in delete',{
            error
        });
        throw error;
    }
    
};

module.exports = {
    findAll,
    findById,
    findCount,
    create,
    updateById,
    deleteById
};