const actions = (_, { id, name, price, isVeg }) => ({
  setItemCount: ({ cart }, count) => {
    const prevItem = cart[id] || { id, name, price, isVeg };
    return { cart: { ...cart, [id]: { ...prevItem, count } } };
  },
});

export default actions;
