const leoDB = require("./index");

// New DB
leoDB.NewDB("test", ["fname", "lname", "country"]);

// Select DB
leoDB.SelectDB("test");

// Insert Data.
leoDB.Insert([
    {
        fname: "John",
        lname: "Doe",
        country: "England",
    },
    {
        fname: "Julius",
        lname: "Potter",
        country: "USA",
    },
    {
        fname: "Malay",
        lname: "Bhavsar",
        country: "India",
    },
]);

// Saving DB
leoDB.SaveDB();

// check if DB exists
console.log(leoDB.checkDBexists("test"));
console.log(leoDB.checkDBexists("admin"));
console.log(leoDB.checkDBexists("user"));

// Get DB details.
console.log(leoDB.getDBdetails("test"));
