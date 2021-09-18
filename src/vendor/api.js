import { query } from '../api';
import sum from "utils/sum";

export function fetchVendorQueueOrders() {
  // add price to schema
  return query('/vendorqueue').then(
    ({ orders: queueOrders, username }) => ({
      username,
      queueOrders: queueOrders.map(
        ({
          id,
          status,
          token_no,
          creation_time,
          vendor_id,
          // vendor_name,
          // vendor_user_name,
          order_by,
          items,
        }) => ({
          orderId: id,
          status,
          tokenNo: token_no,
          creationTime: creation_time,
          customerId: order_by,
          // vendorName: vendor_name,
          vendorId: vendor_id,
          price: items.reduce(
            (acc, { count, price }) => acc + count * price,
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

export function fetchVendorCompletedOrders() {
  // add price to schema
  return query('/vendorcompleted').then((completedOrders) =>
    completedOrders.map(
      ({
        id,
        status,
        token_no,
        creation_time,
        order_by,
        vendor_id,
        // vendor_name,
        // vendor_user_name,
        items,
      }) => ({
        orderId: id,
        status,
        tokenNo: token_no,
        creationTime: creation_time,
        customerId: order_by,
        // vendorName: vendor_name,
        vendorId: vendor_id,
        price: items.reduce(
          (acc, { count, price }) => acc + count * price,
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

export function setOrderStatus(orderId, status) {
  return query('/updatestatus', { orderId, status })
    .then(({ orderId: updatedOrderId, status: updatedStatus }) => ({
      orderId: updatedOrderId,
      status: updatedStatus,
    }));
}

