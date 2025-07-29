interface ISODateObject {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function transformISOToString(dateObj: ISODateObject = {}): string {
  let date = '';

  if (dateObj.days) {
    date += dateObj.days > 1 ? `${dateObj.days} days ` : `${dateObj.days} day `;
  }

  if (dateObj.hours) {
    date += dateObj.hours > 1 ? `${dateObj.hours} hours ` : `${dateObj.hours} hour `;
  }

  if (dateObj.minutes) {
    date += dateObj.minutes > 1 ? `${dateObj.minutes} minutes ` : `${dateObj.minutes} minute `;
  }

  if (dateObj.seconds) {
    date += dateObj.seconds > 1 ? `${dateObj.seconds} seconds ` : `${dateObj.seconds} second `;
  }

  return date.trim();
} 