import moment from "moment"
export function DateFormatter(date) {
  if(date) {
    return moment(date).utc().format('DD/MM/YYYY')
  }
}

export function DateTimeFormatter(date) {
  if (date) {
    return moment(date).utc().format('DD/MM/YYYY  h:mm a')
  }
}

export function TimeFormatter(time) {
  if (time) {
    return moment(time).utc().format('h:mm a')
  }
}

