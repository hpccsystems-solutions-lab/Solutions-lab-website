import React from 'react';
import { graphql, withPrefix, navigate } from 'gatsby';
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

import NextandPreviousBtn from '../components/ui/Button/components/NextandPreviousBtn';
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
      fields:{
        slug : string
      }
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

  // console.log(markdownRemark.fields.slug.replace('/hpcc', ''))
  // console.log(sectionList.edges,"id Object")

  const makeContentMap = (nodelist) => {
    let allNodes = []
   nodelist.forEach(node => {
     let current = node.node.items
    // console.log(typeof(current))
    // console.log(current)
      allNodes.push(...current)
    });
    return allNodes
  }
 
  const findNextPrevious = (nodeList,currentPagePath) => {
  let index = nodeList.findIndex((element)=> element.slug == currentPagePath)
  // console.log("nodeList is " + nodeList)
  // console.log("index is " + index)
  if( index == 0 ){
 // if it's was the first index then has no previos 
   return {next : nodeList[index+1].slug, previous : null}
  } else if (index == nodeList.length-1){
 // if it's the last index of array there is no next 
   return { next : null, previous : nodeList[index-1].slug }
  } else{
   return { next : nodeList[index + 1]?.slug , previous : nodeList[index-1]?.slug }
  }
}

  const moveToGithub = () => {
  const BASE_GITHUB_URL ='https://github.com/hpccsystems-solutions-lab/Learn-ECL/blob/master'
  let hpcclessURL = markdownRemark.fields.slug.replace('/hpcc', '')
  let fixedUrl = hpcclessURL.substring(0,hpcclessURL.length-1)
  navigate(`${BASE_GITHUB_URL}${fixedUrl}.md`)
 }
let slug = markdownRemark.fields.slug
let url = slug.substring(0,slug.length-1)
setTimeout(()=>{console.log(url)},1000)

// console.log('url is:',url)
// url: /hpcc/LearnECL/MainConcepts/filter

// console.log('slug is:',slug)
// slug: /hpcc/LearnECL/MainConcepts/filter/

// console.log("url is " +  url)

let nextAndprevios = null
if(url.includes("LearnECL")){
 let contents = makeContentMap(sectionList.edges);
//  console.log(contents)
 nextAndprevios = findNextPrevious(contents,url)
//  console.log("result", nextAndprevios)
}else{
  nextAndprevios =  { next : "" , previous : "" }
}
  return (
    <IndexLayout>
      <Page docsPage>
        <Helmet>
          <script type="text/javascript"src={withPrefix('OpenECLEditor.js')}></script>
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
            <button style={{padding: '5px 20px', cursor: 'pointer',right:'0',position:'absolute'}} onClick={moveToGithub}>Edit</button>
            <DocsHeader title={markdownRemark.frontmatter.title} subtitle={markdownRemark.frontmatter.description} />
            <MarkdownContent>{renderAst(markdownRemark.htmlAst)}</MarkdownContent>
            <NextandPreviousBtn to ={nextAndprevios.next} variant="right">Next »</NextandPreviousBtn>
            <NextandPreviousBtn to ={nextAndprevios.previous} variant="left">« Previous</NextandPreviousBtn>
            <DocsContribution edges={allFile.edges} slug={markdownRemark.fields.slug.replace('/hpcc', '')}/>
            <FooterWrapper>
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
