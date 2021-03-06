module.exports = function(app){
    const mongoose = require('mongoose');
	const Schema = mongoose.Schema;
    const ObjectId = Schema.Types.ObjectId;

	const team = Schema({
		date_init: { type: Date, required: true },
		date_end:  { type: Date, required: true },
		trainees: [{ type: ObjectId, ref: 'User' }],
		days: [{ type: ObjectId, ref: 'Day' }],
        mac_ap : [{ type: String, required: true }],
        name: { type: String },
        distance: { type: Number },
        percent: { type: Number },
        detect_type: { type: String }
	});

	team.statics.getAll = function (callback) {
		this.find({}).populate('days').populate('trainees').exec(callback);
	};

    team.statics.getTraineeTeams = function (_idTrainee, callback) {
        this.find({'trainees' : mongoose.Types.ObjectId(_idTrainee) }).populate('days').populate('trainees').exec(callback);
    };

    team.statics.findById = function (idTeam, callback) {
        this.findOne({'_id': idTeam}).populate('days').exec(callback);
    };

    team.statics.findByIdAndDay = function (idTeam, idDay, callback) {
        this.findOne({'_id' : idTeam}).populate('days').exec(function (err, team) {
            if(err){
                callback(err, team);
            }else {
                if(!team) {
                    callback(null, null)
                }else {
                    const sameDay = team.days.some(function (day) {
                        return day.date.id === idDay;
                    });
                    if (sameDay) {
                        callback(null, team)
                    }else {
                        callback(null, null)
                    }
                }
            }

        });
    };

	team.statics.create = function (team, trainees, days, callback) {
        const _team = new this();
        _team.date_init = team.date_init;
        _team.date_end = team.date_end;
        _team.trainees = [];
        _team.days = days;
        _team.mac_ap = team.mac_ap;
        _team.name = team.name;
        _team.distance = team.distance;
        _team.percent = team.percent;
        _team.detect_type = team.detect_type;

        trainees.forEach(_idTrainee => _team.trainees.push(mongoose.Types.ObjectId(_idTrainee)));

        _team.save(callback);

    };

	return global.db.model('Team', team);

};
