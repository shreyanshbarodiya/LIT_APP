
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('topic', {
		topic_name: { 
			primaryKey: true, 
			type: Sequelize.STRING
		},
		subject_name: {
			primaryKey: true,
			type: Sequelize.STRING,
	      	references: {
		        model: 'subject',
		        key: 'subject_name'
	      	}
		}
	}, {
    	timestamps: false,
    	tableName: 'topic'
  	});


}