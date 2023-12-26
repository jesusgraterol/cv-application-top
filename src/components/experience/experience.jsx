import { useState } from 'react';

/**
 * Experience Component
 * ...
 */
function Experience() {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <section  id="experience"
              onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>
      <header>
        <h2>Experience</h2>
        <span className="separator"></span>
        {
          sectionHovered &&
          <button className="icon-btn primary raised" aria-label="Add Experience Item">
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
export default Experience;