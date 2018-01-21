
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('submission', {
		email: { 
			primaryKey: true, 
			type: Sequelize.STRING,
			references: {
				model: 'student',
				key: 'email'
			}
		},
		question_id: { 
			primaryKey: true, 
			type: Sequelize.INTEGER,
			references: {
				model: 'question',
				key: 'question_id'
			}
		},
		correctAttempted : {
			type: Sequelize.INTEGER,
		},
		timeStamp : {
			type: Sequelize.TIME
		}

	}, {
    	timestamps: false,
    	tableName: 'submission'
  	});


}