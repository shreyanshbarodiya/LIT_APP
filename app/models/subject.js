
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('subject', {
		subject_name: { 
			primaryKey: true, 
			type: Sequelize.STRING
		}
	}, {
    	timestamps: false,
    	tableName: 'subject'
  	});


}