import { useState } from 'react';

/**
 * Header Component
 * ...
 */
function Header() {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <header id="header"  
            onMouseEnter={() => setSectionHovered(true)} 
            onMouseLeave={() => setSectionHovered(false)}>
      
      <img src="default-avatar.png" alt="Photograph of the CV's owner"/>
      
      <span className="separator"></span>

      <article>
        <h1>Jane Doe</h1>
        <p className="headline">Front-End Engineer</p>

        <ul>
          <li>
            <span className="md-icon">email</span> janedoe@gmail.com
          </li>
          <li>
            <span className="md-icon">phone_iphone</span> +1 320 455 8881
          </li>
          <li>
            <span className="md-icon">location_on</span> Albuquerque, New Mexico, U.S.
          </li>
        </ul>
        {
          sectionHovered &&
          <button className="icon-btn raised" aria-label="Edit Personal Information">
            <span className="md-icon" aria-hidden="true">edit</span>
          </button>
        }
      </article>
    </header>
  );
}




/**
 * Module Exports
 */
export default Header;