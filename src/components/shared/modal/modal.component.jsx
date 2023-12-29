import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Header Component
 * ...
 */
function Modal({ openModal, closeModal, children }) {
  const ref = useRef();
  
  useEffect(() => {
    if (openModal) {
      ref.current.showModal();
    } else {
      /**
       * ref.current.close() is never invoked as when openModal is false, the dialog element is 
       * fully removed from the DOM in the parent component.
       */
      // ref.current.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} onClose={closeModal}>
      {children}
    </dialog>
  );
}
Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};



/**
 * Module Exports
 */
export default Modal;