import { useEffect } from "preact/hooks";
import { connect } from "redux-zero/preact";
import { Text, Localizer } from "preact-i18n";
import { route } from "preact-router";
import qs from "query-string";
import Search from "components/Search";
import VendorCard from "components/VendorCard";
import actions from "./actions";

function Home({ getVendors, loading, payload, error, url }) {
  useEffect(() => {
    getVendors("");
  }, [getVendors]);
  const handleSearch = (searchTerm) => {
    route(searchTerm ? `/?q=${searchTerm}` : "");
    getVendors(searchTerm);
  };

  const searchTerm = qs.parse(url.split("?")[1]).q || "";
  let vendorList = null;
  if (loading) {
    vendorList = (
      <div class="black-70 tc f4">
        <Text id="search.loading">Loading...</Text>
      </div>
    );
  } else if (error) {
    vendorList = (
      <div class="black-70 tc f4">
        <Text id="search.vendorLoadingFailed">Failed to fetch vendors.</Text>
      </div>
    );
  } else if (payload && payload.length === 0) {
    vendorList = (
      <div class="black-70 tc f4">
        <Text id="search.noVendorFound">No vendors found.</Text>
      </div>
    );
  } else if (payload && payload.length) {
    vendorList = payload.map(({ id, name, description }) => (
      <VendorCard key={id} id={id} name={name} description={description} />
    ));
  }
  return (
    <div>
      <Localizer>
        <Search
          classes="red"
          label={<Text id="search.search">Search</Text>}
          onChange={handleSearch}
          value={searchTerm}
        />
      </Localizer>
      <div class="pv3">{vendorList}</div>
    </div>
  );
}

export default connect(
  ({ vendors: { loading, payload, error } }) => ({
    loading,
    payload,
    error,
  }),
  actions
)(Home);
