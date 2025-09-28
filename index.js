const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();

// Import handlers
const messageHandler = require("./handlers/message");
const adminHandler = require("./handlers/admin");
const moderationHandler = require("./handlers/moderation");
const automationHandler = require("./handlers/automation");

// Import database
const { initDatabase } = require("./database/models");

// Import web dashboard
const dashboard = require("./web/dashboard");

class WhatsAppGroupManager {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      },
    });

    this.app = express();
    this.setupExpress();
    this.setupEventHandlers();
  }

  setupExpress() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "web/public")));

    // Dashboard routes
    this.app.use("/dashboard", dashboard);

    this.app.get("/", (req, res) => {
      res.json({
        status: "WhatsApp Group Manager Bot is running",
        version: "1.0.0",
        dashboard: "/dashboard",
      });
    });
  }

  setupEventHandlers() {
    this.client.on("qr", (qr) => {
      console.log("QR Code received, scan with your WhatsApp:");
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      console.log("✅ WhatsApp Group Manager Bot is ready!");
      console.log(`🤖 Bot Name: ${process.env.BOT_NAME || "GroupManager"}`);
      console.log(`📱 Connected as: ${this.client.info.wid.user}`);
    });

    this.client.on("authenticated", () => {
      console.log("🔐 Authentication successful!");
    });

    this.client.on("auth_failure", (msg) => {
      console.error("❌ Authentication failed:", msg);
    });

    this.client.on("disconnected", (reason) => {
      console.log("📱 Client was logged out:", reason);
    });

    // Message handling
    this.client.on("message", async (message) => {
      try {
        await messageHandler.handleMessage(this.client, message);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    // Group events
    this.client.on("group_join", async (notification) => {
      try {
        await automationHandler.handleNewMember(this.client, notification);
      } catch (error) {
        console.error("Error handling new member:", error);
      }
    });

    this.client.on("group_leave", async (notification) => {
      try {
        await automationHandler.handleMemberLeave(this.client, notification);
      } catch (error) {
        console.error("Error handling member leave:", error);
      }
    });
  }

  async start() {
    try {
      // Initialize database
      await initDatabase();
      console.log("📊 Database initialized");

      // Start web server
      const port = process.env.WEB_PORT || 3000;
      this.app.listen(port, () => {
        console.log(`🌐 Web dashboard running on http://localhost:${port}`);
        console.log(`📊 Admin dashboard: http://localhost:${port}/dashboard`);
      });

      // Initialize WhatsApp client
      await this.client.initialize();

      // Start automation tasks
      automationHandler.startScheduledTasks(this.client);
    } catch (error) {
      console.error("Failed to start bot:", error);
      process.exit(1);
    }
  }

  async stop() {
    try {
      await this.client.destroy();
      console.log("🛑 Bot stopped gracefully");
    } catch (error) {
      console.error("Error stopping bot:", error);
    }
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down bot...");
  if (global.bot) {
    await global.bot.stop();
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down bot...");
  if (global.bot) {
    await global.bot.stop();
  }
  process.exit(0);
});

// Start the bot
const bot = new WhatsAppGroupManager();
global.bot = bot;
bot.start().catch(console.error);

module.exports = WhatsAppGroupManager;
