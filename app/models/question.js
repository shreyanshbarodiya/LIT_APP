
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('question', {
		question_id: { 
			autoIncrement: true,
			primaryKey: true, 
			type: Sequelize.INTEGER
		},
		question_text: {
			type: Sequelize.TEXT
		},
		topic_name: {
			type: Sequelize.STRING,
	      	references: {
		        model: 'topic',
		        key: 'topic_name'
	      	}
		},
		subject_name: {
			type: Sequelize.STRING,
	      	references: {
		        model: 'topic',
		        key: 'subject_name'
	      	}
		},
		question_marks: {
			type: Sequelize.INTEGER
		},
		contains_image: {
			type: Sequelize.INTEGER
		},
		image_url: {
			type: Sequelize.STRING
		}
	}, {
    	timestamps: false,
    	tableName: 'question'
  	});


}