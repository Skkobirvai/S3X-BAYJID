module.exports = {
	config: {
		name: "goiadmin",
		author: "BaYjid",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "BOT",
		guide: "{pn}"
	},

onChat: function({ api, event }) {
	if (event.senderID !== "100005193854879") {
		var aid = ["100005193854879"];
		for (const id of aid) {
		if ( Object.keys(event.mentions) == id) {
			var msg = [" বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰","এতো মিনশন নাহ দিয়া সিংগেল রে একটা গফ দে 😒 😏","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স","মেনশন দিসনা পারলে একটা গফ দে","Mantion_দিস না বাঁলপাঁক্না প্রচুর বিজি 🥵🥀🤐"];
			return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
		}
		}}
},
onStart: async function({}) {
	}
};
