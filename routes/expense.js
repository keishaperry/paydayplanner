const moment = require('moment');
const { json } = require('express');
const db = require("../models")
const Sequelize = require("sequelize");
var dayjs = require('dayjs')

/*   */

module.exports = function (app) {

  // GET
  app.get('/api/v1/expenses', function(req, res, next) {
    db.Expense.findAll({
      //attributes: ['Name', 'Code',"Category","Region"]
    }).then(result => {
     
      res.json(result);
    });
  });
  app.get('/api/v1/expenses/:uid', function(req, res, next) {
    const uid = req.params.uid;

    db.Expense.findOne({where:{id:uid}
      //attributes: ['Name', 'Code',"Category","Region"]
    }).then(result => {
     
      res.json(result);
    });
  });


   // POST
   app.post('/api/v1/expenses', function(req, res, next) {
    console.debug(req.body);
    //bail out if missing name or amount. need both at least
    let newExpense = {
      name: req.body.name,
      amount: req.body.amount
    };
    //optional values for repeat/start/etc

    newExpense.startDate = req.body.startDate ?  dayjs(req.body.startDate).format('YYYY-MM-DDTHH:mm:ss.000[Z]') : Date();
    if (req.body.repeat && req.body.repeat == "true"){
      newExpense.repeat = true;
      newExpense.repeatPattern = req.body.repeatPattern ? req.body.repeatPattern : "MONTH";
    }
    if (req.body.endDate) newExpense.endDate = req.body.endDate;
    //create that badboy
    db.Expense.create(newExpense).then(result => {
     res.json(result);
    });

     // db.Expense.create({name: "Example Expense",amount: 10.45, startDate: Date()  })
    // .then( result => {
    //   if (req.body.Metadata.length > 0){
    //     console.log("array")
    //     req.body.Metadata.forEach(function(i){
    //       console.log(i);
    //       db.MemorialMeta.create({MemorialID: result.id,"Heading":i.Heading,"Text":i.Text});
    //     });
    //   }
    //   res.send("inserted");

    // }).catch(err => {    });
  });
}