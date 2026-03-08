// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (req, res) => {
	res.render("index", {
		title: "User list",
		users: usersStorage.getUsers(),
	});
};

exports.usersCreateGet = (req, res) => {
	res.render("createUser", {
		title: "Create user",
	});
};

// This just shows the new stuff we're adding to the existing contents
const { body, query, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const ageErr = "must be an integer between 18 and 120";

const validateUser = [
	body("firstName")
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body("lastName")
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`Last name ${lengthErr}`),
	body("email").trim().isEmail().withMessage(`Please enter a valid email`),
	body("age")
		.optional({ values: "falsy" })
		.trim()
		.isInt({ min: 18, max: 120 })
		.withMessage(`Age ${ageErr}`),
	body("bio")
		.optional({ values: "falsy" })
		.isLength({ max: 200 })
		.withMessage(`bio must be under 200 characters`),
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
	validateUser,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("createUser", {
				title: "Create user",
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = matchedData(req);
		usersStorage.addUser({ firstName, lastName, email, age, bio });
		res.redirect("/");
	},
];

exports.usersUpdateGet = (req, res) => {
	const user = usersStorage.getUser(req.params.id);
	res.render("updateUser", {
		title: "Update user",
		user: user,
	});
};

const nameErr =
	"must contain first name and last name seperated by space, each from 1 to 10 char";

exports.usersUpdatePost = [
	validateUser,
	(req, res) => {
		const user = usersStorage.getUser(req.params.id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("updateUser", {
				title: "Update user",
				user: user,
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = matchedData(req);
		usersStorage.updateUser(req.params.id, {
			firstName,
			lastName,
			email,
			age,
			bio,
		});
		res.redirect("/");
	},
];

exports.usersDeletePost = (req, res) => {
	usersStorage.deleteUser(req.params.id);
	res.redirect("/");
};


exports.userSearchGet = [
	
	(req, res) => {
		const email = req.query.email;
		const name = req.query.name;
		const user = usersStorage.findByNameEmail(name, email);
		if (user === undefined) {
			res.render("searchNotFound", { name: name, email: email });
		} else {
			res.render("search", { user: user });
		}
	},
];
