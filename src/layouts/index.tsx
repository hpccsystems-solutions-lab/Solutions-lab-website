import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { WindowLocation } from '@reach/router';
import themeContext from '../utils/ThemeContext';
import { AksaraReset } from '../components/foundations';
import { LayoutRoot } from '../components/layout/LayoutRoot';
import { LayoutMain } from '../components/layout/LayoutMain';
import { Navigation } from '../components/layout/Navigation';
import { Overlay } from '../components/layout/Overlay';

import { MenuNode, Edge, HeaderMenuItem } from '../interfaces/nodes';
import { SiteMetadata } from '../interfaces/gatsby';

import 'typeface-barlow';
import { NavigationContextProvider } from '../components/layout/Navigation/NavigationContext';

interface IndexLayoutProps {
  location?: WindowLocation;
  navHidden?: boolean;
  sendDarkData?:any;
}

interface DataProps {
  site: {
    siteMetadata: SiteMetadata;
  };
  navigationMenus: {
    edges: Edge<MenuNode>[];
  };
  headerMenus: {
    edges: Edge<HeaderMenuItem>[];
  };
}

const IndexLayout: React.FC<IndexLayoutProps> = ({ location, children, navHidden }) => {
  const { site, headerMenus, navigationMenus }: DataProps = useStaticQuery(query);
  const { siteMetadata } = site;
  let recentDarkState 
  if(typeof window !== 'undefined'){
    recentDarkState = JSON.parse(localStorage.getItem("dark"))
 }
  const  [stateDark,setDarkstate]= useState(recentDarkState? recentDarkState : {dark:false})
  
  return (
    <NavigationContextProvider>
      <AksaraReset>
       <themeContext.Provider value={stateDark} >
        <LayoutRoot
          title={siteMetadata.sidebarTitle || siteMetadata.title}
          headerMenus={headerMenus.edges}
          navHidden={navHidden}
          sendData={(v)=>setDarkstate(v)}
         >
          <Helmet>
            <title>{siteMetadata.title}</title>
            <meta name="description" content={siteMetadata.description} />
            <meta name="keywords" content={siteMetadata.keywords} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:description" content={siteMetadata.description} />
            <meta property="og:url" content={`${siteMetadata.siteUrl}${location ? location.pathname : '/'}`} />
          </Helmet>
          {/* <Overlay /> */}
          <Navigation
            title={siteMetadata.sidebarTitle || siteMetadata.title}
            navigation={navigationMenus.edges}
            headerMenus={headerMenus.edges}
            navHidden={navHidden}
            darkmode = {stateDark.dark}
          />
             <LayoutMain  navHidden={navHidden} >{children}</LayoutMain>
        </LayoutRoot>
        </themeContext.Provider>
      </AksaraReset>
    </NavigationContextProvider>
  );
};

export default IndexLayout;

const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        sidebarTitle
        description
        siteUrl
        keywords
        author {
          name
          url
          email
        }
      }
    }
    navigationMenus: allTocJson {
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
    headerMenus: allMenuJson {
      edges {
        node {
          id
          label
          href
          exact
          external
        }
      }
    }
  }
`;
