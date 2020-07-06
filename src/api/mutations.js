export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($input: ProcessOrderInput!) {
    processOrder(input: $input)
  }
`;

export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
      id
      title
      description
      imageURL
      author
      featured
      price
      orders {
        items {
          id
          bookId
          orderId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
      id
      title
      description
      imageURL
      author
      featured
      price
      orders {
        items {
          id
          bookId
          orderId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
      id
      title
      description
      imageURL
      author
      featured
      price
      orders {
        items {
          id
          bookId
          orderId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createBookOrder = /* GraphQL */ `
  mutation CreateBookOrder(
    $input: CreateBookOrderInput!
    $condition: ModelBookOrderConditionInput
  ) {
    createBookOrder(input: $input, condition: $condition) {
      id
      bookId
      orderId
      order {
        id
        user
        date
        total
        books {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      book {
        id
        title
        description
        imageURL
        author
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateBookOrder = /* GraphQL */ `
  mutation UpdateBookOrder(
    $input: UpdateBookOrderInput!
    $condition: ModelBookOrderConditionInput
  ) {
    updateBookOrder(input: $input, condition: $condition) {
      id
      bookId
      orderId
      order {
        id
        user
        date
        total
        books {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      book {
        id
        title
        description
        imageURL
        author
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteBookOrder = /* GraphQL */ `
  mutation DeleteBookOrder(
    $input: DeleteBookOrderInput!
    $condition: ModelBookOrderConditionInput
  ) {
    deleteBookOrder(input: $input, condition: $condition) {
      id
      bookId
      orderId
      order {
        id
        user
        date
        total
        books {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      book {
        id
        title
        description
        imageURL
        author
        featured
        price
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      books {
        items {
          id
          bookId
          orderId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      books {
        items {
          id
          bookId
          orderId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      books {
        items {
          id
          bookId
          orderId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
