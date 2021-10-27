const db = require('../models');
var dayjs = require('dayjs')


module.exports.loadPagedata = async function loadPagedata(req){
    const projectionMonths = 6;
    let pageData = {expenses: []};
    let data = await db.Expense.findAll();
    data.forEach(function(item){
        pageData.expenses.push(item.dataValues);
        if (item.dataValues.repeat){
            let startDate = item.dataValues.startDate;
            for (i = 1; i < projectionMonths; i++){
                console.log(i)
                var newItem = item.dataValues;
                newItem.startDate = add_months(startDate,1);
                // let newDate = dayjs(startDate).add(i,'month').format('YYYY-MM-DDTHH:mm:ss.000[Z]')
                console.log(Date(newItem.startDate));
                pageData.expenses.push({
                    name: item.dataValues.name + "-",
                    id: item.dataValues.id,
                    amount: item.dataValues.amount,
                    startDate: newItem.startDate,
                });
            }
        }
    });
    console.table(pageData.expenses);
    return pageData;

}
module.exports.projectExpenses = async function projectExpenses(req){

}
function add_months(dt, n) {
   return new Date(dt.setMonth(dt.getMonth() + n));      
 }
