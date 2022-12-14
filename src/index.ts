import { CronJob } from "cron";
import { updatePresence } from "./updatePresence";

const cronAuto = process.env.CRON_AUTO || "0 9 * * 1,2,3,4,5";
const cronAway = process.env.CRON_AWAY || "0 18 * * 1,2,3,4,5";
const timezone = process.env.TIMEZONE || "America/Toronto";

console.log(`Timezone: ${timezone}`);
console.log(`Schedule for setting presence to away: ${cronAway}`);
console.log(`Schedule for setting presence to auto: ${cronAuto}`);

function handleError(error: Error) {
  console.error("Failed to update presence", error);
}

new CronJob(cronAuto, () => updatePresence("auto").catch(handleError), null, true, timezone);
new CronJob(cronAway, () => updatePresence("away").catch(handleError), null, true, timezone);
