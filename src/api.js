import sum from "utils/sum";
import config from '../config';

export function query(path, params = null) {
  const userToken = localStorage.getItem("userToken");
  const url = `${config.apiEndpoint}${path}`;
  if (!userToken) {
    return Promise.reject({
      tokenIssue: true,
      message: "userToken not available",
    });
  }

  let isOk;
  return fetch(url, {
    method: params ? 'POST' : 'GET',
    body: params ? JSON.stringify(params) : null,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": userToken
    },
  }).then((res) => ((isOk = res.ok), res.json()))
    .then((res) => {
      if (isOk && res) {
        return res;
      }
      throw res;
    });
}

// export function fetchVendors(q = "") {
export function fetchVendors() {
  return query('/api/vendors');
}

export function fetchVendorDetails(id) {
  return query(`/api/vendor/${id}`)
}

export function placeOrder({ vendorId, items }) {
  return query('/api/placeorder', { vendorId, items })
    .then(({
      orderId,
      tokenNo,
      status,
      creation_time,
      username,
      vendor_user_name,
      // vendor_name,
    }) => ({
        orderId,
        tokenNo,
        status,
        username,
        creationTime: creation_time,
        vendorUsername: vendor_user_name,
    })
    );
}

export function fetchPastOrders() {
  return query('/api/userpastorders').then((completedOrders) => completedOrders.map(
    ({
      id,
      status,
      token_no,
      creation_time,
      vendor_id,
      vendor_name,
      vendor_user_name,
      items
    }) => ({
      orderId: id,
      status,
      tokenNo: token_no,
      creationTime: creation_time,
      vendorName: vendor_name,
      vendorId: vendor_id,
      vendorUsername: vendor_user_name,
      price: items.reduce(
      (acc, { price, count }) => acc + count * price,
      0
    ), // get from db
      itemCount: sum(items.map(({ count }) => count || 0)),
      items: items.map((item) => ({
        id: item.item_id,
        name: item.name,
        price: item.price,
        isVeg: item.is_veg,
        count: item.count,
      })),
    })
  )

  );
}

export function fetchQueueOrders() {
  return query('/api/usercurrentorders').then(
    ({ orders: queueOrders, username }) => ({
      username,
      queueOrders: queueOrders.map(
        ({
          id,
          status,
          token_no,
          creation_time,
          vendor_id,
          vendor_name,
          vendor_user_name,
          items
        }) => ({
          orderId: id,
          status,
          tokenNo: token_no,
          creationTime: creation_time,
          vendorName: vendor_name,
          vendorId: vendor_id,
          vendorUsername: vendor_user_name,
          price: items.reduce(
            (acc, { price, count }) => acc + count * price,
            0
          ), // get from db
          itemCount: sum(items.map(({ count }) => count || 0)),
          items: items.map((item) => ({
            id: item.item_id,
            name: item.name,
            price: item.price,
            isVeg: item.is_veg,
            count: item.count,
          })),
        })
      ),
    })
  );
}

export function fetchIntl(vendorId) {
  return query(`/api/intl/${vendorId}`).then((vendorIntl = []) =>
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
  )
}
