import React from "react";
import "./footer.css";
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { useStaticQuery, graphql } from "gatsby";

const currentYear = new Date().getFullYear();
function Footer() {
  // Get social Links
  const socialData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          socials {
            name
            url
          }
        }
      }
    }
  `);

  const socials = socialData.site.siteMetadata.socials;
  const socialLinks = {};

  socials.forEach((social) => {
    socialLinks[social.name] = social.url;
  });

  return (
    <div className="footer">
      <div className="footer__socialLinks">
        <a href={socialLinks.GitHub} target="_blank" rel="noopener noreferrer">
          <GithubOutlined />
        </a>
        <a href={socialLinks.LinkedIn} target="_blank" rel="noopener noreferrer">
          <LinkedinOutlined />
        </a>
        <a href={socialLinks.Twitter} target="_blank" rel="noopener noreferrer">
          <TwitterOutlined />
        </a>
      </div>
      <div className="footer__copyrightInfo">Copyright &copy;&nbsp;{currentYear} HPCCSystems. All rights reserved.</div>
    </div>
  );
}

export default Footer;
