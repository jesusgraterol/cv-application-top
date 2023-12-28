import { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderForm from './header-form.component';

/**
 * Header Component
 * ...
 */
function Header({ record, dispatch }) {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <>
    
      <header id="header"  
              onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>
        
        <img src={record.general.avatar} alt="Photograph of the CV's owner"/>
        
        <span className="separator"></span>

        <article>
          <h1>{record.general.name}</h1>
          <p className="headline">{record.general.headline}</p>

          <ul>
            <li>
              <span className="md-icon">email</span> {record.general.email}
            </li>
            <li>
              <span className="md-icon">phone_iphone</span> {record.general.phoneNumber}
            </li>
            <li>
              <span className="md-icon">location_on</span> {record.general.location}
            </li>
          </ul>
          {
            sectionHovered &&
            <button className="icon-btn raised" 
                    aria-label="Edit Personal Information" 
                    onClick={() => setModal(true)}>
              <span className="md-icon" aria-hidden="true">edit</span>
            </button>
          }
        </article>

      </header>

      <HeaderForm modal={modal} setModal={setModal} record={record} dispatch={dispatch} />
    
    </>

  );
}
Header.propTypes = {
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}




/**
 * Module Exports
 */
export default Header;