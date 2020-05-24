import getGqlInstance from "utils/gql";
import sum from "utils/sum";

const identityQuery = `query {
  identity {
    username
  }  
}`;

export function fetchIdentity() {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  return gql(identityQuery)({}).then(({ identity: { username } }) => ({
    username,
  }));
}

const vendorQueueOrdersQuery = `query {
  queueOrders {
    _id
    status
    tokenNo
    creationTime
    orderBy {
      username
    }
    vendor {
      _id
      name
    }
    items {
      data {
        item {
          _id
          name
          price
          isVeg
        }
        count
      }
    }
  }
}
`;

export function fetchVendorQueueOrders() {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  // add price to schema
  return gql(vendorQueueOrdersQuery)({}).then(({ queueOrders }) =>
    queueOrders.map(
      ({
        _id,
        status,
        tokenNo,
        creationTime,
        orderBy: { username },
        vendor,
        items: { data: orderItems },
      }) => ({
        orderId: _id,
        status,
        tokenNo,
        creationTime,
        customerId: username,
        vendorName: vendor.name,
        vendorId: vendor._id,
        price: orderItems.reduce(
          (acc, { count, item: { price } }) => acc + count * price,
          0
        ), // get from db
        itemCount: sum(orderItems.map(({ count }) => count || 0)),
        items: orderItems.map(({ count, item }) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          isVeg: item.isVeg,
          count,
        })),
      })
    )
  );
}

const vendorCompletedOrdersQuery = `query {
  completedOrders {
    _id
    status
    tokenNo
    creationTime
    orderBy {
      username
    }
    vendor {
      _id
      name
    }
    items {
      data {
        item {
          _id
          name
          price
          isVeg
        }
        count
      }
    }
  }
}
`;

export function fetchVendorCompletedOrders() {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  // add price to schema
  return gql(vendorCompletedOrdersQuery)({}).then(({ completedOrders }) =>
    completedOrders.map(
      ({
        _id,
        status,
        tokenNo,
        creationTime,
        orderBy: { username },
        vendor,
        items: { data: orderItems },
      }) => ({
        orderId: _id,
        status,
        tokenNo,
        creationTime,
        customerId: username,
        vendorName: vendor.name,
        vendorId: vendor._id,
        price: orderItems.reduce(
          (acc, { count, item: { price } }) => acc + count * price,
          0
        ), // get from db
        itemCount: sum(orderItems.map(({ count }) => count || 0)),
        items: orderItems.map(({ count, item }) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          isVeg: item.isVeg,
          count,
        })),
      })
    )
  );
}

const orderStatusQuery = `mutation ($id: ID!, $status: Status!){
  updateAOrder(data: {
    id: $id,
    status: $status
  }) {
    _id
    status
  }
}`;

export function setOrderStatus(id, status) {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  return gql(orderStatusQuery)({ id, status }).then(
    ({ updateAOrder: { _id, status } }) => ({
      orderId: _id,
      status,
    })
  );
}
