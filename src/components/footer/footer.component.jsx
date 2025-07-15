import './footer.styles.scss';

import githubIcon from "../../assets/github-mark.svg";
import linkedinIcon from "../../assets/linkedin.svg";

const FooterComponent = () => {
  return (
    <div className='container footer'>
      <div className='footer-content'>
        <div className='footer-icons'>
          <a href='https://www.linkedin.com/in/ronak-vaghela-066858359/' target='_blank'>
            <img src={linkedinIcon} alt='LinkedIn' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
