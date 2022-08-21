import axios from "axios";

const token = process.env.SLACK_TOKEN;
const cookie = process.env.SLACK_COOKIE;
const cronAuto = process.env.CRON_AUTO || "0 9 * * 1,2,3,4,5";
const cronAway = process.env.CRON_AWAY || "0 17 * * 1,2,3,4,5";
const timezone = process.env.TIMEZONE || "America/Toronto";

const headers = { Authorization: `Bearer ${token}`, cookie: `d=${cookie}` };
const SLACK_API = "https://slack.com/api/";

type ProfileResponse = {
  profile: {
    status_text: string;
  };
};

type SlackResponse = { ok: boolean };
type PresenceResponse = SlackResponse & { presence: string };
type Presence = "auto" | "away";

const slack = axios.create({ baseURL: SLACK_API, headers });

const getProfile = () =>
  slack.get<ProfileResponse>("users.profile.get").then((r) => r.data.profile);
const getPresence = () => slack.get<PresenceResponse>("users.getPresence").then((r) => r.data);
const setPresence = (presence: Presence) =>
  slack.get<SlackResponse>("users.setPresence", { params: { presence } }).then((r) => r.data);

export async function updatePresence(presence: Presence) {
  const currentPresence = await getPresence();
  const profile = await getProfile();

  console.group(`Updating presence`);
  console.log(new Date().toLocaleString());
  console.log(`Current presence: ${currentPresence.presence}`);
  console.log(`Current status: ${profile.status_text}`);

  if (profile.status_text) {
    console.log("Not setting presence due to status text");
    return;
  }

  console.log(`Setting presence to: ${presence}`);

  const response = await setPresence(presence);

  console.log(`Presence set: ${response.ok}`);

  console.groupEnd();
}
