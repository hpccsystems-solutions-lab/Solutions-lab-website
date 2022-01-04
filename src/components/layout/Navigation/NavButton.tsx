import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'utils/variables';

type NavButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  height?: number;
  width?: number;
  fill?: string;
  icon?: 'hamburger' | 'dark' |'light'|'x' ;
};

const Root = styled('button')`
  display: inline-block;
  margin: 0;
  padding: 0;
  height: 100%;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
  }
`;

const VisuallyHidden = styled('span')`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

const NavButton: React.FC<NavButtonProps> = ({ height, width, fill, icon, children, ...rest }) => {
  if (icon === 'hamburger') {
    return (
      <Root {...rest}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
            <path d="M21 7H3C2.4 7 2 6.6 2 6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6C22 6.6 21.6 7 21 7Z" fill={fill} />
            <path
              d="M21 13H3C2.4 13 2 12.6 2 12C2 11.4 2.4 11 3 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13Z"
              fill={fill}
            />
            <path
              d="M21 19H3C2.4 19 2 18.6 2 18C2 17.4 2.4 17 3 17H21C21.6 17 22 17.4 22 18C22 18.6 21.6 19 21 19Z"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Root>
    );
  }
  if(icon === "dark"){
    return (
      <Root {...rest}>
        <VisuallyHidden>{children}</VisuallyHidden>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="32px" height="34px"><path d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1458514 5 5 8.1458514 5 12 C 5 15.854149 8.1458514 19 12 19 C 15.854149 19 19 15.854149 19 12 C 19 8.1458514 15.854149 5 12 5 z M 12 7 C 14.773268 7 17 9.2267316 17 12 C 17 14.773268 14.773268 17 12 17 C 9.2267316 17 7 14.773268 7 12 C 7 9.2267316 9.2267316 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z M 11 21 L 11 24 L 13 24 L 13 21 L 11 21 z"/></svg>
      </Root>
    );}
      if(icon === "light"){
      return (
        <Root {...rest}>
          <VisuallyHidden>{children}</VisuallyHidden>
          <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g id="Lager_94" data-name="Lager 94" transform="translate(0)">
        <path id="Path_70" data-name="Path 70" d="M12.516,4.509A12,12,0,0,0,22.3,19.881,12.317,12.317,0,0,0,24,20a11.984,11.984,0,0,0,3.49-.514,12.1,12.1,0,0,1-9.963,8.421A12.679,12.679,0,0,1,16,28,12,12,0,0,1,12.516,4.509M16,0a16.5,16.5,0,0,0-2.212.15A16,16,0,0,0,16,32a16.526,16.526,0,0,0,2.01-.123A16.04,16.04,0,0,0,31.85,18.212,16.516,16.516,0,0,0,32,15.944,1.957,1.957,0,0,0,30,14a2.046,2.046,0,0,0-1.23.413A7.942,7.942,0,0,1,24,16a8.35,8.35,0,0,1-1.15-.08,7.995,7.995,0,0,1-5.264-12.7A2.064,2.064,0,0,0,16.056,0Z" fill="#000000"/>
      </g>
    </svg>
        </Root>
      );
  }
  return (
    <Root {...rest}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={fill}
          d="M4.47329 3.52666C4.34776 3.40112 4.1775 3.3306 3.99996 3.3306C3.82243 3.3306 3.65216 3.40112 3.52663 3.52666C3.40109 3.65219 3.33057 3.82246 3.33057 3.99999C3.33057 4.17753 3.40109 4.34779 3.52663 4.47332L7.05996 7.99999L7.99996 7.05999L4.47329 3.52666Z"
        />
        <path
          fill={fill}
          d="M11.5267 12.4733C11.5886 12.5358 11.6624 12.5854 11.7436 12.6193C11.8249 12.6531 11.912 12.6705 12 12.6705C12.088 12.6705 12.1751 12.6531 12.2564 12.6193C12.3376 12.5854 12.4114 12.5358 12.4733 12.4733C12.5358 12.4114 12.5854 12.3376 12.6193 12.2564C12.6531 12.1751 12.6705 12.088 12.6705 12C12.6705 11.912 12.6531 11.8249 12.6193 11.7436C12.5854 11.6624 12.5358 11.5886 12.4733 11.5267L8.94 8L8 8.94L11.5267 12.4733Z"
        />
        <path
          fill={fill}
          d="M3.52667 12.4733C3.58864 12.5358 3.66238 12.5854 3.74362 12.6193C3.82485 12.6531 3.91199 12.6705 4 12.6705C4.08801 12.6705 4.17515 12.6531 4.25638 12.6193C4.33762 12.5854 4.41136 12.5358 4.47333 12.4733L8 8.93999L8.94 7.99999L12.4733 4.47332C12.5989 4.34779 12.6694 4.17753 12.6694 3.99999C12.6694 3.82246 12.5989 3.65219 12.4733 3.52666C12.3478 3.40112 12.1775 3.3306 12 3.3306C11.8225 3.3306 11.6522 3.40112 11.5267 3.52666L8 7.05999L7.06 7.99999L3.52667 11.5267C3.46418 11.5886 3.41459 11.6624 3.38074 11.7436C3.34689 11.8248 3.32947 11.912 3.32947 12C3.32947 12.088 3.34689 12.1751 3.38074 12.2564C3.41459 12.3376 3.46418 12.4113 3.52667 12.4733Z"
        />
      </svg>
    </Root>
  );
};

NavButton.defaultProps = {
  height: 24,
  width: 24,
  fill: colors.grey05,
  icon: 'hamburger'
};

export default NavButton;
