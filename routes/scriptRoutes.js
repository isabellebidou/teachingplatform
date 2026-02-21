const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const script = mongoose.model("Script");

module.exports = (app) => {

    app.get("/api/scripts", async (req, res) => {

        const scripts = await script.find()
        res.send(scripts);

    })

};