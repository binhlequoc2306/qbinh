const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const moment = require("moment-timezone");
const { createReadStream, unlinkSync, statSync, existsSync } = require("fs-extra");
const Youtube = require('youtube-search-api');

// --- Tải nhạc từ YouTube ---
async function getdl(link, downloadPath) {
    const timestart = Date.now();
    if (!link) return 'Thiếu link';

    return new Promise((resolve, reject) => {
        ytdl(link, {
            filter: format =>
                format.quality === 'tiny' &&
                format.audioBitrate === 48 &&
                format.hasAudio === true
        })
        .pipe(fs.createWriteStream(downloadPath))
        .on("close", async () => {
            try {
                const data = await ytdl.getInfo(link);
                const result = {
                    title: data.videoDetails.title,
                    dur: Number(data.videoDetails.lengthSeconds),
                    viewCount: data.videoDetails.viewCount,
                    likes: data.videoDetails.likes,
                    uploadDate: data.videoDetails.uploadDate,
                    sub: data.videoDetails.author.subscriber_count,
                    author: data.videoDetails.author.name,
                    timestart: timestart
                };
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
        .on("error", (error) => {
            reject(error);
        });
    });
}

// --- Chuyển đổi giây sang định dạng HH:mm:ss ---
function convertHMS(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);

    hours = hours < 10 ? "0" + hours : "" + hours;
    minutes = minutes < 10 ? "0" + minutes : "" + minutes;
    seconds = seconds < 10 ? "0" + seconds : "" + seconds;

    return (hours !== '00' && hours !== '0' ? hours + ':' : '') + minutes + ':' + seconds;
}

module.exports.config = {
    name: "sing",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie, Fix: pcoder",
    description: "Phát nhạc thông qua từ khoá tìm kiếm trên YouTube",
    commandCategory: "Music",
    usages: "[từ khóa]",
    cooldowns: 0,
    usePrefix: true,
    dependencies: {
        "@distube/ytdl-core": "",
        "youtube-search-api": "",
        "moment-timezone": "",
        "fs-extra": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, senderID, messageID, type, messageReply } = event;
    const client = global.client;
    const cacheDir = path.join(__dirname, 'cache');
    if (!existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    const downloadPath = path.join(cacheDir, `sin-${senderID}.mp3`);

    // Xử lý reply chọn bài
    if (type === 'message_reply' && client.handleReply) {
        const handle = client.handleReply.find(item => item.messageID === messageReply?.messageID && item.name === module.exports.config.name);
        if (handle) {
            return module.exports.handleReply({ api, event, handleReply: handle });
        }
    }

    if (!args.length) {
        return api.sendMessage('❎ Phần tìm kiếm không được để trống!', threadID, messageID);
    }

    const keywordSearch = args.join(" ");
    if (existsSync(downloadPath)) unlinkSync(downloadPath);

    try {
        const searchData = await Youtube.GetListByKeyword(keywordSearch, false, 8);
        const data = searchData.items.filter(i => i.type === "video");
        if (!data.length) {
            return api.sendMessage('❎ Không tìm thấy kết quả nào phù hợp với từ khóa của bạn.', threadID, messageID);
        }

        const link = data.map(v => v.id);
        const msg = data.map((value, index) => {
            return `|› ${index + 1}. ${value.title}\n|› 👤 Kênh: ${value.channelTitle}\n|› ⏱️ Thời lượng: ${value.length.simpleText}\n──────────────────`;
        }).join('\n');

        return api.sendMessage(
            `📝 Có ${link.length} kết quả trùng với từ khóa tìm kiếm:\n──────────────────\n${msg}\n\n📌 Reply (phản hồi) STT để tải nhạc`,
            threadID,
            (error, info) => {
                if (error) return console.error(error);
                client.handleReply = client.handleReply || [];
                client.handleReply.push({
                    type: 'reply',
                    name: module.exports.config.name,
                    messageID: info.messageID,
                    author: senderID,
                    link
                });
            },
            messageID
        );
    } catch (error) {
        console.error(error);
        return api.sendMessage('❎ Đã xảy ra lỗi, vui lòng thử lại sau!', threadID, messageID);
    }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { threadID, senderID, messageID, body } = event;
    const selectedNumber = parseInt(body, 10) - 1;
    if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber >= handleReply.link.length) {
        return api.sendMessage('❎ Lựa chọn không hợp lệ. Vui lòng nhập số tương ứng với bài hát muốn tải.', threadID, messageID);
    }

    const videoID = handleReply.link[selectedNumber];
    const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
    const downloadPath = path.join(__dirname, 'cache', `sin-${senderID}.mp3`);

    try {
        const data = await getdl(videoURL, downloadPath);

        if (typeof data === 'string') {
            return api.sendMessage(data, threadID, messageID);
        }

        // Kiểm tra giới hạn file 25MB của Messenger
        if (statSync(downloadPath).size > 26214400) {
            unlinkSync(downloadPath);
            return api.sendMessage('❎ File quá lớn, vui lòng chọn bài khác!', threadID, messageID);
        }

        // Xóa tin nhắn lựa chọn và xóa handleReply
        if (global.client.handleReply)
            global.client.handleReply = global.client.handleReply.filter(item => item.messageID !== handleReply.messageID);

        api.unsendMessage(handleReply.messageID);

        return api.sendMessage({
            body: `[ 🎶 Âm Nhạc Từ YouTube ]\n──────────────────\n` +
                `|› 🎬 Title: ${data.title}\n` +
                `|› ⏱️ Thời lượng: ${convertHMS(data.dur)}\n` +
                `|› 🗓️ Ngày tải lên: ${data.uploadDate}\n` +
                `|› 👤 Tên kênh: ${data.author} (${data.sub})\n` +
                `|› 🌐 Lượt xem: ${data.viewCount}\n` +
                `|› 📥 Link tải: https://www.youtubepp.com/watch?v=${videoID}\n` +
                `|› ⏳ Thời gian xử lý: ${Math.floor((Date.now() - data.timestart) / 1000)} giây\n` +
                `──────────────────\n` +
                `|› ⏰ Time: ${moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss | DD/MM/YYYY")}`,
            attachment: createReadStream(downloadPath)
        }, threadID, () => {
            try {
                unlinkSync(downloadPath);
            } catch (e) {}
        }, messageID);

    } catch (error) {
        console.error(error);
        return api.sendMessage('❎ Đã xảy ra lỗi trong quá trình tải nhạc. Vui lòng thử lại sau!', threadID, messageID);
    }
};