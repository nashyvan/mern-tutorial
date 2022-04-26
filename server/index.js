const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');

app.use(express.json());
app.use(cors());

const myUsername = process.env.MONGO_USERNAME
const myPassword = process.env.MONGO_PASSWORD

mongoose.connect(
    `mongodb+srv://${myUsername}:${myPassword}@cluster0.ul9kv.mongodb.net/merntutorial?retryWrites=true&w=majority`
);

app.get('/getUsers', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)
});

app.listen(3001, () => {
    console.log('it works');
});


