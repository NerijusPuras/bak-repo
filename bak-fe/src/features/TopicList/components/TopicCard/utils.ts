import { DateTime } from "luxon";

export const getRelativeDate = (date: Date) => {
  const dateNow = DateTime.now();
  const dateModified = DateTime.fromISO(date.toString(), {
    zone: "utc",
  });

  const dateDiff = dateNow
    .diff(dateModified, [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ])
    .toObject();

  const relativeDate = dateNow.minus(dateDiff).toRelative();

  return relativeDate === "in 0 seconds" || relativeDate === "0 seconds ago"
    ? "ką tik"
    : relativeDate;
};
