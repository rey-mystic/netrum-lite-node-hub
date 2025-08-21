#### *Baca dalam bahasa lain:*  
[![English](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/United-Kingdom.png)](README.md)
[![Bahasa Indonesia](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png)](README.id.md)      

<img width="1242" height="1656" alt="Netrum Lite Node Hub" src="https://github.com/user-attachments/assets/25ef4166-b3f5-443b-9972-10ab9d403da1" />

------
# Netrum Lite Node Hub

Alat untuk mengelola dan memantau **Netrum Lite Node** Anda langsung dari Discord.  
Cek status node, saldo wallet, klaim reward, dan lihat log mining di server Discord Anda!

---

## ✨ Fitur
- Cek status node online/offline  
- Pantau saldo & alamat wallet  
- Klaim reward mining  
- Lihat log mining terbaru  
- Antarmuka sederhana dengan perintah slash Discord

---

## 📦 Persyaratan
- Node.js 18+ (disarankan versi LTS terbaru)  
- Discord Bot Token & Application ID  
- Netrum Lite Node sudah terpasang dan berjalan  
- Lingkungan Linux (VPS atau WSL untuk Windows)  

---

## 📁 Struktur Folder
```
netrum-lite-node-hub/
├─ bot.js
├─ .env
├─ package.json
├─ package-lock.json
└─ reset-commands.js
```
---
## ⚙️ Setup
### 1. Masuk ke mode root terlebih dahulu
```
sudo su
```
### 2. Clone repository
```
sudo git clone https://github.com/rey-mystic/netrum-lite-node-hub.git
cd netrum-lite-node-hub
```
### 3. Install dependencies
```
npm install
```
### 4. Konfigurasi .env

Isi variabel lingkungan Anda:
```
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_app_id
NETRUM_PATH=/root/.nvm/versions/node/v20.19.4/bin
MINING_LOG_PATH=/home/mystic/mining.log
```
> Pada dasarnya, `NETRUM_PATH` dan `MINING_LOG_PATH` tergantung dari lokasi Anda menginstal Netrum Lite Node dan di mana log mining ditulis. DYOR!

Untuk `NETRUM_PATH`:  
Harus menunjuk ke folder di mana command netrum (atau script untuk menjalankan node) tersedia.
```
which netrum
```
or
```
whereis netrum
```
For `MINING_LOG_PATH`:  
Harus menunjuk ke file log yang dihasilkan oleh Netrum Lite Node.  
- Contoh default (jika mengikuti dokumentasi):
```
/root/netrum-lite-node/logs/mining.log
```
- Jika dipindah, bisa seperti:
```
/home/mystic/mining.log
```

### 5. Membuat Server & Bot Discord
#### Buat Server Discord
- Open [Discord](https://discord.com/) and log in.
- On the left sidebar, click the **+** (Add Server).
- Select **Create My Own**.
- Give your server a name, for example: `Netrum Lite Node Hub`.
- Click **Create** → your server is now ready.
#### Buat Aplikasi Bot
- Go to the [Discord Developer Portal](https://discord.com/developers/applications).
- Click **New Application**, choose a name (e.g. `NetrumHubBot`), then click **Create**.
- Go to the **Bot** tab → Reset Token → Copy the **Bot Token** (you’ll use this for `DISCORD_TOKEN` in your `.env` file).
- Go to **General Information** tab → Copy the **Application ID** (you’ll use this for `CLIENT_ID` in your `.env` file).
   > ⚠️ **Never share your bot token publicly.**
#### Atur Permission Bot
- In the bot application settings, open **OAuth2 URL Generator**.
- Check:
   - **Scopes:** `bot` and `applications.commands`
   - **Bot Permissions:** select `Send Messages`, `Read Messages/View Channels`, `Use Slash Commands`
- Copy the generated invite link, open it in your browser address bar, and select the server you just created.
- Click **Authorize** → your bot is now added to the server!
---
## 🕹️ Cara Menggunakan
### Jalankan bot:
```
node bot.js
```
### Reset command:
> ⚠️Jangan lakukan step ini jika dirasa sudah work. Ini hanya untuk berjaga-jaga jika Anda ingin mengatur ulang command setelah Anda memodifikasinya di `bot.py`   
> Dilakukan reset jika command atau text-nya tidak berubah di tampilan Discord.
```
reset-commands.js
```
### Perintah Slash di Discord:

`/status` → check if node is running  
`/wallet` → view wallet balance and address  
`/claim` → claim preview  
`/claim yes` → claim NPT directly  
`/mining-log` → view last 10 lines of mining log  

---

## 👩🏻‍💻 Example Output

![Screenshot_20-8-2025_93727_discord com](https://github.com/user-attachments/assets/a9514344-a54e-4ce0-93b0-199b0a405274)
<img width="1345" height="1056" alt="Screenshot 2025-08-20 094020" src="https://github.com/user-attachments/assets/91f32bf5-8a61-4e27-a841-415c5cc94ce4" />




