import * as React from "react";
import { GatsbyLinkProps } from "gatsby-link";
import { Card, List } from "semantic-ui-react";
import { markdownRemarkGroupConnectionConnection } from "../../graphql-types";
import styled from "styled-components";

import { mainColor } from "../../constant/colors";

const TagHeader = styled.div`
  background: ${mainColor};
`;

interface TagsCardProps extends React.HTMLProps<HTMLDivElement> {
  tags: markdownRemarkGroupConnectionConnection[];
  Link: React.ComponentClass<GatsbyLinkProps<any>>;
  tag?: string;
}

export default (props: TagsCardProps) => {
  return (
    <Card>
      <Card.Content style={{ background: mainColor }}>
        <Card.Header style={{ color: "white" }}>Tags</Card.Header>
      </Card.Content>
      <Card.Content>
        <List>
          {props.tags.map((tag) => {
            const isActive = tag.fieldValue === props.tag;
            const activeStyle = {
              fontWeight: "700",
            };
            const tagLink = isActive
              ? `/blog`
              : `/blog/tags/${tag.fieldValue}/`;
            return (
              <List.Item as="span" key={tag.fieldValue}>
                <List.Icon name="tag" color={isActive ? "blue" : null} />
                <List.Content style={isActive ? activeStyle : null}>
                  <props.Link to={tagLink}>
                    {tag.fieldValue} ({tag.totalCount})
                  </props.Link>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Card.Content>
    </Card>
  );
};
