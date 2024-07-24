export const isGreaterOrEqualThan24Hours = (date: number | null): Boolean => {
  if (date) {
    const now = new Date().getTime()
    const difference = now - date
    const hoursDifference = difference / (1000 * 60 * 60)
    
    return Boolean(hoursDifference >= 24)
  }
  return false
}

export const setDataToLocalStorage = <T>(key: string, valor: T): void => {
  localStorage.setItem(key, JSON.stringify(valor))
}

export const retrieveDatafromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}

export const deleteFromStorage = (key: string): void => {
  localStorage.removeItem(key)
}

export const convertMillisecondsToDuration = (milliseconds: string) => {
  if(!milliseconds) {
    return `00:00 (No duration in the API)`
  } else {
     // Calculate hours, minutes, and seconds from the milliseconds
    const hours = Math.floor(+milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((+milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((+milliseconds % (1000 * 60)) / 1000);
    
    // Format minutes and seconds to always have two digits
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    
    // If hours are greater than 0, include them in the format "HH:mm:ss"
    if (hours > 0) {
      let formattedHours = hours.toString().padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    
    // If hours are 0, return the format "mm:ss"
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export const formatTextToHtml = (text: string) => {
  // Regular expression to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URLs with HTML links
  const formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')

  return formattedText
}