const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const baseApiUrl = async () => {
    const base = await axios.get(
        `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
    );
    return base.data.api;
};

module.exports = {
    config: {
        name: 'pin',
        aliases: ["pinterest","pin"],
        version: "1.0",
        author: "Dipto",
        countDown: 15,
        role: 0,
        shortDescription: "Pinterest Image Search",
        longDescription: "Pinterest Image Search",
        category: "download",
        guide: {
            en: "{pn} query",
        },
    },

    onStart: async function ({ api, event, args }) {
        const queryAndLength = args.join(" ").split("-");
        const q = queryAndLength[0].trim();
        const length = queryAndLength[1].trim();

        if (!q || !length) {
            return api.sendMessage(
                "❌| Wrong Format",
                event.threadID,
                event.messageID,
            );
        }

        try {
            const w = await api.sendMessage("Please wait...", event.threadID);
            const response = await axios.get(
                `${await baseApiUrl()}/pinterest?search=${encodeURIComponent(q)}&limit=${encodeURIComponent(length)}`,
            );
            const data = response.data.data;

            if (!data || data.length === 0) {
                return api.sendMessage(
                    "Empty response or no images found.",
                    event.threadID,
                    event.messageID,
                );
            }

            const diptoo = [];
            const totalImagesCount = Math.min(data.length, parseInt(length));

            for (let i = 0; i < totalImagesCount; i++) {
                const imgUrl = data[i];
                const imgResponse = await axios.get(imgUrl, {
                    responseType: "arraybuffer",
                });
                const imgPath = path.join(
                    __dirname,
                    "dvassests",
                    `${i + 1}.jpg`,
                );
                await fs.outputFile(imgPath, imgResponse.data);
                diptoo.push(fs.createReadStream(imgPath));
            }

            await api.unsendMessage(w.messageID);
            await api.sendMessage(
                {
                    body: `
✅ | 𝐇𝐞𝐫𝐞'𝐬 𝐘𝐨𝐮𝐫 𝐐𝐮𝐞𝐫𝐲 𝐛𝐚𝐬𝐞𝐝 𝐢𝐦𝐚𝐠𝐞𝐬
🐤 | 𝐓𝐨𝐭𝐚𝐥 𝐈𝐦𝐚𝐠𝐞𝐬 𝐂𝐨𝐮𝐧𝐭: ${totalImagesCount}`,
                    attachment: diptoo,
                },
                event.threadID,
                event.messageID,
            );
        } catch (error) {
            console.error(error);
            await api.sendMessage(
                `Error: ${error.message}`,
                event.threadID,
                event.messageID,
            );
        }
    },
};
