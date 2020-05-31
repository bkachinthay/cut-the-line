import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import withPath from "utils/withPath";
import actions from "./actions";

function VendorSetup({ path, setUp }) {
  useEffect(() => {
    if (path !== "/login") setUp();
  }, [path, setUp]);
  return null;
}

export default withPath(connect(null, actions)(VendorSetup));
