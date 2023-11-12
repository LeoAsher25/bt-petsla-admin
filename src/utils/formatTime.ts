import moment from "moment";

export default function formatTime(
  time?: string | Date,
  formatPattern: string = "YYYY/MM/DD"
) {
  if (!time) return "";
  return moment(time).format(formatPattern);
}
