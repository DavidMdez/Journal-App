export const dateFormat = ( date ) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  return day + ' ' + monthName[month] + ' ' + year + ' ' + ( hours < 10 ? `0${ hours }` : hours )  + ':' + ( minutes < 10 ? `0${ minutes }` : minutes );
}