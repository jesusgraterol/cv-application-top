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
  // the list of months
  static monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December' ];





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





  /* *****************
   * DATE FORMATTING *
   ***************** */

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

  /**
   * Given a start and end date range, it prettifies it and returns it. If no end is provided it will
   * use 'Present' instead.
   * @param {*} start 
   * @param {?} end 
   * @returns string
   */
  static prettifyDateRange(start, end = undefined) {
    return `${Utilities.#prettifyDateRangeChunk(start)} - ${Utilities.#prettifyDateRangeChunk(end)}`;
  }

  /**
   * Generates a pretty date string for a given date range object. If not set, it returns 'Present'.
   * @param {*} dateObj 
   * @returns string
   */
  static #prettifyDateRangeChunk(dateObj) {
    return dateObj ? format(new Date(dateObj.year, dateObj.month, 1), 'MMM yyyy'): 'Present';
  }
}




/**
 * Module Exports
 */
export default Utilities;
