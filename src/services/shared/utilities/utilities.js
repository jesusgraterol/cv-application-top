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
    return dateObj 
      ? format(Utilities.getDateInstanceFromMonthAndYear(dateObj.month, dateObj.year), 'MMM yyyy') 
      : 'Present';
  }

  /**
   * Retrieves a Date Instance based on a given month and year.
   * @param {*} month 
   * @param {*} year 
   * @returns Date
   */
  static getDateInstanceFromMonthAndYear(month, year) {
    return new Date(year, month, 1);
  }




  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Given a list of items (certificates|positions), it will sort them based on the start date desc.
   * @param {*} items 
   * @returns Array<ICertificate|IPosition>
   */
  static sortListItemsByTimestamp(items) {
    const sortedItems = items.slice();
    sortedItems.sort((first, second) => {
      const timestamps = [
        Utilities.getDateInstanceFromMonthAndYear(first.start.month, first.start.year).getTime(),
        Utilities.getDateInstanceFromMonthAndYear(second.start.month, second.start.year).getTime()
      ]
      return timestamps[1] - timestamps[0];
    });
    return sortedItems;
  }
}




/**
 * Module Exports
 */
export default Utilities;
