
// 1.  Create order with following inputs
// id, __typename = "Order", createdAt, customer="customer email", total="Order total", updatedAt, user="User name or full name for searching"
var params = {
    TableName : 'BookOrder-we6cwg6juveevi6sihqok72ayi-dev',
    Item: {
       id: '<order_id>',
       __typename: "Order",
       customer: "",
       total: 40.33,
       updatedAt: 
    }
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  documentClient.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });


// 2. Create bookOrder - The link between order and books. This could be a buld update
// id, __typename="BookOrder", book_id, order_id, customer="customer email", createdAt, updatedAt

const getBookOrderItems = () => {
    let bookOrders = [];
    
    // add them in a loop
    const order1 = {
        PutRequest: {
          Item: {
            id: 'unique ID', //hash key
            __typename: 'BookOrder',
            book_id: "<book_id>",
            order_id: "<order_id>",
            customer: "<email>",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      }

    bookOrders.push(order1);
    return bookOrders;
}

var params = {
    RequestItems: {
      'BookOrder-we6cwg6juveevi6sihqok72ayi-dev': getBookOrderItems()
    }
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  documentClient.batchWrite(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });