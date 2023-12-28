import Utilities from './utilities.js';

// RegEx to validate formatted dates
const dateRegEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4},\s[0-9]{2}:[0-9]{2}:[0-9]{2}\s(AM|PM)/;




describe('UUID Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate a valid id', () => {
    const uuid = Utilities.generateUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
    expect(Utilities.validateUUID(uuid)).toBe(true);
    expect(
      /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(uuid),
    ).toBe(true);
  });

  test('can identify invalid uuids', () => {
    expect(Utilities.validateUUID()).toBe(false);
    expect(Utilities.validateUUID(123)).toBe(false);
    expect(Utilities.validateUUID(undefined)).toBe(false);
    expect(Utilities.validateUUID(null)).toBe(false);
    expect(Utilities.validateUUID('')).toBe(false);
    expect(Utilities.validateUUID({})).toBe(false);
    expect(Utilities.validateUUID('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')).toBe(true);
    expect(Utilities.validateUUID('9b1deb4d-3b7d4bad-9bdd-2b0d7b3dcb6d')).toBe(false);
    expect(Utilities.validateUUID('somethingelse')).toBe(false);
    expect(Utilities.validateUUID('9b1deb4d-3%7d-4bad-9bdd-2b0d7b3d-b6d')).toBe(false);
    expect(Utilities.validateUUID('d9428888-122b-11e1-b85c-61cd3cbb3210')).toBe(false);
    expect(Utilities.validateUUID('c106a26a-21bb-5538-8bf2-57095d1976c1')).toBe(false);
    expect(Utilities.validateUUID('630eb68f-e0fa-5ecc-887a-7c7a62614681')).toBe(false);
  });
});





describe('Date Formatting', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can properly format the current time', () => {
    const date = Utilities.formatDate();
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format the current time (passing the current timestamp)', () => {
    const date = Utilities.formatDate(Date.now());
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format a time from the past', () => {
    const date = Utilities.formatDate(1672622975000);
    expect(date).toEqual('01/01/2023, 09:29:35 PM');
  });

  test('can format a date range when only the start is provided', () => {
    const date = Utilities.prettifyDateRange({month: 1, year: 2020});
    expect(date).toEqual('Feb 2020 - Present');
  });

  test('can format a date range when the start and end are provided', () => {
    const date = Utilities.prettifyDateRange({month: 3, year: 2019}, {month: 6, year: 2024});
    expect(date).toEqual('Apr 2019 - Jul 2024');
  });

  test('can retrieve a date instance based on a given month and year', () => {
    const date = Utilities.getDateInstanceFromMonthAndYear(0, 2020);
    expect(date.getTime()).toEqual(1577851200000);
  });
});
