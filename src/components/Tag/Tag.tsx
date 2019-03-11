import * as React from "react";
import styled, { keyframes } from "styled-components";
import colors from "../../constant/colors";

const Wrapper = styled.div`
  background-color: ${colors.mainColor};
  color: white;
  margin-right: 5px;
  border-radius: 10px;
  display: inline-block;
  padding: 4px;
  &:hover {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    background-color: ${colors.mainHoverColor};
  }
`;

interface TagProps {
  content: string;
}

const Tag = ({ content }: TagProps) => {
  return <Wrapper>{content}</Wrapper>;
};

export default Tag;
