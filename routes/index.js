var express = require('express');
var router = express.Router();
const db = require('../models');
const misc = require('../common/misc');
var dayjs = require('dayjs')

/* GET home page. */
router.get('/', function(req, res, next) {
  misc.loadPagedata("/").then(pageData => {
    res.render('index', { title: 'PaydayPlanner', expenses: pageData.expenses, dayjs: dayjs });
  });
  // db.Expense.findAll().then(result => {
  // let expenses = [];
  // console.debug(result[0].dataValues);
  // result.forEach(function(item){
  //   expenses.push(item.dataValues);
  // });
  // res.render('index', { title: 'PaydayPlanner', expenses: expenses });

  // });
});

module.exports = router;
