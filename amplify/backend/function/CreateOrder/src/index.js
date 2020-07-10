const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const ORDER_TABLE = "Order-we6cwg6juveevi6sihqok72ayi-dev";
const ORDER_TYPE = "Order";
const BOOK_ORDER_TABLE = "BookOrder-we6cwg6juveevi6sihqok72ayi-dev";
const BOOK_ORDER_TYPE = "BookOrder";

const createOrder = async (payload) => {
  const { order_id, username, email, total } = payload;
  var params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      user: username,
      customer: email,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createBookOrder = async (payload) => {
  let bookOrders = [];
  for (i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    bookOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: BOOK_ORDER_TYPE,
          book_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    });
  }
  let params = {
    RequestItems: {}
  };
  params["RequestItems"][BOOK_ORDER_TABLE] = bookOrders;
  await documentClient.batchWrite(params).promise();
};

exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.order_id = uuidv4();
    // create a new order
    const order = await createOrder(payload);
    console.log(order);
    // links books with the order
    const bookOrder = await createBookOrder(payload);
    console.log(bookOrder);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
