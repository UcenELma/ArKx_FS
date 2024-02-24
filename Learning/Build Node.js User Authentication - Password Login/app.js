const express = require('express');
const app = express();
const fs = require('fs');


const bcrypt = require('bcrypt');

const users = require('./users')
const port = 1212;

app.use(express.json());

//get users
app.get('/users',(rq, res) =>{
    res.json(users)   
});


// create users
app.post('/users', async (req, res) => {
    try{
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(salt)
        console.log(hashedPassword)

        const user = { username: req.body.username, password: hashedPassword };
        users.push(user);

        saveUsersToFile();

        res.json({ message: 'User created successfully', user }).status(201);    
    }catch (error) {
        console.error(error);
        res.status(500).send();
    }

});

function saveUsersToFile() {
    const usersJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', usersJSON);
}

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if(user == null){
        return res.status(400).send('username is incorrect')
    }
    try{
        if (await bcrypt.compare(req.body.password , user.password)){
            res.send('success')
        }else{
            return res.status(400).send('password is incorrect')
        }
    }catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})