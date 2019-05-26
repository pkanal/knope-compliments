## Knope Compliments

A slackbot that sends love to folks in your Slack workspace Leslie Knope style.

### Development

**Setup Slack Credentials**

- Create a Slack workspace instance and add a bot user
- Create a file in the root directory called `secrets.json`

```js
{
    "slackToken": "<YOUR BOT TOKEN>"
}
```

**Install Dependencies**

```sh
$ npm i
```

**Run in Dev Mode**
You will need to install [ngrok](https://ngrok.com/) because slack requires a public URL to post to slash commands.

```sh
$ npm run dev
```

Open a new terminal window and run

```sh
$ ngrok http 3000
```

Copy the ngrok public URL and paste it into the slash command post URL for your bot. You will have to do this everytime you run ngrok.

## Deployment

Configure your AWS credentials through the CLI or add an additional profile called `knope-compliments` to `~/.aws/credentials`

```sh
$ npm run deploy
```

## Contributing

I have some more features I'd love to add to this bot, so if you'd like to contribute please let me know! Some ideas I had:

- Getting the Bot to DM users
- Create a larger set of samples for the compliments so we can eventually use ML to generate new compliments
- Having an emoji reaction trigger the bot
