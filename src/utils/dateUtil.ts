/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
 import dayjs, { Dayjs } from 'dayjs';

 const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
 const DATE_FORMAT = 'YYYY-MM-DD ';
 
 export function formatToDateTime(
   date: Dayjs,
   format = DATE_TIME_FORMAT
 ): string {
   return dayjs(date).format(format);
 }
 
 export function formatToDate(date:  Dayjs, format = DATE_FORMAT): string {
   return dayjs(date).format(format);
 }
 
 export const dateUtil = dayjs;
 