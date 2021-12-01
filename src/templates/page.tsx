import React from 'react';
import { graphql, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from '@reach/router';

import { getPageById } from 'utils/helpers';
import { MenuNode, Edge } from 'interfaces/nodes';
import { SiteMetadata } from 'interfaces/gatsby';

import { Page } from 'components/layout/Page';
import { Container } from 'components/layout/Container';
import { DocsWrapper } from 'components/docs/DocsWrapper';
import { DocsHeader } from 'components/docs/DocsHeader';
import { MarkdownContent } from 'components/page/Markdown';

import { FooterWrapper, Footer } from 'components/layout/Footer';
import { Pagination } from 'components/ui/Pagination';
import { TocWrapper } from 'components/docs/TableOfContents';
import IndexLayout from 'layouts';
import renderAst from 'utils/renderAst';
import { DocsContribution } from 'components/docs/DocsContribution';
import { BackToTopButton } from 'components/docs/BackToTopButton';

import '../../static/tryButton.css'
interface PageTemplateProps extends RouteComponentProps {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    sectionList: {
      edges: Edge<MenuNode>[];
    };
    markdownRemark: {
      htmlAst: any;
      tableOfContents: string;
      excerpt: string;
      frontmatter: {
        id: string;
        title: string;
        description?: string;
      };
    };
  };
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ data }) => {
  const [tocIsOpen, setTocIsOpen] = React.useState(false);
  const { markdownRemark, sectionList, site, allFile } = data;
  const { siteMetadata } = site;
  const { prev, next } = markdownRemark.frontmatter;
  const prevPage = getPageById(sectionList.edges, prev);
  const nextPage = getPageById(sectionList.edges, next);
  
  // console.log(allFile);
  // console.log(markdownRemark.fields.slug,"SLUG");
  return (
    <IndexLayout>
      <Page docsPage>
        <Helmet>
          <script src={withPrefix('OpenECLEditor.js')} type="text/javascript" />
          <meta name="description" content={markdownRemark.excerpt} />
          <meta property="og:title" content={markdownRemark.frontmatter.title} />
          <meta property="og:description" content={markdownRemark.excerpt} />
        </Helmet>
        <DocsWrapper hasToc={!!markdownRemark.tableOfContents}>
          {markdownRemark.tableOfContents && (
            <TocWrapper
              isOpen={tocIsOpen}
              onClick={() => setTocIsOpen(!tocIsOpen)}
              dangerouslySetInnerHTML={{ __html: markdownRemark.tableOfContents }}
            />
          )}
          <Container>
            <DocsHeader title={markdownRemark.frontmatter.title} subtitle={markdownRemark.frontmatter.description} />
            <MarkdownContent>{renderAst(markdownRemark.htmlAst)}</MarkdownContent>
            <DocsContribution edges={allFile.edges} slug={markdownRemark.fields.slug.replace('/hpcc', '')}/>
            <FooterWrapper>
              {(prevPage || nextPage) && <Pagination prevPage={prevPage} nextPage={nextPage} />}
              <Footer
                version={siteMetadata.version}
                siteLastUpdated={siteMetadata.siteLastUpdated}
                socials={siteMetadata.socials}
              />
            </FooterWrapper>
          </Container>
          <BackToTopButton href="#" />
        </DocsWrapper>
      </Page>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        sidebarTitle
        sidebarSubtext
        siteLastUpdated
        description
        version
        siteUrl
        keywords
        author {
          name
          url
          email
        }
        socials {
          name
          imgpath
          url
        }
      }
    }
    sectionList: allTocJson {
      edges {
        node {
          title
          items {
            id
            slug
            title
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      tableOfContents
      excerpt
      frontmatter {
        id
        title
        description
      }
      fields {
        slug
      }
    }    
    allFile(filter: {gitRemote: {organization: {eq: "hpccsystems-solutions-lab"}}}) {
      edges {
        node {
          gitRemote {
            webLink
            ref
            pathname
            organization
            name
          }
        }
      }
    }
  }
`;