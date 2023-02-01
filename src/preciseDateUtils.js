import moment from "moment";
// eslint-disable-next-line no-unused-vars
import precisePlugin from "moment-precise-range-plugin";

const MAX_DATE_ELEMENTS = 3;

const SHORT_FORMS = {
  years: "Y",
  months: "M",
  days: "D",
  hours: "h",
  minutes: "m",
  seconds: "s",
};

export function secondsToDiffs(seconds, shortForm = false) {
  const now = moment();
  const nowPlusSeconds = now.clone().add(seconds, "seconds");
  const diffObj = now.preciseDiff(nowPlusSeconds, true);
  delete diffObj.firstDateWasLater;

  let memberCount = 0;
  const diff = [];
  Object.entries(diffObj).forEach(([key, value]) => {
    if (memberCount < MAX_DATE_ELEMENTS && value) {
      const suffix = shortForm ? SHORT_FORMS[key] : ` ${key}`;
      diff.push(`${value}${suffix}`);
      memberCount++;
    }
  });

  return diff.join(" ");
}
