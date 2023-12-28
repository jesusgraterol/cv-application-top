/**
 * Database
 * Exposes the local storage API so the data managed in the app can persist.
 */
class Database {
  // the name of the table that holds the entire object
  static #tableName = 'cv';

  /**
   * Stores a given CV record in the database.
   * @param {*} newRecord 
   */
  static set(newRecord) {
    localStorage.setItem(Database.#tableName, JSON.stringify(newRecord));
  }


  /**
   * Retrieves the current CV record from the database. If none has yet been set, it returns the
   * default.
   */
  static get() {
    try {
      return JSON.parse(localStorage.getItem(Database.#tableName));
    } catch (e) {
      console.error(e);
      return Database.#buildDefaultRecord();
    }
  }

  /**
   * Builds the default CV record that is used when it has not yet been set.
   * @returns 
   */
  static #buildDefaultRecord() {
    return {
      general: {
        avatar: 'default-avatar.png',
        name: 'Jane Doe',
        headline: 'Front-End Engineer',
        email: 'janedoe@gmail.com',
        phoneNumber: '+1 320 455 8881',
        location: 'Albuquerque, New Mexico, U.S.'
      },
      bio: 'I\'m a passionate front-end developer with a knack for bringing beautiful and functional web experiences to life. Combining my technical expertise with an eye for design, I weave code into interactive tapestries that captivate users and drive results.',
      experience: [
        {
          title: 'Front-End Engineer',
          employeer: 'Google',
          start: { month: 7, year: 2022 },
          end: undefined,
          responsibilities: 'Interactivity Implementation, Web and Mobile UI/UX Design, Team Collaboration and Organization'
        },
      ],
      education: [
        {
          title: 'Computer Science and Engineering',
          issuer: 'Massachusetts Institute of Technology',
          start: { month: 1, year: 2020 },
          end: { month: 2, year: 2023 },
        }
      ]
    };
  }
}




/**
 * Module Exports
 */
export default Database;
