var messages = require('./api_pb');
var services = require('./api_grpc_pb');

var grpc = require('grpc');

var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  port: "6630",
  user: "root",
  password: "root",
  database: "db"
});

let CREATE_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS item (
    _ int(11) unsigned NOT NULL AUTO_INCREMENT,
    id varchar(32) DEFAULT '',
    name varchar(255) DEFAULT '',
    title varchar(255) DEFAULT NULL,
    description text,
    price int(11) DEFAULT NULL,
    pv int(11) DEFAULT NULL,
    status tinyint(1) DEFAULT NULL,
    PRIMARY KEY (_)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(CREATE_TABLE_QUERY, function(err, result) {
    if (err) throw err;
    console.log("Table Created")
  })
});


function listItem(call, callback) {
  let page = call.request.getPage(), limit = call.request.getLimit()
  console.log(`LIST limit = ${limit} & page = ${page}`)
  con.query(`SELECT COUNT(*) AS count FROM item`, function (err, result) {
    let total = result[0]
    con.query(`SELECT * FROM item LIMIT ${con.escape(limit)} OFFSET ${con.escape(page)}`,
      function (error, results, fields) {
        if (error) console.log(`ERROR: ${error}`)
        else {
          let listItemResponse = new messages.ListItemResponse()
          let items = results.map(function (it) {
            return new messages.Item(it.id, it.name, it.type, it.description,
              it.price, it.pv, it.status)
          })
          listItemResponse.setItemsList(items)
          listItemResponse.setTotal(total['count'])
          listItemResponse.setPrevpage(page > 1 ? page - 1 : -1)
          listItemResponse.setNextpage(page < total / limit + 1 ? page + 1 : -1)
          console.log(listItemResponse)
          callback(null, listItemResponse)
        }
      })
  })
}

function getItem(call, callback) {
  let id = call.request.getId()
  console.log(`GET id = ${id}`)
  var sql = 'SELECT * FROM item WHERE id = ' + con.escape(id);
  con.query(sql, function (error, results, fields) {
    if (error) console.log(`ERROR: ${error}`)
    if (results.length == 1) {
      let ret = results[0]
      con.query('UPDATE item SET pv = pv + 1 WHERE id = ' + con.escape(id))
      ret.pv++
      let item = new messages.Item([
        ret.id, ret.name, ret.type, ret.description,
        ret.price, ret.pv, ret.status,
      ])
      console.log(item.toObject())
      callback(null, item)
    } else {
      console.log(`No item with id = ${id}`)
      callback(`No item with id = ${id}`, null)
    }
  })
}

function addItem(call, callback) {
  console.log(`ADD: id = ${call.request.getId()}`)
  let sql = 'INSERT INTO item SET ?'
  let req = call.request.toObject()
  con.query(sql, req, function (err, result) {
    if (err) callback(err, null)
    else {
      let item = call.request
      let addItemResponse = new messages.AddItemResponse()
      addItemResponse.setItem(item)
      callback(null, addItemResponse)
    }
  })
}

function updateItem(call, callback) {
  console.log(`UPDATE: id = ${call.request.getId()}`)
  let sql = 'UPDATE item SET ? WHERE id = ' + con.escape(call.request.getId())
  let req = call.request.toObject()
  con.query(sql, req, function (err, result) {
    if (err) callback(err, null)
    else {
      let item = call.request
      let updateItemResponse = new messages.UpdateItemResponse()
      updateItemResponse.setItem(item)
      callback(null, updateItemResponse)
    }
  })
}

function deleteItem(call, callback) {
  console.log(`DELETE: id = ${call.request.getId()}`)
  let sql = `DELETE FROM item WHERE id = ${con.escape(call.request.getId())}`
  con.query(sql, function (err, result) {
    if (err) callback(err, null)
    else {
      callback(null, new messages.DeleteItemResponse())
    }
  })
}

function main() {var server = new grpc.Server();
  server.addService(services.APIService, {
    listItem: listItem,
    getItem: getItem,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem
  });

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server Launched")
}

main()