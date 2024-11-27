/**
 * Formatea una fecha en el formato 'YYYY-MM-DD'.
 * @param dateString - La fecha en formato de string.
 * @returns Fecha formateada en formato 'YYYY-MM-DD'.
 */
export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-CA', options).format(new Date(dateString));
  };
  
  /**
   * Formatea una hora para asegurarse de que esté en el formato 'HH:mm'.
   * @param time - La hora en formato de string.
   * @returns Hora formateada en formato 'HH:mm'.
   */
  export const formatTime = (time: string | undefined | null): string => {
    if (!time || !time.includes(':')) return '-';
    const [hour = '00', minute = '00'] = time.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
  };
  