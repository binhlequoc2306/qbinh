module.exports.config = {
  name: "ghép",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hải harin",
  description: "Ghép đôi", // fix by PCODER
  commandCategory: "Người dùng",
  usages: "ghép",
  usePrefix: true,
  cooldowns: 10
};

module.exports.onLoad = async () => {
  const { resolve } = require("path");
  const { existsSync, mkdirSync } = require("fs-extra");
  const { downloadFile } = global.utils;
  const dirMaterial = resolve(__dirname, 'cache/canvas');
  const path = resolve(dirMaterial, 'pairing.png');
  if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
  if (!existsSync(path)) await downloadFile("https://i.postimg.cc/X7R3CLmb/267378493-3075346446127866-4722502659615516429-n.png", path);
};

module.exports.circle = async (image) => {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
};

module.exports.run = async function ({ api, event, Threads, Users, Currencies, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const moment = require("moment-timezone");

  var hm = [
    "https://i.imgur.com/41FJd4m.jpg",
    "https://i.imgur.com/uHAsXg2.jpg",
    "https://i.imgur.com/ycCfkMS.jpg",
    "https://i.imgur.com/q064dsF.jpg",
    "https://i.imgur.com/XuAl9rP.jpg",
    "https://i.imgur.com/4FOsdRA.jpg",
    "https://i.imgur.com/G5rA8K9.jpg"
  ];
  var hmm = hm[Math.floor(Math.random() * hm.length)];
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  const { threadID, senderID, messageID, type, mentions, body } = event, { PREFIX } = global.config;
  let threadSetting = global.data.threadData.get(threadID) || {};
  let prefix = threadSetting.PREFIX || PREFIX;

  if (args.length == 0) return api.sendMessage({
    body: `=== [ 𝗦𝗘𝗥𝗩𝗘𝗥 𝗚𝗛𝗘́𝗣 ] ===
━━━━━━━━━━━━━━━
💙 ${prefix}𝗴𝗵𝗲́𝗽𝘃𝟮 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗱𝗮̣𝗻𝗴 𝗴𝗵𝗲́𝗽 𝗰𝘂̉𝗮 𝗮𝗽𝗽 𝘁𝗶𝗻𝗱𝗲𝗿
❤️ ${prefix}𝗴𝗵𝗲́𝗽 + 𝘀𝘃 𝗯𝗼𝘁 𝘀𝗲̃ 𝘁𝗶̀𝗺 𝗻𝗵𝘂̛̃𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗿𝗲̂𝗻 𝘀𝗲𝗿𝘃𝗲𝗿
💛 ${prefix}𝗴𝗵𝗲́𝗽 + 𝗰𝗮𝗻𝘃𝗮𝘀 𝗴𝗵𝗲́𝗽 đ𝗼̂𝗶 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗮̉𝗻𝗵 𝗰𝗮𝗻𝘃𝗮𝘀
🖤 ${prefix}𝗚𝗵𝗲́𝗽 + 𝗰𝗮𝗻𝘃𝗮𝘀𝟮 𝗴𝗵𝗲́𝗽 đ𝗼̂𝗶 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗮̉𝗻𝗵 𝗰𝗮𝗻𝘃𝗮𝘀
💚 ${prefix}𝗚𝗵𝗲́𝗽 + 𝘀𝗲𝘁𝗯𝗱 𝗴𝗵𝗲́𝗽 đ𝗼̂𝗶 𝗱𝗮̣𝗻𝗴 𝗰𝗼́ 𝘀𝗲𝘁 𝗕𝗗
💜 ${prefix}𝗴𝗵𝗲́𝗽 + 𝗴𝗶𝗳 𝗴𝗵𝗲́𝗽 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗰𝗼́ 𝗺𝗼̣̂𝘁 𝗴𝗶𝗳 𝗰𝘂𝘁𝗲 𝗼̛̉ 𝗴𝗶𝘂̛̃𝗮

⚠️ 𝗟𝘂̛𝘂 𝘆́: 𝗗𝘂̀𝗻𝗴 𝗻𝗵𝘂 𝘁𝗿𝗲̂𝗻 đ𝗲̂̉ 𝘅𝘂̛̉ 𝗱𝘂̣𝗻𝗴, 𝘃𝗶𝗲̂́𝘁 đ𝘂́𝗻𝗴 𝗰𝗵𝗶́𝗻𝗵 𝘁𝗮̉ 𝘁𝗵𝗶̀ 𝗺𝗼̛́𝗶 𝗹𝗲̂𝗻`,
    attachment: (await axios.get(`${hmm}`, { responseType: 'stream' })).data
  }, event.threadID, event.messageID);

  // ghép đôi dạng gif
  if (args[0] == "gif") {
    const res = await axios.get(`https://lechi.click/text/thinh`);
    var love = res.data.data;
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
    const thuDict = {
      "Sunday": "𝗖𝗵𝘂̉ 𝗡𝗵𝗮̣̂𝘁",
      "Monday": "𝗧𝗵𝘂̛́ 𝗛𝗮𝗶",
      "Tuesday": "𝗧𝗵𝘂̛́ 𝗕𝗮",
      "Wednesday": "𝗧𝗵𝘂̛́ 𝗧𝘂̛",
      "Thursday": "𝗧𝗵𝘂̛́ 𝗡𝗮̆𝗺",
      "Friday": "𝗧𝗵𝘂̛́ 𝗦𝗮́𝘂",
      "Saturday": "𝗧𝗵𝘂̛́ 𝗕𝗮̉𝘆"
    };
    thu = thuDict[thu] || thu;

    var { participantIDs } = (await Threads.getData(event.threadID)).threadInfo;
    var tle = Math.floor(Math.random() * 101);
    var namee = (await Users.getData(event.senderID)).name;
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID && ID != event.senderID);
    var id = listUserID[Math.floor(Math.random() * listUserID.length)];
    var name = (await Users.getData(id)).name;
    var arraytag = [
      { id: event.senderID, tag: namee },
      { id: id, tag: name }
    ];
    const gifCute = [
      "https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif",
      "https://i.imgur.com/HvPID5q.gif",
      "https://i.pinimg.com/originals/9c/94/78/9c9478bb26b2160733ce0c10a0e10d10.gif",
      "https://i.pinimg.com/originals/9d/0d/38/9d0d38c79b9fcf05f3ed71697039d27a.gif",
      "https://i.imgur.com/BWji8Em.gif"
    ];

    // Download and save avatars and gif
    let Avatar = (await axios.get(`https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8"));
    let gifLove = (await axios.get(gifCute[Math.floor(Math.random() * gifCute.length)], { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8"));
    let Avatar2 = (await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8"));

    var imglove = [
      fs.createReadStream(__dirname + "/cache/avt.png"),
      fs.createReadStream(__dirname + "/cache/giflove.png"),
      fs.createReadStream(__dirname + "/cache/avt2.png")
    ];
    var msg = {
      body: `💓=== [ 𝗟𝗼𝘃𝗲 𝗖𝗼𝘂𝗽𝗹𝗲 ] ===💓\n━━━━━━━━━━━━\n😽 𝗚𝗵𝗲́𝗽 Đ𝗼̂𝗶 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴\n[❤️] → 𝗧𝗲̂𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻: ${namee}\n[🤍] → 𝗧𝗲̂𝗻 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗮̂́𝘆: ${name}\n[🎀] → 𝗧𝗶̉ 𝗟𝗲̣̂ 𝗛𝗼̛̣𝗽 Đ𝗼̂𝗶 𝗟𝗮̀:${tle}%\n[⏰] → 𝗚𝗵𝗲́𝗽 đ𝗼̂𝗶 𝘃𝗮̀𝗼 𝗹𝘂́𝗰: [ ${thu} | ${gio} ]\n━━━━━━━━━━━━\n[💌] → 𝗧𝗵𝗶́𝗻𝗵: ${love}`,
      mentions: arraytag,
      attachment: imglove
    };
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  // [Các lệnh ghép đôi khác mã nguồn của bạn giữ nguyên...]

  // TODO: Bạn có thể tiếp tục sửa các lệnh khác (canvas, canvas2, setbd, sv, tinder) theo mẫu bên trên.
  // Đảm bảo sử dụng await/async đúng, kiểm tra lỗi, dọn dẹp file tạm sau khi gửi, và dùng messageID đúng chỗ.
};

module.exports.handleReply = async ({ api, event, handleReply, Users, Currencies }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const token = `6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const tile = (Math.random() * 50) + 50;

  switch (handleReply.type) {
    case "ghep": {
      switch (event.body) {
        case "Trai": {
          api.unsendMessage(handleReply.messageID);
          api.sendMessage(`🌐====「 𝗧𝗜𝗡𝗗𝗘𝗥 𝗦𝗘𝗔𝗥𝗖𝗛 」====🌐

→ 𝗕𝗼𝘁 đ𝗮𝗻𝗴 𝘁𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝗻𝗮𝗺 𝗽𝗵𝘂̀ 𝗵𝗼̛̣𝗽 𝘃𝗼̛́𝗶 𝗯𝗮̣𝗻 🧒...`, event.threadID);
          var ThreadInfo = await api.getThreadInfo(event.threadID);
          var all = ThreadInfo.userInfo;
          let data = [];
          for (let male of all) {
            if (male.gender == "MALE" && male.id != handleReply.author) data.push(male.id);
          }
          let member = data[Math.floor(Math.random() * data.length)];
          let n = (await Users.getData(member)).name;
          let name = await Users.getNameUser(handleReply.author);
          let Avatar_boy = (await axios.get(`https://graph.facebook.com/${member}/picture?height=1500&width=1500&access_token=` + token, { responseType: "arraybuffer" })).data;
          fs.writeFileSync(__dirname + `/cache/avt1.png`, Buffer.from(Avatar_boy, "utf-8"));
          let Avatar_author = (await axios.get(`https://graph.facebook.com/${handleReply.author}/picture?width=512&height=512&access_token=` + token, { responseType: "arraybuffer" })).data;
          fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar_author, "utf-8"));
          var arraytag = [
            { id: handleReply.author, tag: name },
            { id: member, tag: n }
          ];
          var imglove = [
            fs.createReadStream(__dirname + "/cache/avt1.png"),
            fs.createReadStream(__dirname + "/cache/avt2.png")
          ];
          var msg = {
            body: `💙====『 𝗧𝗜𝗡𝗗𝗘𝗥 𝗟𝗢𝗩𝗘 』====💙
━━━━━━━━━━━━━━━━━━

→ 𝗧𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 💍
→ 𝗧𝗶̉ 𝗹𝗲̣̂ 𝗵𝗼̛̣𝗽 𝗻𝗵𝗮𝘂 𝗰𝘂̉𝗮 𝗵𝗮𝗶 𝗯𝗮̣𝗻 𝗹𝗮̀: ${tile.toFixed(2)}%\n💞 𝗖𝗵𝘂́𝗰 𝟮 𝗯𝗮̣𝗻 𝘁𝗿𝗮̆𝗺 𝗻𝗮̆𝗺 𝗵𝗮̣𝗻𝗵 𝗽𝗵𝘂́𝗰\n` + n + " 💓 " + name,
            mentions: arraytag,
            attachment: imglove
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        }
        case "Gai": {
          api.unsendMessage(handleReply.messageID);
          api.sendMessage(`🌐====「 𝗧𝗜𝗡𝗗𝗘𝗥 𝗦𝗘𝗔𝗥𝗖𝗛 」====🌐

→ 𝗕𝗼𝘁 đ𝗮𝗻𝗴 𝘁𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝗻𝘂̛̃ 𝗽𝗵𝘂̀ 𝗵𝗼̛̣𝗽 𝘃𝗼̛́𝗶 𝗯𝗮̣𝗻 👧...`, event.threadID);
          var ThreadInfo = await api.getThreadInfo(event.threadID);
          var all = ThreadInfo.userInfo;
          let data = [];
          for (let female of all) {
            if (female.gender == "FEMALE" && female.id != handleReply.author) data.push(female.id);
          }
          let member = data[Math.floor(Math.random() * data.length)];
          let n = (await Users.getData(member)).name;
          let name = await Users.getNameUser(handleReply.author);
          let Avatar_girl = (await axios.get(`https://graph.facebook.com/${member}/picture?height=1500&width=1500&access_token=` + token, { responseType: "arraybuffer" })).data;
          fs.writeFileSync(__dirname + `/cache/avt1.png`, Buffer.from(Avatar_girl, "utf-8"));
          let Avatar_author = (await axios.get(`https://graph.facebook.com/${handleReply.author}/picture?width=512&height=512&access_token=` + token, { responseType: "arraybuffer" })).data;
          fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar_author, "utf-8"));
          var arraytag = [
            { id: handleReply.author, tag: name },
            { id: member, tag: n }
          ];
          var imglove = [
            fs.createReadStream(__dirname + "/cache/avt1.png"),
            fs.createReadStream(__dirname + "/cache/avt2.png")
          ];
          var msg = {
            body: `💙====『 𝗧𝗜𝗡𝗗𝗘𝗥 𝗟𝗢𝗩𝗘 』====💙
━━━━━━━━━━━━━━━━━━

→ 𝗧𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 💍
→ 𝗧𝗶̉ 𝗹𝗲̣̂ 𝗵𝗼̛̣𝗽 𝗻𝗵𝗮𝘂 𝗰𝘂̉𝗮 𝗵𝗮𝗶 𝗯𝗮̣𝗻 𝗹𝗮̀: ${tile.toFixed(2)}%\n💞 𝗖𝗵𝘂́𝗰 𝟮 𝗯𝗮̣𝗻 𝘁𝗿𝗮̆𝗺 𝗻𝗮̆𝗺 𝗵𝗮̣𝗻𝗵 𝗽𝗵𝘂́𝗰\n` + n + " 💓 " + name,
            mentions: arraytag,
            attachment: imglove
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        }
      }
    }
  }
};