import { useState } from 'react';
import PropTypes from 'prop-types';
import Utilities from '../../services/shared/utilities/utilities';

/**
 * Certificate Component
 * ...
 */
function Certificate({ certificate, editItem }) {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <article  onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>
                
      {
        sectionHovered &&
        <button className="icon-btn" 
                aria-label="Update Education Item" 
                onClick={() => editItem(certificate.id)}>
          <span className="md-icon" aria-hidden="true">edit</span>
        </button>
      }

      <p className="title truncate">{certificate.title}</p>
      <p className="issuer truncate">{certificate.issuer}</p>
      <p className="date-range">{Utilities.prettifyDateRange(certificate.start, certificate.end)}</p>

    </article>
  );
}
Certificate.propTypes = {
  certificate: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
}





/**
 * Module Exports
 */
export default Certificate;