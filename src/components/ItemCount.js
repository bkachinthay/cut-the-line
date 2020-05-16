import { Text } from "utils/intl";

function ItemCount({ count }) {
  return (
    <Text
      id="cartPreview.itemCount"
      fields={{ count }}
    >{`${count} Items`}</Text>
  );
}

export default ItemCount;
