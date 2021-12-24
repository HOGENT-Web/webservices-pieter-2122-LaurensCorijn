const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
	await getKnex()(tables.consultation).delete();
	await getKnex()(tables.doctor).delete();
    await getKnex()(tables.user).delete();
	await getKnex()(tables.department).delete();

	await shutdownData();
};
