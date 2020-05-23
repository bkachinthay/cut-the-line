import graphql from "graphql.js";
import sum from "utils/sum";
import config from "../config";

function getGqlInstance() {
  const userToken = localStorage.getItem("userToken");
  return userToken
    ? graphql(config.gqlURL, {
        alwaysAutodeclare: true,
        asJSON: true,
        debug: true,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${userToken}`,
        },
      })
    : null;
}

const allVendorsQuery = `query {
  allVendors {
    data {
      _id
      name
      description
    }
  }
}`;

export function fetchVendors(q = "") {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  return gql(allVendorsQuery)().then(({ allVendors: { data } }) =>
    data.map((v) => ({ ...v, id: v._id }))
  );
}

const findVendorByIDQuery = `query ($id: ID!) {
  findVendorByID(id: $id) {
    _id
    name
    owner {
      username
    }
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
}`;

export function fetchVendorDetails(id) {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  return gql(findVendorByIDQuery)({ id }).then(
    ({
      findVendorByID: {
        name,
        description,
        _id,
        owner: { username },
        items,
      },
    }) => ({
      name,
      description,
      id: _id,
      vendorUsername: username,
      items: items.data.map((item) => ({ ...item, id: item._id })),
    })
  );
}

const createOrderQuery = `mutation ($status: Status!, $vendor: CreateOrderVendorRelation!, $items: [CreateOrderItemInput!]! ) {
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
    orderBy {
      username
    }
    creationTime
  }
}`;

export function placeOrder({ vendorId, items }) {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  return gql(createOrderQuery)({
    status: "STATUS_WAITING",
    vendor: { connect: vendorId },
    items: items.map(({ count, id }) => ({
      count,
      item: { connect: id },
    })),
  }).then(
    ({
      createOrder: {
        _id,
        status,
        tokenNo,
        orderBy: { username },
        creationTime,
      },
    }) => ({
      orderId: _id,
      status,
      tokenNo,
      username,
      creationTime,
    })
  );
}

const allOrdersQuery = `query {
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
`;

export function fetchOrders() {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  // add price to schema
  return gql(allOrdersQuery)({}).then(({ allOrders: { data } }) =>
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

const intlQuery = `query ($vendorId: ID!) {
  vendorIntl(vendorId: $vendorId) {
    key
    english
    hindi
  }
}
`;

export function fetchIntl(vendorId) {
  const gql = getGqlInstance();
  if (!gql) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }
  return gql(intlQuery)({ vendorId }).then(({ vendorIntl = [] }) =>
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
