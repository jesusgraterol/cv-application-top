import { useState } from 'react';

/**
 * Certificate Component
 * ...
 */
function Certificate() {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <article  onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>
                
      {
        sectionHovered &&
        <button className="icon-btn" aria-label="Update Education Item">
          <span className="md-icon" aria-hidden="true">edit</span>
        </button>
      }

      <p className="title truncate">Computer Science and Engineering</p>
      <p className="issuer truncate">Massachusetts Institute of Technology</p>
      <p className="date-range">Jan 2020 - Feb 2023</p>

    </article>
  );
}




/**
 * Module Exports
 */
export default Certificate;