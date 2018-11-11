module.exports = (app) => {

	const User = app.models.user;
    const Presence = app.models.presence;
    const Team = app.models.team;

    return {

        getAllTrainees: async (req, res) => await User.getAllTrainees((err, trainees) => err ? res.json({ result: false, trainees: []}) : res.json({ result: true, trainees: trainees })),

        createAccount: function (req, res) {
            const user = req.body;
            User.insert(user, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({result: false, data: null});
                }
                return res.json({result: true, data: user});
            });
        },

        getTeamPresence: function (req, res) {
            let idTeam = req.params.idTeam;
            let idTrainee = req.params.idTrainee;

            Presence.getTraineePresences(idTeam, idTrainee, function (err, presences) {
                if (err) {
                    console.log(err);
                    return res.json({result: false, data: null});
                }
                return res.json({result: true, data: presences});
            });
        },

        checkPresence: function (req, res) {
            let idTrainee = req.body.idTrainee;
            let idTeam = req.body.idTeam;

            Presence.checkTraineePresence(idTrainee, idTeam, function (err, presence) {
                if (err) {
                    res.json({result: false, data: null});
                } else {
                    //The Trainee does not have the presence for today.
                    if (presence.length === 0) {
                        let today = new Date();
                        Team.findByIdAndDay(idTeam, today.getDay(), function (err, team) {
                            if (err) {
                                console.log(err);
                                res.json({result: false, data: null});
                            } else {
                                if (team) {
                                    Presence.doThePresence(idTrainee, idTeam, 0, function (err, presence) {
                                        if (err) {
                                            console.log(err);
                                            res.json({result: false, data: null});
                                        } else {
                                            res.json({result: true, data: presence});
                                        }
                                    });
                                } else {
                                    res.json({result: false, data: null});
                                }
                            }
                        });
                    } else {
                        res.json({result: true, data: null});
                    }
                }
            });

        },

        checkPresenceDevice: function (req, res) {
            let idTeam = req.body.idTeam;
            let idTrainee = req.body.idTrainee;
            let percent = req.body.percent;
            console.log(req.body);

            Presence.checkTraineePresence(idTrainee, idTeam, function (err, presence) {
                if (err) {
                    console.log(err);
                    res.json({result: false, data: null});
                } else {
                    let today = new Date();
                    Team.findByIdAndDay(idTeam, today.getDay(), function (err, team) {
                        if (err) {
                            console.log(err);
                            res.json({result: false, data: null});
                        } else {
                            if (team) {
                                if (presence) {
                                    //Incrementing the checks amount.
                                    presence.checks += 1;
                                    presence.lastCheck = isLastCheck(presence, team);

                                    //Increment the checks and insert the new percent
                                    presence.percents.push(percent);

                                    if (presence.lastCheck) {
                                        let avg = getPresencesAverage(presence, team);

                                        Presence.update(presence._id, presence.checks, presence.percents, avg, checkPresenceIsValid(presence, team), function (err, presence) {
                                            if (err) {
                                                console.log(err);
                                                res.json({result: false, data: null});
                                            } else {
                                                presence.lastCheck = true;
                                                res.json({result: true, data: presence});
                                            }
                                        });


                                    } else {
                                        Presence.update(presence._id, presence.checks, presence.percents, 0, false, function (err, presence) {
                                            if (err) {
                                                console.log(err);
                                                res.json({result: false, data: null});
                                            } else {
                                                res.json({result: true, data: presence});
                                            }
                                        });
                                    }
                                } else {
                                    Presence.doThePresence(idTrainee, idTeam, [percent], function (err, presence) {
                                        if (err) {
                                            console.log(err);
                                            res.json({result: false, data: null});
                                        } else {
                                            presence.valid = checkPresenceIsValid(presence, team);
                                            presence.lastCheck = isLastCheck(presence, team);
                                            res.json({result: true, data: presence});
                                        }
                                    });
                                }
                            } else {
                                res.json({result: false, data: null});
                            }
                        }
                    });
                }
            });

        }


    };

};

const checkPresenceIsValid = (presence, team) => team.percent <= getPresencesAverage(presence);

const getPresencesAverage = (presence) => presence.percents.reduce((acc, v) => acc + v) / presence.percents.length;

const isLastCheck = (presence, team) => {
    const today = new Date().getDay();
    // Getting the numbers of check presences at today.
    const day = team.days.filter(day => day.date.id === today).first();
    return presence.checks >= day.check_presence.length;
};

/**
 * @return first value from list or undefined if list is empty
 * */
Array.prototype.first = function() { return this[0] };