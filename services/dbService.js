var instance;
module.exports = function () {
    if(!instance){
        instance = {
            start: function () {
                var mysql = require('mysql');
                var connection = mysql.createConnection({
                    //host: 'localhost',
                    //port: '443',
                    //database: 'cah'
                    host     : 'localhost',
                    user     : 'root',
                    database : 'dbtest',
                    port     : '3306'
                });

                connection.connect(function (err) {
                    if (err) {
                        console.error('error connecting: ' + err.stack);
                        return;
                    }
                    console.log('connected as id ' + connection.threadId);
                });
            },
            getWhiteCards: function () { // gets rando white card, or many cards

                var white_card;
                var valid_card = false;

                while(!valid_card){
                    var random_number = Math.floor(Math.random() * 1000);

                    connection.query('SELECT * FROM white_cards_2 WHERE played = 0 AND ID = ' + random_number, function (err, results, fields) {
                        if (err) throw err;

                        console.log('The solution is: ', results[0].ID);
                        console.log('The solution is: ', results[0].body);
                        console.log('The solution is: ', results[0].played);

                        if(results.length > 0){
                            valid_card = true;
                            white_card = results[0];
                        }
                    });
                }
                return white_card;
            },
            getBlackCard: function () { //gets rand black card

                var black_card;
                var valid_card = false;

                while(!valid_card){
                    var random_number = Math.floor(Math.random() * 1000);

                    connection.query('SELECT * FROM black_cards WHERE played = 0 AND ID = ' + random_number, function (err, results, fields) {
                        if (err) throw err;

                        console.log('The solution is: ', results[0].ID);
                        console.log('The solution is: ', results[0].body);
                        console.log('The solution is: ', results[0].played);

                        if(results.length > 0){
                            valid_card = true;
                            black_card = results[0];
                        }
                    });
                }
                return black_card;
            }
        };
    }
    return instance;
};


