import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import { withLayout } from "../components/Layout";

const AboutPage = () => {
  return (
    <Container>
      <Segment vertical>
        <Header as="h2">
          <Header.Content>Hi I'm Ideveloper</Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <p>Github</p>
        <p>Tistory</p>
        <p>Email</p>
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);
