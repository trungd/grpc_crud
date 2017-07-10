var messages = require('./api_pb');
var services = require('./api_grpc_pb');

var grpc = require('grpc');
var loremIpsum = require('lorem-ipsum')
var md5 = require('md5')

function main() {
  var client = new services.APIClient('localhost:50051',
    grpc.credentials.createInsecure());
  console.log("Connected")

  //for (var i = 0; i < 1; i++) addItem(client)

  //getList(client, 10, 5)

  getItem(client, 'ae8a5017d1a6b18903e8954f5f506c1b')

  deleteItem(client, '000e097725c634a070d66ce7885fa873')
}

// Get an item and print to log
function getItem(client, id) {
  var itemRequest = new messages.GetItemRequest([id])
  console.log(`GET id = ${id}`)
  client.getItem(itemRequest, function (err, response) {
    if (err) console.log(err)
    else {
      let item = new messages.Item(response.array)
      console.log(item.toObject())
    }
  })
}

// Add a random item
function addItem(client) {
  var item = new messages.Item()
  item.setId(md5(loremIpsum()))
  console.log(`ADD: id = ${item.getId()}`)
  item.setName(loremIpsum({count: 1, units: 'words'}))
  item.setTitle(loremIpsum())
  item.setDescription(loremIpsum())
  item.setPrice(Math.floor(Math.random() * 10000))
  item.setPv(0)
  item.setStatus(Math.random() > 0.5)
  client.addItem(item, function (err, response) {
    if (err) console.log(err)
    else {
      console.log(response.toObject().item)
    }
  })
}

function getList(client, page, limit) {
  let listItemRequest = new messages.ListItemRequest([page, limit])
  client.listItem(listItemRequest, function (err, response) {
    if (err) console.log(err)
    else {
      console.log(response.toObject())
    }
  })
}

function deleteItem(client, id) {
  client.deleteItem(new messages.DeleteItemRequest([id]), function (err, response) {
    if (err) console.log(err)
    else {
      console.log(`DELETE id = ${id}`)
    }
  })
}

main();