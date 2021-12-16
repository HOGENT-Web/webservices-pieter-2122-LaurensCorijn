const { DataTypes, Model} = require('sequelize');

class Department extends Model{
    /** @type {UUID} */
    dept_id;

    /** @type {string} */
    dept_name;

    /** @type {string} */
    dept_location;

    /** @type {string} */
    dept_hospital;

    static initialize(sequelize){

        Department.init({
            dept_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            dept_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dept_location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dept_hospital: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'Department',
            tableName: 'departments',
            freezeTableName: true,
            timestamps: false,
            deletedAt: false,
        });
    }
}

module.exports = Department;