import graphql from "graphql.js";
import sum from "utils/sum";
import config from "../config";

const gql = graphql(config.gqlURL, {
  alwaysAutodeclare: true,
  asJSON: true,
  debug: true,
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: config.customerAuth,
  },
});

const allVendors = gql(`query {
  allVendors {
    data {
      _id
      name
      description
    }
  }
}`);

export function fetchVendors(q = "") {
  return allVendors({}).then(({ allVendors: { data } }) =>
    data.map((v) => ({ ...v, id: v._id }))
  );
}

const findVendorByID = gql(`query ($id: ID!) {
  findVendorByID(id: $id) {
    _id
    name
    description
    items {
      data {
        _id
        name
        isVeg
        price
      }
    }
  }
}`);

export function fetchVendorDetails(id) {
  return findVendorByID({ id }).then(
    ({ findVendorByID: { name, description, _id, items } }) => ({
      name,
      description,
      id: _id,
      items: items.data.map((item) => ({ ...item, id: item._id })),
    })
  );
}

const createOrder = gql(`mutation ($status: Status!, $vendor: CreateOrderVendorRelation!, $items: [CreateOrderItemInput!]! ) {
  createOrder (
    data: {
      status: $status
      vendor: $vendor
      items: {
        create: $items
      }
    }
  ) {
    _id
    status
    tokenNo
  }
}`);

export function placeOrder({ vendorId, items }) {
  return createOrder({
    status: "STATUS_WAITING",
    vendor: { connect: vendorId },
    items: items.map(({ count, id }) => ({
      count,
      item: { connect: id },
    })),
  }).then(({ createOrder: { _id, status, tokenNo } }) => ({
    orderId: _id,
    status,
    tokenNo,
  }));
}

const allOrders = gql(`query {
  allOrders {
    data {
      _id
      status
      tokenNo
      creationTime
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
}
`);

export function fetchOrders() {
  // add price to schema
  return allOrders({}).then(({ allOrders: { data } }) =>
    data.map(
      ({
        _id,
        status,
        tokenNo,
        creationTime,
        vendor,
        items: { data: orderItems },
      }) => ({
        orderId: _id,
        status,
        tokenNo,
        creationTime,
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

const intlQuery = gql(`query ($vendorId: ID!) {
  vendorIntl(vendorId: $vendorId) {
    key
    english
    hindi
  }
}
`);

export function fetchIntl(vendorId) {
  return intlQuery({ vendorId }).then(({ vendorIntl = [] }) =>
    vendorIntl.reduce(
      (
        { hindi, english },
        { key, hindi: hindiDefn, english: englishDefn }
      ) => ({
        hindi: { ...hindi, [key]: hindiDefn },
        english: { ...english, [key]: englishDefn },
      }),
      { hindi: {}, english: {} }
    )
  );
}

const gqlvendor = graphql(config.gqlURL, {
  alwaysAutodeclare: true,
  asJSON: true,
  debug: true,
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: config.vendorAuth,
  },
});

const vendorQueueOrders = gqlvendor(`query {
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
`);

export function fetchVendorQueueOrders() {
  // add price to schema
  return vendorQueueOrders({}).then(({ queueOrders }) =>
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

const vendorCompletedOrders = gqlvendor(`query {
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
`);

export function fetchVendorCompletedOrders() {
  // add price to schema
  return vendorCompletedOrders({}).then(({ completedOrders }) =>
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

// const findVendorByID = gql(`query ($id: ID!) {
const orderStatusQuery = gqlvendor(`mutation ($id: ID!, $status: Status!){
  updateAOrder(data: {
    id: $id,
    status: $status
  }) {
    _id
    status
  }
}`);

export function setOrderStatus(id, status) {
  return orderStatusQuery({ id, status }).then(
    ({ updateAOrder: { _id, status } }) => ({
      orderId: _id,
      status,
    })
  );
}
