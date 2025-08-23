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
  new SlashCommandBuilder().setName("status").setDescription("Check node status"),
  new SlashCommandBuilder().setName("wallet").setDescription("Check wallet info"),
  new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claim reward (run '/claim' for preview, '/claim yes' for confirmation)")
    .addStringOption(opt =>
      opt.setName("confirm")
        .setDescription("Type 'yes' for claim confirmation")
        .setRequired(false)
    ),
  new SlashCommandBuilder().setName("mining-log").setDescription("View mining log")
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
      let out = await runCommand("ps aux | grep netrum | grep -v grep | grep '^root' | tail -n 1 || echo 'stopped'");
      let result;
      if (out === "stopped") {
      result = "❌  Offline";
    } else {
      result = "✅  Online\n" +
               "```\n" + out + "\n```"; // langsung rapat, tanpa spasi ekstra
    }
      await interaction.editReply(`Node Status:\n${result}`);

    } else if (interaction.commandName === "wallet") {
      let out = await runCommand(`${NETRUM}/netrum-wallet`);
      await interaction.editReply("Wallet Info:\n```" + out.slice(0, 1800) + "```");

    } else if (interaction.commandName === "claim") {
      const confirm = interaction.options.getString("confirm");

      if (confirm !== "yes") {
  
        let preview = await runCommand(`echo "n" | ${NETRUM}/netrum-claim`);
        preview = preview.replace(/\x1B\[[0-9;]*[A-Za-z]/g, "")
                 .replace(/[^\x20-\x7E\n\r]/g, "")   // remove non-ASCII
                 .split("\n")
                 .map(line => line.replace(/^(\?\?\s*)/, "")) // remove ?? at start
                 .map(line => line.replace(/\?\?/g, ""))      // remove stray ??
                 .map(line => line.trim())
                 .filter(line => line.length > 0 && !line.includes("Transaction rejected"))
                 .join("\n");

        await interaction.editReply(
          "Claim Preview (not executed yet):\n```" + preview + "```\n" +
          "To continue, run: `/claim yes`"
        );

      } else {
       
        let out = await runCommand(`echo "y" | ${NETRUM}/netrum-claim`);
        out = out.slice(0, 1800)
                 .replace(/\x1B\[?.*?[\@-~]/g, "")
                 .replace(/[^\x20-\x7E\n\r]/g, "")
                 .split("\n")
                 .map(line => line.replace(/^(\?\?\s*)/, ""))
                 .map(line => line.replace(/\?\?/g, ""))
                 .map(line => line.trim())
                 .filter(line => line.length > 0)
                 .join("\n");

        await interaction.editReply("✅ Claim Result:\n```" + out + "```");
      }

    } else if (interaction.commandName === "mining-log") {
      let out = await runCommand(`tail -n 50 ${MINING_LOG}`);
      if (!out.trim()) out = "❌ Mining log empty or not running.";
      out = out.replace(/\x1B\[?.*?[\@-~]/g, "")
               .replace(/\x1Bc/g, "")
               .split("\n")
               .map(line => line.trim())
               .filter(line => line.length > 0 && !line.includes("Error fetching status"));

      let lastActive = out.reverse().find(line => line.includes("Status: ✅ ACTIVE") || line.includes("Status: ⏳ CLAIM PENDING"));
      if (!lastActive) lastActive = "❌ No active status in the logs.";

      await interaction.editReply("Mining Log (last active):\n```" + lastActive + "```");
    }

  } catch (e) {
    await interaction.editReply("⚠️ Error: " + e);
  }
});

client.once("ready", () => {
  console.log(`Bot online as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
