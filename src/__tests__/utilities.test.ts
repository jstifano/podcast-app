import localStorageMock from '../__mocks__/localStorageMock';
import { 
  deleteFromStorage,
  setDataToLocalStorage, 
  isGreaterOrEqualThan24Hours, 
  retrieveDatafromLocalStorage,
  convertMillisecondsToDuration,
  formatTextToHtml 
} from '@utils/helpers';

describe('Helpers', () => {
  // Injecting Local Storage Mock
  beforeAll(() => {
    global.localStorage = localStorageMock as any;
  });

  describe("isGreaterOrEqualThan24Hours", () => {

    it('Return true if the difference is higher or equal to 24 hours', () => {
      const twentyFiveHoursAgo = new Date().getTime() - (25 * 60 * 60 * 1000);
  
      expect(isGreaterOrEqualThan24Hours(twentyFiveHoursAgo)).toBe(true);
    });
  
    it('Return false if the difference is lower than 24 hours', () => {
      const twentyThreeHoursAgo = new Date().getTime() - (23 * 60 * 60 * 1000);
      
      expect(isGreaterOrEqualThan24Hours(twentyThreeHoursAgo)).toBe(false);
    });
  
    it('Return false if the parameter is null', () => {
      expect(isGreaterOrEqualThan24Hours(null)).toBe(false);
    });
  });
  
  describe("setDataToLocalStorage", () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('Save the value into localStorage', () => {
      const key = 'testKey';
      const value = { data: 'test' };
  
      setDataToLocalStorage(key, value);
  
      expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
    });
  });
  
  describe("retrieveDatafromLocalStorage", () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('Return the value parsed from localStorage', () => {
      const key = 'testKey';
      const value = { data: 'test' };
      
      localStorage.setItem(key, JSON.stringify(value));
  
      expect(retrieveDatafromLocalStorage<typeof value>(key)).toEqual(value);
    });
  
    it('Return null if doesn not exist the value in localStorage', () => {
      expect(retrieveDatafromLocalStorage<any>('nonExistentKey')).toBeNull();
    });
  });
  
  describe("deleteFromStorage", () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('Should delete the value from localStorage', () => {
      const key = 'testKey';
      const value = { data: 'test' };
      localStorage.setItem(key, JSON.stringify(value));
  
      deleteFromStorage(key);
  
      expect(localStorage.getItem(key)).toBeNull();
    });
  });
  
  describe("convertMillisecondsToDuration", () => {
    it('Return "00:00 (No duration in the API)" if the value is empty', () => {
      expect(convertMillisecondsToDuration('')).toBe('00:00 (No duration in the API)');
    });
  
    it('Convert correctly the milliseconds to a format "HH:mm:ss" when there are no hours', () => {
      const milliseconds = (3 * 60 * 60 * 1000 + 15 * 60 * 1000 + 45 * 1000).toString(); // 3 hours, 15 minutes, 45 seconds
      expect(convertMillisecondsToDuration(milliseconds)).toBe('03:15:45');
    });
  
    it('Convert correctly the milliseconds to a format "mm:ss" when there are no hours', () => {
      const milliseconds = (15 * 60 * 1000 + 45 * 1000).toString(); // 15 minutes, 45 seconds
      expect(convertMillisecondsToDuration(milliseconds)).toBe('15:45');
    });
  });
  
  describe("formatTextToHtml", () => {
    it('Replace the URLs by HTML links', () => {
      const text = 'Visit https://example.com for more information';
      const expectedOutput = 'Visit <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a> for more information';
  
      expect(formatTextToHtml(text)).toBe(expectedOutput);
    });
  
    it('Return the text without changes if there are no URLs', () => {
      const text = 'There are no link in this text';
      expect(formatTextToHtml(text)).toBe(text);
    });
  });
});