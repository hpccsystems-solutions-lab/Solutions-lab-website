import { breakpoints } from 'utils/variables';
import styled from 'styled-components';

interface DocsWrapperProps {
  hasToc?: boolean;
}

const DocsWrapper = styled('article')<DocsWrapperProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  padding: 32px;
  @media (min-width: ${breakpoints.lg}px) {
    flex-direction: ${props => props.hasToc && 'row-reverse'};
  }

  @media (max-width: ${breakpoints.lg - 1}px) {
    overflow-x: auto;
  }

  .ecl_example{
    margin-top: -50px;
    margin-bottom: -30px;
  }

  .ecl_data{
    display: none;
  }

  .ecl_code{
    margin-top: -20px;
    margin-bottom: 0px;
    padding-bottom: -20px;;
  }
`;

export default DocsWrapper;
