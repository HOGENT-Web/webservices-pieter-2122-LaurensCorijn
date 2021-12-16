const { DataTypes, Model} = require('sequelize');

class Doctor extends Model{
    /** @type {UUID} */
    doc_id;

    /** @type {string} */
    doc_firstname;

    /** @type {string} */
    doc_lastname;

    /** Department toevoegen */

    static initialize(sequelize){
        Doctor.init({
            doc_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            doc_firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            doc_lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },{
            sequelize,
            modelName: 'Doctor',
            tableName: 'doctors',
            freezeTableName: true,
            timestamps: false,
            deletedAt: false,
        });
    }
}

module.exports = Doctor;