
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
    // @TODO





    /**
     * Education Actions
     */
    case 'add_certificate': {
      return { ...record, };
    }
    case 'update_certificate': {
      return { ...record, };
    }
    case 'delete_certificate': {
      return { ...record, };
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