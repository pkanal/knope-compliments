const { WebClient } = require("@slack/client");
const { parse } = require("querystring");
const compliments = require("./compliments.json");

const token = process.env.SLACK_TOKEN;

const parseNames = namesString =>
  namesString.split(" ").map(name => `${name.split("|")[0]}>`);

const selectRandomIndex = array =>
  array[Math.floor(Math.random() * array.length)];

const getCompliments = (names, compliments) =>
  names.reduce(
    (string, name) => `${string} \n ${name}, ${selectRandomIndex(compliments)}`,
    ""
  );

module.exports.sendCompliment = (event, context, callback) => {
  const web = new WebClient(token);
  const body = parse(event.body);
  const names = parseNames(body.text);
  return web.chat
    .postMessage({
      channel:
        body.channel_name === "directmessage"
          ? names[0]
              .replace("<", "")
              .replace("@", "")
              .replace(">", "")
          : body.channel_id,
      attachments: [
        {
          fallback: "Someone sent you some love!",
          text: getCompliments(parseNames(body.text), compliments),
          footer: `:heart: from <@${body.user_id}>`
        }
      ]
    })
    .then(res => {
      return {
        statusCode: 200
      };
    })
    .catch(err => {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          error: err.message
        })
      };
    });
};
