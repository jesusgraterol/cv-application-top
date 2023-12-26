import { useState } from 'react';

/**
 * About Component
 * ...
 */
function About() {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <section  id="about" 
              onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>
      <header>
        <h2>About</h2>
        <span className="separator"></span>
        {
        sectionHovered && 
          <button className="icon-btn primary raised" aria-label="Edit the About Section">
            <span className="md-icon" aria-hidden="true">edit</span>
          </button>
        }

      </header>
      <article>
        <p>
          I&apos;m a passionate front-end developer with a knack for bringing beautiful and functional 
          web experiences to life. Combining my technical expertise with an eye for design, I weave code 
          into interactive tapestries that captivate users and drive results.
        </p>
      </article>
    </section>
  );
}




/**
 * Module Exports
 */
export default About;