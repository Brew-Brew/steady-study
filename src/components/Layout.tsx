import { Link } from "gatsby";
import * as React from "react";
import styled from "styled-components";

import HeaderMenu from "./HeaderMenu/HeaderMenu";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { Segment, Icon, Container, Sidebar } from "semantic-ui-react";
import "../css/styles.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";
import { Provider } from "react-redux";
import { store } from "../store";
import colors from "../constant/colors";

export const menuItems = [
  { name: "Home", path: "/", exact: true, icon: "home", inverted: true },
  { name: "who I am", path: "/about/", exact: true, icon: "info circle" },
  { name: "My Thinking", path: "/blog/", exact: false, icon: "newspaper" },
];

export interface LayoutProps {
  location: {
    pathname: string;
  };
  children: any;
}

const Print = styled.div`
  @media print {
    .no-print,
    .menu {
      display: none;
    }
  }
`;

const Layout = (props: LayoutProps) => {
  const { pathname } = props.location;
  const isHome = pathname === "/";

  return (
    <Provider store={store}>
      <Print>
        <Sidebar.Pushable as={Segment}>
          <SidebarMenu
            Link={Link}
            pathname={pathname}
            items={menuItems}
            visible={false}
          />

          <Sidebar.Pusher style={{ minHeight: "100vh" }}>
            {/* Header */}
            {isHome ? null : (
              <HeaderMenu Link={Link} pathname={pathname} items={menuItems} />
            )}

            {/* Render children pages */}
            <div style={{ paddingBottom: 60 }}>{props.children}</div>

            {/* Footer */}
            <Segment
              inverted
              vertical
              style={{
                background: colors.mainColor,
                bottom: 0,
                height: "100px",
                width: "100%",
              }}
            >
              <Container textAlign="center">
                <footer>
                  Powered with <Icon name="heart" /> by Ideveloper
                </footer>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Print>
    </Provider>
  );
};

export default Layout;

export const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  class WithLayout extends React.Component<P & LayoutProps> {
    render() {
      return (
        <Layout location={this.props.location}>
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  };
