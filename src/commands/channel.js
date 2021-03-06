module.exports = {
    description: "Настройка канала отправки партнёрств.",
    usage: {
        "<set|reset>": "Подкоманда; `set` - установить, `reset` - сбросить.",
        "<#канал|ID>": "Упоминание канала или его ID, если подкоманда `set`."
    },
    examples: {},
    aliases: ["ch"],
    permissionRequired: 1, // 0 All, 1 Admins, 2 Server Owner, 3 Bot Admin, 4 Bot Owner
    checkArgs: (args) => (args[0] == "reset" && !args[1]) || (args[0] == "set" && args.length == 2)
};

module.exports.run = async (message, args, gdb) => {
    let mode = args[0];

    switch (mode) {
        case "reset":
            await gdb.set("channel", "");
            await message.react("✅");
            break;
        case "set":
            let c = message.mentions.channels.first() ? message.mentions.channels.first().id : args[1];
            const guildChannel = message.guild.channels.cache.get(c);

            if (!guildChannel) return message.reply("❌ Не удалось найти указанный канал на этом сервере.");
            if (!guildChannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return message.reply("❌ У меня нет прав на отправление сообщений в указанном канале.");
            if (!guildChannel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.reply("❌ У меня нет прав на создание приглашений в указанном канале.");

            await gdb.set("channel", guildChannel.id);
            await message.reply(`✅ Канал отправки партнёрств был успешно установлен (<#${guildChannel.id}>)`);
            break;
    };
};