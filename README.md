# Automatically update Slack presence

## Getting started

### Getting Slack token and cookie

1. Using Chrome, open and sign into the slack customization page,
   e.g. https://my.slack.com/customize
2. Right click anywhere on the page and choose "inspect" from the
   context menu. This will open the Chrome developer tools.
3. Find the console (it's one of the tabs in the developer tools window)
4. At the prompt ("> ") type the following:
   `window.prompt("your api token is: ", TS.boot_data.api_token)`
5. Copy the displayed token elsewhere.
6. If your token starts with `xoxc` then keep following the other steps below, otherwise you are done and can close the window.
7. Now switch to the Applications tab in the Chrome developer tools (or Storage tab in Firefox developer tools).
8. Expand Cookies in the left-hand sidebar.
9. Click the cookie entry named `d` and copy its value. Note, use the default encoded version, so _don't click_ the Show URL decoded checkbox.
10. Now you're done and can close the window.

Source: https://github.com/yuya373/emacs-slack#how-to-get-token-and-cookie

### Create .env file

- `SLACK_TOKEN` (required) - from above
- `SLACK_COOKIE` (required) - from above
- `TIMEZONE` (optional) - defaults to `America/Toronto`
- `CRON_AUTO` (optional) - defaults to `0 9 * * 1,2,3,4,5` - every weekday at 9am
- `CRON_AWAY` (optional) - defaults to `0 17 * * 1,2,3,4,5` - every weekday at 5pm

### Run cron jobs in Docker

```
docker compose -d --build
```

### Alternative:

Create a new folder and add a `.env` as described above, then create a `docker-compose.yml` file with these contents:

```
version: "3.8"

services:
  slack-auto-away:
    environment:
      SLACK_TOKEN: ${SLACK_TOKEN}
      SLACK_COOKIE: ${SLACK_COOKIE}
      CRON_AUTO: ${CRON_AUTO}
      CRON_AWAY: ${CRON_AWAY}
      TIMEZONE: ${TIMEZONE}
    build:
      context: .
      dockerfile: Dockerfile
```

Then run it:

```
docker compose up -d
```
