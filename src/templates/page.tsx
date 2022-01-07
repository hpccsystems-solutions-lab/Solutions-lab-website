import React, {useState , useEffect} from 'react';
import { makeZoombtns } from '../utils/PlusandNegativeCreator';
import {makeCopyBtn} from '../utils/copybottun'
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
import { BackToTopButton } from 'components/docs/BackToTopButton';
import themeContext from '../utils/ThemeContext';
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

  useEffect(() => {
    makeCopyBtn()
  })
  
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
    // console.log(currentPagePath,"currentPagepath")
    let index;
   nodeList.forEach((element,ind)=> {
    if(element.slug == currentPagePath ){
      index = ind
    }
  // console.log(element.slug,"element.slug")
  })
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


let nextAndprevios = null
if(url.includes("Tutorial")){
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
            <button 
            style={{padding: '5px 20px', cursor: 'pointer',right:'0',position:'absolute',borderRadius:'5px'}}
            onClick={moveToGithub}
            >
            <div style={{marginBottom:"0"}}>
            <svg width="16px" height="16px" viewBox='0 0 16 16' version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" stroke-width="1" fill="#293232" fill-rule="evenodd">
              <path d="M0,8.20295589 C0,11.8265575 2.29202861,14.9012812 5.47100893,15.9859446 C5.87126677,16.0614783 6.0171276,15.8081887 6.0171276,15.5906518 C6.0171276,15.3957749 6.010252,14.8801318 6.00632309,14.1957968 C3.78108598,14.6912976 3.31158108,13.0960266 3.31158108,13.0960266 C2.94766567,12.1483309 2.42315602,11.8960485 2.42315602,11.8960485 C1.69679855,11.3869516 2.47816078,11.3975263 2.47816078,11.3975263 C3.28113202,11.4554355 3.70348998,12.2429998 3.70348998,12.2429998 C4.4175696,13.496355 5.57610731,13.134297 6.03186101,12.9243134 C6.10454587,12.3940671 6.31130483,12.0330162 6.5396728,11.8275646 C4.76331379,11.6206024 2.8956076,10.9171322 2.8956076,7.77392468 C2.8956076,6.87809543 3.20746493,6.14592245 3.71920562,5.57237016 C3.6371896,5.36490436 3.36265693,4.53101271 3.79778385,3.40203622 C3.79778385,3.40203622 4.46962767,3.18097436 5.99748304,4.24247412 C6.63593112,4.06068977 7.32005279,3.96954581 8.00024556,3.96652447 C8.67994721,3.96954581 9.36406888,4.06068977 10.0034992,4.24247412 C11.5303723,3.18097436 12.2012339,3.40203622 12.2012339,3.40203622 C12.6373431,4.53101271 12.3628104,5.36490436 12.2807944,5.57237016 C12.7935173,6.14592245 13.1029191,6.87809543 13.1029191,7.77392468 C13.1029191,10.9246856 11.2327573,11.6180846 9.45050493,11.8215219 C9.73780656,12.0748115 9.99318579,12.5753479 9.99318579,13.3402521 C9.99318579,14.4370009 9.98385463,15.3217519 9.98385463,15.5906518 C9.98385463,15.810203 10.127751,16.0650032 10.5339022,15.9849375 C13.7099358,14.8982599 16,11.826054 16,8.20295589 C16,3.67244673 12.4178152,0 7.99926333,0 C3.58218484,0 0,3.67244673 0,8.20295589 Z" id="Shape"></path>
            </g>
            </svg>
            </div>
            Edit
            </button>
            <DocsHeader title={markdownRemark.frontmatter.title} subtitle={markdownRemark.frontmatter.description} />
            <MarkdownContent>{renderAst(markdownRemark.htmlAst)}</MarkdownContent>
            <NextandPreviousBtn to ={nextAndprevios.next} variant="right">Next »</NextandPreviousBtn>
            <NextandPreviousBtn to ={nextAndprevios.previous} variant="left">« Previous</NextandPreviousBtn>
           <FooterWrapper>
             <themeContext.Consumer>{(Context)=>
             <Footer
                version={siteMetadata.version}
                siteLastUpdated={siteMetadata.siteLastUpdated}
                socials={siteMetadata.socials}
                darkmode={Context.dark}
              />}
             </themeContext.Consumer>
              
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