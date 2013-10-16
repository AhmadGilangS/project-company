var dataSource = require('./modules/db');
var Account = require('./modules/account');
var accounts = [ 
    { email: "foo@bar.com",
      level: 10,
      created: new Date(),
      modified: new Date()
    }, {
      email: "bar@bar.com",
      level: 20,
      created: new Date(),
      modified: new Date()
    } ];

dataSource.automigrate('account', function (err) {
  accounts.forEach(function(act) {
    Account.create(act, function(err, result) {
      if(!err) {
        console.log('Record created:', result);
      }
    });
  });
});
