
module.exports = function(sequelize, Sequelize) {

	return sequelize.define('student', {
		username: {  
			type: Sequelize.STRING
		},
		name: { 
			type: Sequelize.STRING,
			notEmpty: true
		},
		password : {
			type: Sequelize.STRING 
		}, 
		email: {
			primaryKey: true,			
			type: Sequelize.STRING
		},
		class : {
			type: Sequelize.INTEGER
		},
		school : {
			type: Sequelize.STRING 
		},
		ph_no: {
			type: Sequelize.BIGINT
		},
		area_pincode: {
			type: Sequelize.INTEGER
		},
		math_teacher: {
			type: Sequelize.STRING,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		phy_teacher: {
			type: Sequelize.STRING,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		chem_teacher: {
			type: Sequelize.STRING,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		bio_teacher: {
			type: Sequelize.STRING,
			references: {
				model: 'teacher',
				key: 'teacher_id'
			}
		},
		overall_score: {
			type: Sequelize.INTEGER
		},
		today_score: {
			type: Sequelize.INTEGER
		},
		google_id: {
			type: Sequelize.STRING
		}

	}, {
    	timestamps: false,
    	tableName: 'student'
  	});


}