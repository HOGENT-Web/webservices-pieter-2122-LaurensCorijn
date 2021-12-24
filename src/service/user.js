const config = require('config');
const { getChildLogger } = require('../core/logging');
const userRepository = require('../repository/user');
const { verifyPassword, hashPassword } = require('../core/password');
const { generateJWT } = require('../core/jwt');
const Role = require('../core/roles');

const DEFAULT_PAGINATION_LIMIT = config.get('pagination.limit');
const DEFAULT_PAGINATION_OFFSET = config.get('pagination.offset');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('user-service');
	this.logger.debug(message, meta);
};

const getAll = async (
    limit = DEFAULT_PAGINATION_LIMIT,
    offset = DEFAULT_PAGINATION_OFFSET,
) => {
    debugLog('Fetching all users', {limit, offset});
    const data = await userRepository.findAll({limit, offset});
    const totalCount = await data.count();
    return {
        data,
        count: totalCount,
        limit,
        offset
    };
};

const getById = async (id) => {
    debugLog(`Fetching user with id ${id}`);
    const user = await userRepository.findById(id);

    if(!user) {
        throw new Error(`No user with id ${id} exists`,{id});
    }
    return user;
};

const updateById = (id, { firstName, lastName}) => {
    debugLog(`Updating user with id ${id}`, {firstName, lastName});
    return userRepository.updateById(id, {firstname, lastname});
};

const deleteById = async (id) => {
    debugLog(`Deleting user with id ${id}`);
    const deleted = await userRepository.deleteById(id);

    if(!deleted) {
        throw new Error(`No user with id ${id} exists`, { id });
    }
};

const register = async ({
    name,
    email,
    password,
  }) => {
    debugLog('Creating a new user', { name });
    const passwordHash = await hashPassword(password);
  
    const user = await userRepository.create({
      name,
      email,
      passwordHash,
      roles: [Role.USER],
    });
  
    return await makeLoginData(user);
  };

  const makeLoginData = async (user) => {
    const token = await generateJWT(user);
  
    return {
      user: makeExposedUser(user),
      token,
    };
  }; 

  const makeExposedUser = ({
    id, firstname, lastname, email,
  }) => ({
    id, firstname, lastname, email,
  });


  const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
  
    if (!user) {
      throw ServiceError.unauthorized('The given email and password do not match');
    }
  
    const passwordValid = await verifyPassword(password, user.password_hash);
  
    if (!passwordValid) {
      throw ServiceError.unauthorized('The given email and password do not match');
    }
  
    return await makeLoginData(user);
  };

  const checkAndParseSession = async (authHeader) => {
    if(!authHeader){
      throw new Error('You need to signed in');
    }
    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authentication token');
    }
    const authToken = authHeader.substr(7);
	  try {
		  const {
			  roles, userId,
		    } = await verifyJWT(authToken);

		return {
			userId, roles, authToken,
		};
	} catch (error) {
		const logger = getChildLogger('user-service');
		logger.error(error.message, { error });
		throw new Error(error.message);
	}
  };

  const checkRole = (role, roles) => {
    const hasPermission = roles.includes(role);
  
    if (!hasPermission) {
      throw new Error('You are not allowed to view this part of the application');
    }
  };

module.exports = {
    getAll,
    getById,
    updateById,
    deleteById,
    register,
    login,
    checkAndParseSession,
    checkRole,
}