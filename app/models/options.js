
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('options', {
		option_id: { 
			primaryKey: true, 
			type: Sequelize.INTEGER
		},
		question_id: { 
			primaryKey: true, 
			type: Sequelize.INTEGER,
			references: {
				model: 'question',
				key: 'question_id'
			}
		},
		option_text: {
			type: Sequelize.TEXT
		},
		is_correct: {
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
    	tableName: 'options'
  	});


}