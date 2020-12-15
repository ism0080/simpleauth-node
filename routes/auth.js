const doesEmailExist = require("../dynamodb/queryEmail");
const addUser = require("../model/user");
const router = require("express").Router();
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
    // validate the user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const isEmailExist = await doesEmailExist(req.body.email);
    if (isEmailExist.Count > 0)
        return res.status(400).json({ error: "Email already exists" });

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    try {
        const savedUser = await addUser(user);
        res.json({ error: null, data: "User Created" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

module.exports = router;
