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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function isPointPresent(point) {
  return dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo));
}

function isPointFuture(point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPointPast(point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}

export {formatStringToDateTime, formatStringToShortDate, formatStringToTime, formatStringToDateTimeWithLine, isPointFuture, isPointPast, isPointPresent, updateItem};
