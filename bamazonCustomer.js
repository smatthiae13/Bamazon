var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection ({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Rocket13&",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    showAll();
    
});
function showAll() {
    console.log("Printing all from table products: "+ "\n\n")
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        console.log(res);
        shopperQuestion();
    })
};
function shopperQuestion() {
    inquirer.prompt ({
        name: "action",
        type: "input",
        message: "What's the ID of the product you want to buy?"

    }).then (function(answers) {
        console.log(answers);
    })
}

