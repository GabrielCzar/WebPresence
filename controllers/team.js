module.exports = (app) => {
	const Team = app.models.team;
    const Day = app.models.day;

    return {

        getAll: (req, res) => Team.getAll((err, teams) => err ? res.json({ result: false, teams: [] }) : res.json({ result: true, teams })),

        create: function (req, res) {
            const team = req.body;

            const trainees = [];

            team.trainees.forEach(trainee => trainees.push(trainee._id));

            const days = [];

            require('async').forEach(team.days, (day, callback) => {
                Day.create(day, (err, day) => {
                    err ? console.log(err) : days.push(day._id);
                    callback();
                });
            }, () => {
                // Formatting the date to yyyy/MM/dd
                console.log(team.date_init);
                console.log(team.date_end);

                team.date_init = strToDate(team.date_init);
                team.date_end = strToDate(team.date_end);

                Team.create(team, trainees, days, (err, team) => err ? res.json({result: false}) : res.json({result: true, data: team}));
            });

        },

        getTraineeTeams: function (req, res) {
            const _idTrainee = req.params.idTrainee;
            Team.getTraineeTeams(_idTrainee, (err, teams) => err ? res.json({ result: false }) : res.json({ result: true, data: teams }));
        },

        //This function return true if the team works at today, false otherwise.
        haveWorkToday: function (req, res) {
            const idTeam = req.params.idTeam;
            const today = new Date();

            Team.findByIdAndDay(idTeam, today.getDay(), (err, team) =>
                err ? res.json({ result: false }) :
                    (team ? res.json({ result: true }) : res.json({ result: false })));
        },
    };

};

const strToDate = function (dateStr) {
    const parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
};
