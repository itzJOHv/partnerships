module.exports = {
	description: "привет :D",
	usage: {},
	examples: {},
	aliases: ["evaluate", "ev"],
	permissionRequired: 4, // 0 All, 1 Admins, 2 Server Owner, 3 Bot Admin, 4 Bot Owner
	checkArgs: (args) => !!args.length
};

module.exports.run = async (message, args) => {
	let content = args.join(" ");
	if (content.includes(".token")) return require("node-fetch")("https://some-random-api.ml/bottoken").then(res => res.text()).then(text => message.reply("```js\n" + text.slice(10, -2) + "```"));
	try {
		let evaled = await eval(content);
		if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

		message.channel.send(evaled, { code: "js", split: true });
	} catch (e) {
		let err;
		if (typeof e == "string") err = e.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else err = e;
		message.channel.send(err, { code: "fix", split: true });
	};
};