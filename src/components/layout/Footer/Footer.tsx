import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { colors, breakpoints, space } from 'utils/variables';
import { SocialMedia } from 'interfaces/gatsby';
import { Text } from 'components/foundations';

interface FooterProps {
  version: string;
  siteLastUpdated: string;
  socials?: SocialMedia[];
  darkmode?:boolean;
}

const Wrapper = styled('footer')`
  padding-top: 30px;
  border-top: 1px solid ${colors.grey02};
  bottom: 0;
`;

const Inner = styled('div')`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SocialMediaList = styled('ul')`
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
interface SocialMediaListItemInterface {
  darkmode:boolean;
}
const SocialMediaListItem = styled('li')<SocialMediaListItemInterface>`
  margin: 0;
  margin-left: 8px;
  margin-right: 8px;
  border-radius:25px;
  padding:8px;
  background-color : ${(props) => props.darkmode? "#edf2fb" : colors.white };
  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const SocialMediaLink = styled(OutboundLink)`
  display: inline-block;
  color: inherit;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  &:hover,
  &:focus {
    text-decoration: none;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

const FooterSection = styled('section')`
  @media (max-width: ${breakpoints.md - 1}px) {
    &:not(:first-child) {
      margin-top: ${space.sm}px;
    }
  }
`;

const Footer: React.FC<FooterProps> = ({ version, siteLastUpdated, socials , darkmode }) => {
  const date = new Date(siteLastUpdated);
  return (
    <Wrapper>
      <Inner>
        <FooterSection>
          <Text as="p" size={200} color={darkmode? "white" : colors.grey05}>
            Copyright &copy; {format(date, 'YYYY')} HPCCSystems. All rights reserved.
          </Text>
        </FooterSection>
        {socials && (
          <FooterSection>
            <SocialMediaList>
              {socials.map((social, i) => (
                <SocialMediaListItem key={i} darkmode = {darkmode}>
                  <SocialMediaLink href={social.url} target="_blank" rel="noopener noreferrer">
                    <img src={`/images/${social.imgpath}`} alt={social.name} />
                  </SocialMediaLink>
                </SocialMediaListItem>
              ))}
            </SocialMediaList>
          </FooterSection>
        )}
      </Inner>
    </Wrapper>
  );
};

export default Footer;
