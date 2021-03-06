/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { useDocs, useCurrentDoc } from "docz";
import { get } from "lodash/fp";

import { Icon } from "@fmb/components/Icon";
import * as styles from "./styles";

const getHeadings = (route, docs) => {
  const doc = docs.find((doc) => doc.route === route);
  const headings = get("headings", doc);
  return headings ? headings.filter((heading) => heading.depth === 2) : [];
};

const getCurrentHash = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location ? decodeURI(window.location.hash) : "";
};

export const NavLink = React.forwardRef(({ item, ...props }, ref) => {
  const docs = useDocs();
  const to = item.route;
  const headings = docs && getHeadings(to, docs);
  const current = useCurrentDoc();
  const isCurrent = item.route === current.route;
  const showHeadings = isCurrent && headings && headings.length > 0;
  const currentHash = getCurrentHash();
  return (
    <React.Fragment>
      <Link
        {...props}
        to={to}
        sx={styles.link}
        activeClassName="active"
        ref={ref}
      >
        {isCurrent && (
          <Icon icon="chevrons-right" color="var(--fmb-red--light)" size={18} />
        )}
        {props.children}
      </Link>
      {showHeadings &&
        headings.map((heading) => (
          <Link
            key={heading.slug}
            to={`${to}#${heading.slug}`}
            sx={styles.smallLink}
            className={currentHash === `#${heading.slug}` ? "active" : ""}
          >
            {heading.value}
          </Link>
        ))}
    </React.Fragment>
  );
});
