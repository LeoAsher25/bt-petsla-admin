import moment from "moment";

export default function formatTime(
  time: string | Date,
  formatPattern: string = "YYYY/MM/DD"
) {
  return moment(time).format(formatPattern);
}
