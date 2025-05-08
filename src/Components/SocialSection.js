import { data } from '@/data/constant'
import { Col } from 'react-bootstrap';
function SocialSection() {

  return (
    <Col lg={11} md={12} className="mx-auto order-5 social__items">
      <div className="social__btn">

        {/* Group 1 */}
        <div className="group group-1">
          {data.socialLinks.filter(item => item.group === 'group-1').map((item, index) => (
            <a key={index} href={item.url} className="btn btn__social" target="_blank" rel="noopener noreferrer">
              <i className={item.icon}></i>
              <span className="d-none d-sm-inline">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Group 2 */}
        <div className="group group-2">
          {data.socialLinks.filter(item => item.group === 'group-2').map((item, index) => (
            <a key={index} href={item.url} className="btn btn__social" target="_blank" rel="noopener noreferrer">
              <i className={item.icon}></i>
              <span className="d-none d-sm-inline">{item.label}</span>
            </a>
          ))}
        </div>

      </div>
    </Col>
  );
}

export default SocialSection;
