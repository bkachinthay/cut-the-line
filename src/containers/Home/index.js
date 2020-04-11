import { Component } from "preact";
import { connect } from "redux-zero/preact";
import { route } from "preact-router";
import qs from "query-string";
import Search from "components/Search";
import VendorCard from "components/VendorCard";
import actions from "./actions";

class Home extends Component {
  componentDidMount() {
    this.props.getVendors("");
  }

  handleSearch = (searchTerm) => {
    route(searchTerm ? `/?q=${searchTerm}` : "");
    this.props.getVendors(searchTerm);
  };

  render({ loading, payload, error, url }) {
    const searchTerm = qs.parse(url.split("?")[1]).q || "";
    let vendorList = null;
    if (loading) {
      vendorList = <div class="black-70 tc f4">Loading...</div>;
    } else if (error) {
      vendorList = <div class="black-70 tc f4">Failed to fetch vendors</div>;
    } else if (payload && payload.length === 0) {
      vendorList = <div class="black-70 tc f4">No vendors found.</div>;
    } else if (payload && payload.length) {
      vendorList = payload.map(({ id, name, description }) => (
        <VendorCard key={id} id={id} name={name} description={description} />
      ));
    }
    return (
      <div>
        <Search
          classes="red"
          label="Search"
          onChange={this.handleSearch}
          value={searchTerm}
        />
        <div class="pv3">{vendorList}</div>
      </div>
    );
  }
}

export default connect(
  ({ vendors: { loading, payload, error } }) => ({
    loading,
    payload,
    error,
  }),
  actions
)(Home);
