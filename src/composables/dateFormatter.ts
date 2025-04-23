export function formatUTCToLocal(utcDateStr: string): string {
  const dateUTC = new Date(utcDateStr);
  // Detecta la zona horaria del usuario
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Si el usuario ya está en UTC, se retorna sin cambios
  if (userTimeZone === 'UTC') {
    return dateUTC.toLocaleString('en-GB', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'UTC',
    });
  }

   // Convierte a la zona horaria local
  return dateUTC.toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: userTimeZone,
  });
}

export function formatLocalToUTC(localDateStr: string): string {
  const localDate = new Date(localDateStr);
  // Retorna fecha en UTC estandarizada (ISO 8601)
  return localDate.toISOString(); 
}
