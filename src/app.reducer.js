
/**
 * App Reducer
 * Handles the state updates for all the possible actions that can be executed within the App.
 */
function appReducer(record, action) {
  switch (action.type) {
    /**
     * Header Actions
     */
    case 'update_general': {
      return { ...record, general: action.newGeneral };
    }

    /**
     * About Actions
     */
    case 'update_bio': {
      return { ...record, bio: action.newBio };
    }

    /**
     * Experience Actions
     */
    case 'positions_changed': {
      return { ...record, experience: action.newPositions };
    }

    /**
     * Education Actions
     */
    case 'certificates_changed': {
      return { ...record, education: action.newCertificates };
    }

    /**
     * Unknown Action
     */
    default: {
      throw new Error(`An unknown action has been dispatched: ${action.type}`);
    }
  }
}




/**
 * Module Exports
 */
export default appReducer;