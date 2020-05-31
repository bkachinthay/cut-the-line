import { route } from "preact-router";
import { fetchVendorDetails, fetchIntl } from "api";

const actions = ({ setState }) => ({
  getMenu({}, vendorId) {
    setState({
      currVendor: { id: vendorId, name: "" },
      menu: { loading: true, payload: [], error: false },
    });

    fetchIntl(vendorId)
      .then((intl) => setState({ intl }))
      .catch((err) => {
        if (err && err.tokenIssue) route("/login");
        console.error("vendor intl fetch err : ", err);
      });

    return fetchVendorDetails(vendorId)
      .then(({ name, description, vendorUsername, id, items }) => ({
        currVendor: { name, description, id, vendorUsername },
        menu: { loading: false, payload: items, error: false },
      }))
      .catch((error) => {
        if (error && error.tokenIssue) route("/login");
        return {
          currVendor: {},
          menu: { loading: false, payload: [], error },
        };
      });
  },
});

export default actions;
