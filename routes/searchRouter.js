const {Router} = require("express")
const usersController = require("../controllers/usersController");
const { render } = require("ejs");
const searchRouter = Router();

searchRouter.get("/", (req, res) => {
    res.render('search')
})

module.exports = searchRouter;