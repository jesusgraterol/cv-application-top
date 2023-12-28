
/**
 * App Reducer
 * Handles the state updates for all the possible actions that can be executed within the App.
 */
function appReducer(record, action) {
  switch (action.type) {
    /**
     * About Actions
     */
    case 'update_bio': {
      return {
        ...record,
        bio: action.newBio
      }
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