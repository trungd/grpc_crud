// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

function serialize_AddItemResponse(arg) {
  if (!(arg instanceof api_pb.AddItemResponse)) {
    throw new Error('Expected argument of type AddItemResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_AddItemResponse(buffer_arg) {
  return api_pb.AddItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteItemRequest(arg) {
  if (!(arg instanceof api_pb.DeleteItemRequest)) {
    throw new Error('Expected argument of type DeleteItemRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DeleteItemRequest(buffer_arg) {
  return api_pb.DeleteItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteItemResponse(arg) {
  if (!(arg instanceof api_pb.DeleteItemResponse)) {
    throw new Error('Expected argument of type DeleteItemResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DeleteItemResponse(buffer_arg) {
  return api_pb.DeleteItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetItemRequest(arg) {
  if (!(arg instanceof api_pb.GetItemRequest)) {
    throw new Error('Expected argument of type GetItemRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetItemRequest(buffer_arg) {
  return api_pb.GetItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Item(arg) {
  if (!(arg instanceof api_pb.Item)) {
    throw new Error('Expected argument of type Item');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Item(buffer_arg) {
  return api_pb.Item.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ListItemRequest(arg) {
  if (!(arg instanceof api_pb.ListItemRequest)) {
    throw new Error('Expected argument of type ListItemRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ListItemRequest(buffer_arg) {
  return api_pb.ListItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ListItemResponse(arg) {
  if (!(arg instanceof api_pb.ListItemResponse)) {
    throw new Error('Expected argument of type ListItemResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ListItemResponse(buffer_arg) {
  return api_pb.ListItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateItemRequest(arg) {
  if (!(arg instanceof api_pb.UpdateItemRequest)) {
    throw new Error('Expected argument of type UpdateItemRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_UpdateItemRequest(buffer_arg) {
  return api_pb.UpdateItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateItemResponse(arg) {
  if (!(arg instanceof api_pb.UpdateItemResponse)) {
    throw new Error('Expected argument of type UpdateItemResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_UpdateItemResponse(buffer_arg) {
  return api_pb.UpdateItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var APIService = exports.APIService = {
  listItem: {
    path: '/API/ListItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.ListItemRequest,
    responseType: api_pb.ListItemResponse,
    requestSerialize: serialize_ListItemRequest,
    requestDeserialize: deserialize_ListItemRequest,
    responseSerialize: serialize_ListItemResponse,
    responseDeserialize: deserialize_ListItemResponse,
  },
  getItem: {
    path: '/API/GetItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.GetItemRequest,
    responseType: api_pb.Item,
    requestSerialize: serialize_GetItemRequest,
    requestDeserialize: deserialize_GetItemRequest,
    responseSerialize: serialize_Item,
    responseDeserialize: deserialize_Item,
  },
  addItem: {
    path: '/API/AddItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Item,
    responseType: api_pb.AddItemResponse,
    requestSerialize: serialize_Item,
    requestDeserialize: deserialize_Item,
    responseSerialize: serialize_AddItemResponse,
    responseDeserialize: deserialize_AddItemResponse,
  },
  updateItem: {
    path: '/API/UpdateItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.UpdateItemRequest,
    responseType: api_pb.UpdateItemResponse,
    requestSerialize: serialize_UpdateItemRequest,
    requestDeserialize: deserialize_UpdateItemRequest,
    responseSerialize: serialize_UpdateItemResponse,
    responseDeserialize: deserialize_UpdateItemResponse,
  },
  deleteItem: {
    path: '/API/DeleteItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.DeleteItemRequest,
    responseType: api_pb.DeleteItemResponse,
    requestSerialize: serialize_DeleteItemRequest,
    requestDeserialize: deserialize_DeleteItemRequest,
    responseSerialize: serialize_DeleteItemResponse,
    responseDeserialize: deserialize_DeleteItemResponse,
  },
};

exports.APIClient = grpc.makeGenericClientConstructor(APIService);
