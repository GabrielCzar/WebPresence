module.exports = (app) => {

	const User = app.models.user;
	const Role = app.models.role;

    return {

        index: (req, res) => res.render('index'),

        getRoles: function (req, res) {
            Role.find({}, function (err, roles) {
                if (err) {
                    console.error("Error when trying get all roles: " + err);
                    res.json({result: false, data: null });
                } else res.json({result: true, data: roles});
            });
        },

        checkLogin: function (req, res) {
            const user = req.body;
            console.log("CheckLogin Called | USER: ", user.username, ' | ROLE: ', user.role);

            User.checkLogin(user, function (err, userDB) {
                if (err !== null || userDB === null) {
                    console.error('Error: ', err, userDB);
                    return res.json({ result: false, data: null });
                }
                console.log("User: " + userDB.username + " added to session!");
                req.session.userLogged = userDB;
                return res.json({result: true, data: userDB});
            });

        },

        logout: function (req, res) {
            req.session.destroy();
            console.log("Session was destroyed!");
            res.render('index');
        }

    };
};