import { useState } from 'react';

/**
 * Position Component
 * ...
 */
function Position() {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <article  onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>

      {
        sectionHovered &&
        <button className="icon-btn" aria-label="Update Experience Item">
          <span className="md-icon" aria-hidden="true">edit</span>
        </button>
      }
      <p className="title truncate">Front-End Engineer</p>
      <p className="company truncate">Google</p>
      <p className="date-range">Aug 2022 - Present</p>
      <ul>
        <li>- Interactivity Implementation</li>
        <li>- Web and Mobile UI/UX Design</li>
        <li>- Team Collaboration and Organization</li>
      </ul>

    </article>
  );
}




/**
 * Module Exports
 */
export default Position;