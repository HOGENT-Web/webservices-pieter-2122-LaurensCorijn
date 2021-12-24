const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

const findAll = ({
    limit,
    offset,
}) => {
    return getKnex()(tables.user)
        .select()
        .limit(limit)
        .offset(offset)
        .orderBy('firstName','ASC');
};

const findById = (id) => {
    return getKnex()(tables.user)
    .where('id',id)
    .first();
}

const create = async({
    firstname,
    lastname,
    email,
    passwordHash,
    roles,
}) => {
    try{
        const id = uuid.v4();
        await getKnex()(tables.user)
        .insert({
            id,
            firstname,
            lastname,
            email,
            password_hash: passwordHash,
            roles: JSON.stringify(roles),
        });
        return await findById(id);
    }catch(error){
        const logger = getChildLogger('user-repo');
        logger.error('Error in create',{
            error,
        });
        throw error;
    }
};

const updateById = async(id,{
    firstname,
    lastname,
}) => {
    try{
        await getKnex()(tables.user)
            .update({
                firstname,
                lastname,
            }).where('id',id);
        return await findById(id);
    } catch(error){
        const logger = getChildLogger('user-repo');
        logger.error('Error in update', {
            error,
        });
        throw error;
    }
}

const deleteById = async(id) => {
    try{
        const rowsAffected = await getKnex()(tables.user)
            .delete()
            .where('id',id);
        return rowsAffected > 0;
    }catch(error)
    {
        const logger = getChildLogger('user-repo');
        logger.error('Error in delete',{
            error,
        });
        throw error;
    }
}

const findByEmail = (email) => {
    return getKnex()(tables.user)
      .where('email', email)
      .first();
  };

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByEmail,
}