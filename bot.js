import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();

// === Utility ===
function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout.trim());
    });
  });
}

// === Client ===
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// === Commands ===
const commands = [
  new SlashCommandBuilder().setName("status").setDescription("Cek status node"),
  new SlashCommandBuilder().setName("wallet").setDescription("Cek wallet info"),
  new SlashCommandBuilder().setName("claim").setDescription("Claim reward"),
  new SlashCommandBuilder().setName("mining-log").setDescription("Lihat mining log")
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);


// === STEP 2: Deploy new commands ===
(async () => {
  try {
    console.log("Deploying commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log("Commands deployed!");
  } catch (e) {
    console.error(e);
  }
})();

// === Handler ===
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.deferReply();

  const NETRUM = process.env.NETRUM_PATH;
  const MINING_LOG = process.env.MINING_LOG_PATH;

  try {
    if (interaction.commandName === "status") {
    let out = await runCommand("ps aux | grep netrum | grep -v grep || echo 'stopped'");
    let result = out === "stopped" ? "❌ Offline" : "✅ Online:\n" + out;
    await interaction.editReply(`Node status:\n${result}`);

  } else if (interaction.commandName === "wallet") {
    let out = await runCommand(`${NETRUM}/netrum-wallet`);
    await interaction.editReply("Wallet Info:\n```" + out.slice(0, 1800) + "```");

  } else if (interaction.commandName === "claim") {
    let out = await runCommand(`echo "y" | ${NETRUM}/netrum-claim`);
    await interaction.editReply("Claim result:\n```" + out.slice(0, 1800) + "```");

  } else if (interaction.commandName === "mining-log") {
    let out = await runCommand(`tail -n 10 ${MINING_LOG}`);
    if (!out.trim()) out = "❌ Mining log kosong atau belum jalan.";
    await interaction.editReply("Mining Log:\n```" + out + "```");
  }


  } catch (e) {
    await interaction.editReply("⚠️ Error: " + e);
  }
});

client.once("ready", () => {
  console.log(`🤖 Bot online sebagai ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
