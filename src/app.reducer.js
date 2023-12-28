
/**
 * App Reducer
 * ...
 */
function appReducer(record, action) {
  switch (action.type) {
    case 'update_bio': {
      return {
        ...record,
        bio: action.newBio
      }
    }
    default: {
      throw new Error(`An unknown action has been dispatched: ${action.type}`);
    }
  }
}




/**
 * Module Exports
 */
export default appReducer;