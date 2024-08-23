import localStorageMock from '../__mocks__/localStorageMock';

// Injecting Local Storage Mock
beforeAll(() => {
  global.localStorage = localStorageMock as any;
})

import { 
  deleteFromStorage,
  setDataToLocalStorage, 
  isGreaterOrEqualThan24Hours, 
  retrieveDatafromLocalStorage,
  convertMillisecondsToDuration,
  formatTextToHtml 
} from '../utils/utilities'

describe('Casos de prueba para la función "isGreaterOrEqualThan24Hours"', () => {
  it('Retorna true si la diferencia es mayor o igual a 24 horas', () => {
    const twentyFiveHoursAgo = new Date().getTime() - (25 * 60 * 60 * 1000)
    expect(isGreaterOrEqualThan24Hours(twentyFiveHoursAgo)).toBe(true)
  })

  it('Retorna false si la diferencia es menor a 24 horas', () => {
    const twentyThreeHoursAgo = new Date().getTime() - (23 * 60 * 60 * 1000)
    expect(isGreaterOrEqualThan24Hours(twentyThreeHoursAgo)).toBe(false)
  })

  it('Retorna false si el parámetro es null', () => {
    expect(isGreaterOrEqualThan24Hours(null)).toBe(false)
  })
})

describe('Casos de prueba para la función "setDataToLocalStorage"', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  it('Guarda el valor en localStorage', () => {
    const key = 'testKey'
    const value = { data: 'test' }

    setDataToLocalStorage(key, value);

    expect(localStorage.getItem(key)).toBe(JSON.stringify(value))
  })
})

describe('Casos de prueba para la función "retrieveDatafromLocalStorage"', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  it('Retorna el valor parseado desde localStorage', () => {
    const key = 'testKey'
    const value = { data: 'test' }
    localStorage.setItem(key, JSON.stringify(value))

    expect(retrieveDatafromLocalStorage<typeof value>(key)).toEqual(value)
  })

  it('Retorna null si no existe el valor en localStorage', () => {
    expect(retrieveDatafromLocalStorage<any>('nonExistentKey')).toBeNull()
  })
})

describe('Casos de prueba para la función "deleteFromStorage"', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Debería eliminar el valor de localStorage', () => {
    const key = 'testKey'
    const value = { data: 'test' }
    localStorage.setItem(key, JSON.stringify(value))

    deleteFromStorage(key)

    expect(localStorage.getItem(key)).toBeNull()
  })
})

describe('Casos de prueba para la función "convertMillisecondsToDuration"', () => {
  it('Retorna "00:00 (No duration in the API)" si el valor es vacío', () => {
    expect(convertMillisecondsToDuration('')).toBe('00:00 (No duration in the API)');
  })

  it('Convierte correctamente los milisegundos a formato "HH:mm:ss" cuando hay horas', () => {
    const milliseconds = (3 * 60 * 60 * 1000 + 15 * 60 * 1000 + 45 * 1000).toString() // 3 hours, 15 minutes, 45 seconds
    expect(convertMillisecondsToDuration(milliseconds)).toBe('03:15:45')
  })

  it('Convertir correctamente los milisegundos a formato "mm:ss" cuando no hay horas', () => {
    const milliseconds = (15 * 60 * 1000 + 45 * 1000).toString() // 15 minutos, 45 segundos
    expect(convertMillisecondsToDuration(milliseconds)).toBe('15:45')
  })
})

describe('Casos de prueba para la función "formatTextToHtml"', () => {
  it('Reemplaza las URLs por enlaces HTML', () => {
    const text = 'Visita https://example.com para más información'
    const expectedOutput = 'Visita <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a> para más información';

    expect(formatTextToHtml(text)).toBe(expectedOutput);
  })

  it('Retorna el texto sin cambios si no hay URLs', () => {
    const text = 'No hay enlaces en este texto'
    expect(formatTextToHtml(text)).toBe(text)
  })
})