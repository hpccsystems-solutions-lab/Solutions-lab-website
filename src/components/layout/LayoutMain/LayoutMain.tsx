import React from 'react';
import styled from 'styled-components';
import { globalHistory } from "@reach/router"

import { NavigationContext } from '../Navigation/NavigationContext';
import { breakpoints, dimensions } from '../../../utils/variables';

interface LayoutMainInnerProps {
  isNavigationOpen?: boolean;
  navHidden?: boolean;
}

interface LayoutMainProps extends LayoutMainInnerProps {
  className?: string;
}

const StyledLayoutMain = styled('main')<LayoutMainInnerProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  /* transition: margin-left 0.3s ease; */
  /* padding-left: 10px; */

  /* @media (min-width: ${breakpoints.lg}px) {
    margin-left: ${props => (props.navHidden || props.currentPath === '/' || props.currentPath === 'hpcc/About' ? 0 : dimensions.widths.sidebar.sm)}px;
  } */
`;

const LayoutMain: React.SFC<LayoutMainProps> = ({ children, navHidden, className }) => {
const { state } = React.useContext(NavigationContext);
const path = globalHistory.location.pathname
  return (
    <StyledLayoutMain id="reach-skip-nav" className={className} isNavigationOpen={state.isOpen} navHidden={navHidden} currentPath={path}>
      {children}
    </StyledLayoutMain>
  );
};

export default LayoutMain;
