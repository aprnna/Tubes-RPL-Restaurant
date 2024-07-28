export const getDateTimeLocal = (date: Date = new Date()): string => {
    const pad = (num: number) => (num < 10 ? '0' + num : num);
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  