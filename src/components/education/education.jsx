import { useState } from 'react';

/**
 * Education Component
 * ...
 */
function Education() {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <section  id="education" 
              onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>
      <header>
        <h2>Education</h2>
        <span className="separator"></span>
        {
          sectionHovered &&
          <button className="icon-btn primary raised" aria-label="Add Education Item">
            <span className="md-icon" aria-hidden="true">add</span>
          </button>
        }
      </header>
      <article>
        <p>@TODO</p>
      </article>
    </section>
  );
}




/**
 * Module Exports
 */
export default Education;