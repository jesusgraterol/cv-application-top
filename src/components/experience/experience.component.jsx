import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Position from './position.component';
import PositionForm from './position-form.component';

/**
 * Experience Component
 * ...
 */
function Experience({ record, dispatch }) {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  const [modal, setModal] = useState(false);
  const editItemID = useRef(null);

  const addItem = () => {
    editItemID.current = null;
    setModal(true);
  }

  const editItem = (itemID) => {
    editItemID.current = itemID;
    setModal(true);
  }

  return (
    <>
    
      <section  id="experience"
                onMouseEnter={() => setSectionHovered(true)} 
                onMouseLeave={() => setSectionHovered(false)}>

        <header>

          <h2>Experience</h2>
          <span className="separator"></span>
          {
            sectionHovered &&
            <button className="icon-btn primary raised" 
                    aria-label="Add Experience Item" 
                    onClick={addItem}>
              <span className="md-icon" aria-hidden="true">add</span>
            </button>
          }

        </header>

        {record.experience.map((pos) => {
            return <Position key={pos.id} position={pos} editItem={editItem} />
        })}

      </section>
    
      {
        modal &&
        <PositionForm  
          modal={modal} 
          setModal={setModal} 
          record={record} 
          dispatch={dispatch}
          itemID={editItemID.current} />
      }
    
    </>
  );
}
Experience.propTypes = {
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}




/**
 * Module Exports
 */
export default Experience;