module.exports = {
    description: "Run Bash code. This is DANGEROUS, so only use it if you know what you're doing. Never run any code from people you don't trust.",
    usage: {
        "<код>": "Bash код."
    },
    examples: {},
    aliases: [ "exec" ],
    permissionRequired: 4, // 0 All, 1 Admins, 2 Server Owner, 3 Bot Admin, 4 Bot Owner
    checkArgs: (args) => !!args.length
};

const { exec } = require('child_process');

module.exports.run = async (message, args) => {
    exec(args.join(" "), (error, stdout) => {
    	let res = (error || stdout);
        message.reply(`\`\`\`${res}\`\`\``, { split: true });
	});
};