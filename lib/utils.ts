export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function getOrdinalDay(day: number) {
  const remainder = day % 10;
  const teens = day % 100;

  if (teens >= 11 && teens <= 13) {
    return `${day}th`;
  }

  if (remainder === 1) {
    return `${day}st`;
  }

  if (remainder === 2) {
    return `${day}nd`;
  }

  if (remainder === 3) {
    return `${day}rd`;
  }

  return `${day}th`;
}

export function formatDisplayDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const day = getOrdinalDay(parsed.getDate());
  const month = parsed.toLocaleString("en-GB", { month: "long" });
  const year = parsed.getFullYear();

  return `${day} ${month} ${year}`;
}
