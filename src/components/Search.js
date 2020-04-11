import { Component, createRef } from "preact";
import { SearchIcon } from "components/Icons";

class Search extends Component {
  ref = createRef();

  componentDidMount() {
    // this.ref.current.focus();
  }

  handleFormClick = () => {
    this.ref.current.focus();
  };

  handleInput = (e) => {
    this.props.onChange(e.target.value);
  };

  render({ value = "", label = "", classes = "" }) {
    return (
      <form
        class={`flex ba bw1 br-pill pa2 shadow-hover ${classes}`}
        onClick={this.handleFormClick}
      >
        <SearchIcon
          style={{
            fill: "currentColor",
            flex: "0 0 40px",
          }}
          classes="mr2"
        />
        <label class="clip">{label}</label>
        <input
          class="f3 input-reset bn outline-0 bg-white lh-solid w-100 pl2-ns color-inherit"
          type="text"
          placeholder={label}
          style={{ flex: "1 1 100px" }}
          ref={this.ref}
          value={value}
          onInput={this.handleInput}
        />
      </form>
    );
  }
}

export default Search;
