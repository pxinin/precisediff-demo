import moment from "moment";
// eslint-disable-next-line no-unused-vars
import precisePlugin from "moment-precise-range-plugin";

const MAX_DATE_ELEMENTS = 3;

export function secondsToDiffs(seconds) {
  const now = moment();
  const nowPlusSeconds = now.clone().add(seconds, "seconds");
  const diffObj = now.preciseDiff(nowPlusSeconds, true);
  delete diffObj.firstDateWasLater;

  let memberCount = 0;
  const diff = [];
  Object.entries(diffObj).forEach(([key, value]) => {
    if (memberCount < MAX_DATE_ELEMENTS && value) {
      diff.push(`${value}${key}`);
      memberCount++;
    }
  });

  return diff.join(" ");
}
