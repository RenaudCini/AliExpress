/**
 * Module to deal with MYSQL
 */

const mysql = require('mysql');

// Create connection object
const con = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: "root",
    database: "my_social_network"

});

/**
 * Function to run query on database.
 * @param query_str, SQL query like 'select * from'
 * @param callback, callback to call in case of success.
 * @param fallback, callback to call in case of error.
 */
function do_query(query_str, callback, fallback){
    con.connect(function (err) {
        if (err) {
            // console.error(err);
            // throw err;
        }
        con.query(query_str, function (err, result) {
            console.log("query to be executed", query_str);
            if (err) {
                console.log(err);
                if (fallback){
                    fallback(err);
                }
            }

            if (callback && result){
                callback(result);
            }

        });
    });

}
// make do_query available
module.exports.do_query = do_query;
