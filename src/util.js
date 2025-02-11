import dayjs from 'dayjs';

function formatStringToDateTime(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

function formatStringToShortDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatStringToTime(date) {
  return dayjs(date).format('HH:mm');
}

function formatStringToDateTimeWithLine(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

export {formatStringToDateTime, formatStringToShortDate, formatStringToTime, formatStringToDateTimeWithLine};
