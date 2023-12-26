import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
} from 'uuid';
import { format } from 'date-fns';

/**
 * Utilities
 * Provides commonly used functionality in order to main consistency across modules.
 */
class Utilities {
  /* *****************
   * UUID MANAGEMENT *
   ***************** */
  /**
   * Creates an RFC version 4 (random) UUID.
   * @returns string
   */
  static generateUUID() {
    return uuidv4();
  }

  /**
   * Ensures the provided value is a valid uuid and that is version 4.
   * @param {*} uuid
   * @returns boolean
   */
  static validateUUID(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }





  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Formats a timestamp or the current time if none is provided.
   * @param {?} timestamp
   * @returns string
   */
  static formatDate(timestamp = undefined) {
    return format(
      typeof timestamp === 'number' ? new Date(timestamp) : new Date(),
      'dd/MM/yyyy, hh:mm:ss a',
    );
  }
}




/**
 * Module Exports
 */
export default Utilities;
