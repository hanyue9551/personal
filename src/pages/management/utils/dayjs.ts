import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// 时间戳格式化
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).local().format(format);
}

// export function formatTimestamp(
//   timestamp: number,
//   format: string = DATE_TIME_FORMAT
// ) {
//   return "";
// }

// 日期转时间戳(毫秒)
export function formatValueOf(date: string) {
  return dayjs(date).valueOf();
}

// 日期转时间戳(秒)
export function formatUnix(date: string) {
  return dayjs(date).unix();
}
