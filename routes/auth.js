const doesEmailExist = require("../dynamodb/queryEmail");
const addUser = require("../model/user");
const router = require("express").Router();
const { registerValidation } = require("../validation");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post("/register", async (req, res) => {
    // validate the user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const isEmailExist = await doesEmailExist(req.body.email);
    if (isEmailExist.Count > 0)
        return res.status(400).json({ error: "Email already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = {
        name: req.body.name,
        email: req.body.email,
        password
    };

    try {
        await addUser(user);
        res.json({ error: null, data: { message: "User Created" } });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

router.post("/login", async (req, res) => {
    // validate the user
    const { error } = registerValidation(req.body);

    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await doesEmailExist(req.body.email);
    if (user.Count === 0)
        return res.status(400).json({ error: "Email is wrong" });

    // check for password correctness
    const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.Items[0].info.password
    );

    if (!isValidPassword)
        return res.status(400).json({ error: "Password is wrong" });

    // Create token
    const token = jwt.sign(
        {
            name: user.Items[0].info.name
        },
        process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
        error: null,
        data: {
            message: "Login successful",
            token
        }
    });
});

module.exports = router;
