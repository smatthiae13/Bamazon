//================set up required variables==========================

var mysql = require("mysql");
var inquirer = require ("inquirer");
//var table = require ("cli-table");

//================Connect to MySQL Database==========================

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
    console.log("Printing id, product name and price from Bamazon: "+ "\n\n")
   
    connection.query("SELECT id,product_name,price FROM products", function(err, res) {
       if (err) throw err;
        console.log(res);
        shopperQuestion();
    })
};

//======================Inquirer prompt for customers========================
function shopperQuestion() {
    inquirer.prompt ([
        {
            name: "purchaseId",
            type: "input",
            message: "What is the ID number of the product you want to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "What is the quantity you want to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])

    //=================This will display the order===============================

    .then(function(answer) {
        connection.query("SELECT * FROM products WHERE id=?", answer.purchaseId, function (err, res){
            for (var i = 0; i < res.length; i++) {

                if (answer.input > res[i].stock) {

                    console.log("================================");
                    console.log("=====Insufficient quantity!=====");
                    console.log("================================");
                } else {
                    console.log("================================");
                    console.log("Thank you, we will send that right out");
                    console.log("- - - - - - - - - - - - - - - - -");
                    console.log("You have selected:");
                    console.log("Item:" + res[i].product_name);
                    console.log("Department:" + res[i].department_name);
                    console.log("Quantity:" + res[i].answer.quantity);
                    console.log("- - - - - - - - - - - - - - - - - ");
                    console.log("Total:" + res[i].price * answer.quantity);
                }
                
            }
            //console.log(res);
        });
       
        console.log("This is what you are ordering:" );   
})

//=======================updating database after purchase==========================

.then(function(updateTable) {
    connection.query("UPDATE products SET stock = stock - 'answer.quantity' WHERE id = 'answer.purchaseId' ", function (err, res) {
console.log(res);
    });
});

}

