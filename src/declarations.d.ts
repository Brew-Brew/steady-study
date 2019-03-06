// package.json
declare module "*/package.json" {
  export const version: string;
  export const author: string;
}

declare const graphql: (query: TemplateStringsArray) => void;

declare module "disqus-react" {
  export class DiscussionEmbed extends React.Component<
    {
      shortname: string;
      config: {
        url?: string;
        identifier?: string;
        title?: string;
      };
    },
    {}
  > {}
}

declare module "react-animations" {
  export const pulse: string;
  export const fadeInDown: string;
  export const rollIn: string;
}
