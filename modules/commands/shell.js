module.exports.config = {
	name: "shell",
	version: "7.3.1",
	hasPermssion: 2,
	credits: "pcoder",
	description: "Chạy lệnh shell (dành cho admin)",
	commandCategory: "Admin",
	usages: "[lệnh shell]",
	cooldowns: 0,
	dependencies: {
		"child_process": ""
	}
};

module.exports.run = async function({ api, event, args }) {
	const { exec } = require("child_process");
	const permission = global.config.ADMINBOT || [];
	if (!permission.includes(event.senderID)) {
		return api.sendMessage("⚠️ Bạn không được phép sử dụng lệnh này.", event.threadID, event.messageID);
	}
	const text = args.join(" ");
	if (!text) return api.sendMessage("⚠️ Vui lòng nhập lệnh shell để chạy.", event.threadID, event.messageID);

	exec(text, { timeout: 30000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
		if (error) {
			return api.sendMessage(`❌ Lỗi:\n${error.message}`, event.threadID, event.messageID);
		}
		if (stderr) {
			return api.sendMessage(`⚠️ stderr:\n${stderr}`, event.threadID, event.messageID);
		}
		const output = stdout && stdout.length > 19500
			? stdout.substring(0, 19500) + "\n\n[Đã cắt bớt output]"
			: stdout || "[Không có output]";
		api.sendMessage(`✅ stdout:\n${output}`, event.threadID, event.messageID);
	});
};