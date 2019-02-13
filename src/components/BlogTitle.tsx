import * as React from "react";
import { Header, Segment, Icon } from "semantic-ui-react";
import { NONAME } from "dns";

export default () => {
  return (
    <Segment vertical style={{ borderBottom: "none" }}>
      <Header
        as="h2"
        style={{
          background: "rgb(33, 150, 243)",
          borderRadius: "20px",
          color: "white",
          margin: "10px",
          padding: "10px 10px",
        }}
      >
        <Icon name="newspaper" />
        <Header.Content>
          Ideveloper's
          <Header.Subheader style={{ color: "white" }}>
            Thinking
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};
