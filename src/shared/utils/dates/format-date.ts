// gets a ISO and returns a formatted date string
export const formatDate = (date: string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }
  
  return dateObj.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  });
}