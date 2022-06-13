import React from 'react';
import styled, { css } from 'styled-components';
import { globalHistory } from "@reach/router"
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { MenuNode, Edge, HeaderMenuItem } from '../../../interfaces/nodes';
import { Heading } from '../../../components/foundations';
import { ButtonStyles } from '../../../components/ui/Button';
import { colors, layerIndexes, breakpoints, dimensions, space } from '../../../utils/variables';
import { isActive } from '../../../utils/helpers';

import { NavigationContext, NavigationActionTypes } from './NavigationContext';
import NavigationMenu from './NavigationMenu';
import NavButton from './NavButton';

interface ToggleableProps {
  isOpen?: boolean;
  darkmode?:boolean;
}

const path = globalHistory.location.pathname
const Wrapper = styled('aside')<ToggleableProps>`
  margin-top: ${dimensions.heights.header}px;
  transition: all 0.3s ease;
  background-color: ${props => props.darkmode? "#121212" : colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: ${layerIndexes.dialog};
  overflow-y: hidden;

  @media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px) {
    width: ${dimensions.widths.sidebar.sm}px;
    margin-top: 0;
    box-shadow: none;
    border-bottom: none;
  }

  @media (max-width: ${breakpoints.lg - 1}px) {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: ${dimensions.widths.sidebar.md}px;
    height: 100%;
    margin-top: 0;
    padding-bottom: 5rem;
    pointer-events: auto;
    transform: translate(${props => (props.isOpen ? '0' : '-100%')}, 0);
    transition: transform 0.3s ease;
  }

  @media (min-width: ${breakpoints.lg}px) {
    flex: 0 0 ${dimensions.widths.sidebar.lg}px;
    box-shadow: none;
    border-bottom: none;
    background-color: ${props => props.darkmode ?  "#121212" : colors.grey01};
    display: ${props => props.currentPath === '/' || props.currentPath === '/hpcc/About' ? "none" : "block" };
  }
`;

interface WrapperInnerProps {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
}

const WrapperInner = styled('nav')<WrapperInnerProps>`
  margin-top: ${dimensions.heights.header}px;
  height: calc(100vh - ${dimensions.heights.header}px);
  overflow-y: auto;

  @media (min-width: ${breakpoints.lg}px) {
    width: 200px;
    flex: 1 1 auto;
    z-index: 2;
    margin-top: 0;
  }

  ${props => props.hideOnMobile && HideOnMobile}
  ${props => props.hideOnDesktop && HideOnDesktop}
`;
interface HeaderProps {
  darkmode?:boolean
}
const Header = styled('section')<HeaderProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${dimensions.heights.header}px;
  padding: 0 24px;
  background-color: ${props => props.darkmode? "#121212":colors.white};
  border-bottom: 1px solid ${colors.grey02};
  z-index: ${layerIndexes.stickyNav};

  @media (min-width: ${breakpoints.lg}px) {
    display: none;
  }
`;

interface HeaderInnerProps {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
}

const HideOnMobile = css`
  @media (max-width: ${breakpoints.lg - 1}px) {
    display: none;
  }
`;

const HideOnDesktop = css`
  @media (min-width: ${breakpoints.lg}px) {
    display: none;
  }
`;

const HeaderInner = styled('div')<HeaderInnerProps>`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  ${props => props.hideOnMobile && HideOnMobile}
  ${props => props.hideOnDesktop && HideOnDesktop}
`;

const DocumentationMenu = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  border-bottom: 1px solid ${colors.grey02};

  & .menu-link {
    padding: 8px 0;
    color: ${colors.grey07};

    &:hover,
    &:focus,
    &.active {
      color: ${colors.blue07};
      text-decoration: none;
      outline: none;
    }
  }

  ${HideOnDesktop}
`;

const DocumentationNav = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const LoginButton = styled(OutboundLink)`
  ${ButtonStyles}
`;

interface NavigationProps {
  title: string;
  navigation?: Edge<MenuNode>[];
  headerMenus?: Edge<HeaderMenuItem>[];
  navHidden?: boolean;
  darkmode?:boolean
}

function Navigation({ navigation, headerMenus, navHidden , darkmode }: NavigationProps, ) {
  const { state, dispatch } = React.useContext(NavigationContext);
  const path = globalHistory.location.pathname


  return (
    <Wrapper isOpen={state.isOpen} darkmode={darkmode} currentPath={path}>
      <Header darkmode={darkmode}>
        <HeaderInner hideOnDesktop>
          <Heading as="h1" size={400}>
            Menu
          </Heading>
          <NavButton
            icon="x"
            fill={colors.blue08}
            onClick={() => dispatch({ type: NavigationActionTypes.TOGGLE_DRAWER })}
          >
            Toggle Drawer
          </NavButton>
        </HeaderInner>
      </Header>
      {navHidden ? (
        <WrapperInner hideOnDesktop>
          <DocumentationMenu>
            {headerMenus &&
              headerMenus.map(({ node }) => {
                if (node.external) {
                  return (
                    <a key={node.id} className="menu-link" href={node.href} target="_blank" rel="noopener noreferrer">
                      {node.label}
                    </a>
                  );
                }

                return (
                  <Link key={node.id} className="menu-link" getProps={isActive(node.exact, 'menu-link')} to={node.href}>
                    {node.label}
                  </Link>
                );
              })}

            <LoginButton
              variant="primary"
              size={'md' as any}
              href="https://platform.kata.ai/"
              target="_blank"
              rel="noopener noreferrer"
              block
              style={{ marginTop: space.md }}
            >
              Login
            </LoginButton>
          </DocumentationMenu>
        </WrapperInner>
      ) : (
        <WrapperInner>
          <DocumentationMenu>
            {headerMenus &&
              headerMenus.map(({ node }) => {
                if (node.external) {
                  return (
                    <a key={node.id} className="menu-link" href={node.href} target="_blank" rel="noopener noreferrer">
                      {node.label}
                    </a>
                  );
                }

                return (
                  <Link key={node.id} className="menu-link" getProps={isActive(node.exact, 'menu-link')} to={node.href}>
                    {node.label}
                  </Link>
                );
              })}

            <LoginButton
              variant="primary"
              size={'md' as any}
              href="https://platform.kata.ai/"
              target="_blank"
              rel="noopener noreferrer"
              block
              style={{ marginTop: space.md }}
            >
              Login
            </LoginButton>
          </DocumentationMenu>
          <DocumentationNav onClick={() => dispatch({ type: NavigationActionTypes.TOGGLE_DRAWER })}>
            {navigation &&
              navigation.map(({ node }) => <NavigationMenu key={node.title} menuKey={node.title} node={node} dark = {darkmode} />)}
          </DocumentationNav>
        </WrapperInner>
      )}
    </Wrapper>
  );
}

export default Navigation;
