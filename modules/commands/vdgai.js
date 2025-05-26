module.exports.config = {
    name: "vdgai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "cos cais loon",
    description: "cos",
    usePrefix: false,
    commandCategory: "Hệ Thống",
    usages: "cos",
    cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
    const replyMsg = "🐲 có đớp đc đâu mà";

    // Kiểm tra global.khanhdayr có là mảng và có phần tử không
    let attachment = undefined;
    if (global.khanhdayr && Array.isArray(global.khanhdayr) && global.khanhdayr.length > 0) {
        attachment = global.khanhdayr.splice(0, 1);
    }

    return api.sendMessage({
        body: replyMsg,
        attachment
    }, event.threadID, event.messageID);
};