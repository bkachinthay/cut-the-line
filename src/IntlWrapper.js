import { connect } from "redux-zero/preact";
import { IntlProvider } from "utils/intl";

function IntlWrapper({ children, value = {}, vendorIntl = {} }) {
  return (
    <IntlProvider value={{ ...value, vendorIntl }}>{children}</IntlProvider>
  );
}

export default connect(({ intl: { hindi: vendorIntl } }) => ({ vendorIntl }))(
  IntlWrapper
);
