// Helper to escape MarkdownV2 special characters to avoid parsing errors in Telegram Bot API
export function escapeMarkdown(text) {
  if (!text) return "";
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

/**
 * Sends a formatted hire request notification to Telegram channel/user.
 * @param {Object} data 
 * @param {string} data.name 
 * @param {string} data.email 
 * @param {string} data.proposal 
 * @returns {Promise<boolean>} Success status
 */
export async function sendTelegramNotification(data) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram configurations missing. Skipping notification trigger.");
    return false;
  }

  const { name, email, proposal } = data;

  const escapedName = escapeMarkdown(name);
  const escapedEmail = escapeMarkdown(email);
  const escapedProposal = escapeMarkdown(proposal);

  const text = `🚀 *New Hire Request Received\\!*

👤 *Name:* ${escapedName}
📧 *Email:* ${escapedEmail}

📝 *Proposal Details:*
${escapedProposal}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "MarkdownV2"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Telegram API error response:", errText);
      return false;
    }

    console.log("Telegram push notification dispatched successfully.");
    return true;
  } catch (err) {
    console.error("Telegram network / dispatch exception:", err);
    return false;
  }
}
