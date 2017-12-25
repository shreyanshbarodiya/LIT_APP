
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('teacher', {
		teacher_id: { 
			primaryKey: true, 
			type: Sequelize.STRING
		},
		name: {
			type: Sequelize.STRING
		},
		area_pincode: {
			type: Sequelize.INTEGER
		}
	}, {
    	timestamps: false,
    	tableName: 'teacher'
  	});


}