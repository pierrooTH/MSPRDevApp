const express = require('express')
const app = express()
const mysql = require('mysql');

app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "msprbdd"
});

app.get('/', (req,res) => {
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query("SELECT * FROM users", function (err, result) {
            if (err) throw err;
            res.send(result)
        });
    });
})

