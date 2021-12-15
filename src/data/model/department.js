const { DataTypes, Model} = require('sequelize');

class Department extends Model{
    /** @type {string} */
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
                type: DataTypes.CHAR(50),
                allowNull: false,
                primaryKey: true,
            },
            dept_name: {
                type: DataTypes.CHAR(50),
                allowNull: false,
            },
            dept_location: {
                type: DataTypes.CHAR(50),
                allowNull: false,
            },
            dept_hospital: {
                type: DataTypes.CHAR(50),
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