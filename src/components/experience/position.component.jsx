import { useState } from 'react';
import PropTypes from 'prop-types';
import Utilities from '../../services/shared/utilities/utilities';

/**
 * Position Component
 * ...
 */
function Position({ position, editItem }) {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  return (
    <article  onMouseEnter={() => setSectionHovered(true)} 
              onMouseLeave={() => setSectionHovered(false)}>

      {
        sectionHovered &&
        <button className="icon-btn"
                aria-label="Update Experience Item"
                onClick={() => editItem(position.id)}>
          <span className="md-icon" aria-hidden="true">edit</span>
        </button>
      }
      <p className="title truncate">{position.title}</p>
      <p className="company truncate">{position.employeer}</p>
      <p className="date-range">{Utilities.prettifyDateRange(position.start, position.end)}</p>
      <ul>
        {position.responsibilities.split(',').map((item, i) => {
          return <li key={i}>- {item}</li>;
        })}
      </ul>

    </article>
  );
}
Position.propTypes = {
  position: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
}




/**
 * Module Exports
 */
export default Position;