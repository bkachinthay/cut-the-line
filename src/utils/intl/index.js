import { cloneElement, createContext } from "preact";
import { useContext } from "preact/hooks";
import translate from "preact-i18n/src/lib/translate";
import translateMapping from "./translate-mapping";
import { HighlightI18N } from "preact-i18n/src/components/highlight-i18n";

const Intl = createContext({});

export const IntlProvider = Intl.Provider;

export function Text({ id, children: fallback, plural, fields }) {
  const definition = useContext(Intl);
  const value = translate(id, null, definition, fields, plural, fallback);
  return <HighlightI18N id={id} value={value} />;
}

export function Localizer({ children }) {
  const definition = useContext(Intl);
  const intl = { scope: null, mark: false, dictionary: definition };
  return children && children.length
    ? children.map((child) =>
        cloneElement(child, translateMapping(child.props, intl, true))
      )
    : children &&
        cloneElement(children, translateMapping(children.props, intl, true));
}

export function MarkupText(props) {
  return (
    <Localizer>
      <Html html={<Text {...props} />} id={props.id} />
    </Localizer>
  );
}

function Html({ html, id }) {
  let value = !html ? (
    html
  ) : typeof html === "string" ? (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span>{html}</span>
  );
  return <HighlightI18N id={id} value={value} />;
}
