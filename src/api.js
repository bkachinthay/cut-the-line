export function fetchVendors(q = "") {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          VENDORS.filter((v) => v.name.toLowerCase().includes(q.toLowerCase()))
        ),
      0
    )
  );
}

export function fetchMenu(vendor) {
  return new Promise((resolve) => setTimeout(() => resolve(ITEMS), 0));
}

export function placeOrder(order) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ status: "sucess" }), 0)
  );
}

const VENDORS = [
  {
    id: "1",
    location: "asfd",
    name: "Owl",
    description: "some not much long descrition about the vender.",
  },
  {
    id: "2",
    location: "asfd",
    name: "Peacock",
    description: "some not much long descrition about the vender.",
  },
  {
    id: "3",
    location: "asfd",
    name: "Raven",
    description: "some not much long descrition about the vender.",
  },
  {
    id: "4",
    location: "asfd",
    name: "Swan",
    description: "some not much long descrition about the vender.",
  },
];

const ITEMS = [
  { id: "item1", name: "Edible Stuff", price: 50, isVeg: false, count: 0 },
  {
    id: "item2",
    name: "Edible Stuff that can be eaten when available to be eaten",
    price: 50,
    isVeg: false,
    count: 5,
  },
  { id: "item3", name: "Edible Stuff", price: 50, isVeg: true, count: 100 },
  { id: "item4", name: "Edible Stuff", price: 50, isVeg: true, count: 0 },
  { id: "item5", name: "Edible Stuff", price: 50, isVeg: false, count: 9999 },
];
