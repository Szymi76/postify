import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/pl";

dayjs.extend(relativeTime);
dayjs.locale("pl");

export const timeFromNow = (date: number | Date) => dayjs(date).fromNow();
