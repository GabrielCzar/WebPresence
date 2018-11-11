module.exports = function (app) {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const day = Schema({
        date: { day_name: String, id: Number },
        time_init: { type: String, required: true },
        time_end:  { type: String, required: true },
        check_presence: [{ time_init: String, duration: String }]
    });

    day.statics.create = function (day, callback) {
        const _day = new this();
        _day.date = { day_name: day.name, id: day.id };
        _day.time_init = day.time_init;
        _day.time_end = day.time_end;
        _day.check_presence = day.checkTimes;

        return _day.save(callback);
    };

    return global.db.model('Day', day);
};
