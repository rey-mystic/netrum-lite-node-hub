#### *Read this in other languages:*  
[![English](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/United-Kingdom.png)](README.md)
[![Bahasa Indonesia](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png)](README.id.md)      

---

# Netrum Lite Node Hub

A tool to manage and monitor your Netrum Lite Node directly from Discord.  
Check node status, wallet balance, claim rewards, and view mining logs effortlessly.  

---

## ✨ Features
- Check node online/offline status  
- Monitor wallet balance & address  
- Claim mining rewards  
- View recent mining logs  
- Simple Discord slash commands interface

---

## 📦 Requirements
- Node.js 18+ (recommended latest LTS)  
- Discord Bot Token & Application ID  
- Netrum Lite Node installed and running  
- Linux environment (VPS or WSL for Windows)  

---

## 📁 Folder Structure
```
netrum-lite-node-hub/
├─ bot.js
├─ .env
├─ package.json
├─ package-lock.json
└─ reset-commands.js
```

## ⚙️ Setup

1. Clone this repository
```
git clone https://github.com/rey-mystic/netrum-lite-node-hub.git
cd netrum-lite-node-hub
```
2. Install dependencies
```
npm install
```

3. Configure .env

Fill in your environment variables:
```
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_app_id
NETRUM_PATH=/root/netrum-lite-node
MINING_LOG_PATH=/root/netrum-lite-node/logs/mining.log
```
## 🕹️ Usage

Run the bot with:
```
node bot.js
```

Once the bot is online, use slash commands in Discord:

`/status` → check if node is running  
`/wallet` → view wallet balance and address  
`/claim` → claim staking/mining rewards  
`/mining-log` → view last 10 lines of mining log  

## 👩🏻‍💻 Example Output
![Screenshot_19-8-2025_21105_discord com](https://github.com/user-attachments/assets/189c1d53-e345-4114-9a71-d8fc3b2de81f)
![Screenshot_19-8-2025_21821_discord com](https://github.com/user-attachments/assets/c7bac06e-207f-4037-9e6d-13f6338eec9e)
![Screenshot_19-8-2025_21835_discord com](https://github.com/user-attachments/assets/752ef0d6-f9cd-4893-9b69-4ed870815ed1)
![Screenshot_19-8-2025_21859_discord com](https://github.com/user-attachments/assets/130ea4e9-34ad-47ee-82ff-91e89f4b7d97)
![Screenshot_19-8-2025_21912_discord com](https://github.com/user-attachments/assets/0d1098da-940b-45d4-85ad-551ff833d2a4)


