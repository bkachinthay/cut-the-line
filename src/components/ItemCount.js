import { Text } from "preact-i18n";

function ItemCount({ count }) {
  return (
    <Text
      id="cartPreview.itemCount"
      fields={{ count }}
    >{`${count} Items`}</Text>
  );
}

export default ItemCount;
