module.exports = function () {
    const mongoose = require('mongoose');
	const Schema = mongoose.Schema;
	const ObjectId = mongoose.Schema.Types.ObjectId;

	const presence = Schema({
		date : { type: Date, default: Date.now },
		trainee: { type: Schema.Types.ObjectId, ref: 'User' },
		team: { type: Schema.Types.ObjectId, ref: 'team' },
        checks : { type: Number },
        percents : [{ type: Number }],
        average : { type: Number },
        valid : { type: Boolean },
        lastCheck: { type: Boolean, default: false }
	});

	presence.statics.getTraineePresences = function (idTeam, idTrainee, callback) {
		idTrainee = mongoose.Types.ObjectId(idTrainee);
		this.find({'team' : idTeam, 'trainee':idTrainee}).exec(callback);
	};

    presence.statics.checkTraineePresence = function (idTrainee, idTeam, callback) {
        idTrainee = ObjectId(idTrainee);
        idTeam = ObjectId(idTeam);

        const initDay = new Date();
        const endDay = new Date();

        //Setting the hours to 24 to get all presences until 00hrs
        initDay.setHours(1);
        endDay.setHours(24);

        this.findOne({'trainee' : idTrainee, 'team' : idTeam, 'date':{'$gt':initDay, '$lt':endDay}}).exec(callback);
    };


    presence.statics.doThePresence = function (idTrainee, idTeam, percents, callback) {
        const _pres = new this();
        _pres.team = idTeam;
        _pres.trainee = ObjectId(idTrainee);
        _pres.checks = 1;
        _pres.percents = percents;
        _pres.valid = false;
        _pres.average = 0;

        return _pres.save(callback);
    };

    presence.statics.update = function (idPresence, checks, percents, avg, isPresenceValid, callback) {
        this.findOneAndUpdate({_id : idPresence}, {$set : {average : avg, valid: isPresenceValid, checks : checks, percents : percents}}, {new: true}, callback);
    };

	return global.db.model('Presence', presence);
};