# 🤖 WhatsApp Group Manager Bot

A comprehensive WhatsApp Group Management Bot designed to reduce admin stress and automate group moderation tasks.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
[![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/template)
[![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)


## ✨ Features

### 👥 Member Management

- **Kick/Ban Users** - Remove problematic members with customizable durations
- **Mute/Unmute** - Temporarily silence users
- **Warning System** - 3-strike system with automatic actions
- **Promote/Demote** - Manage admin privileges

### 🤖 Auto-Moderation

- **Anti-Spam Protection** - Detect and remove spam messages
- **Anti-Link Filter** - Block unauthorized links with whitelist support
- **Bad Word Filter** - Customizable word blacklist
- **Flood Protection** - Prevent message flooding

### 🎯 Smart Welcome System

- **Custom Welcome Messages** - Personalized greetings for new members
- **Rule Reminders** - Automatically share group rules
- **Welcome Media** - Support for images and stickers

### 📊 Analytics & Reports

- **Group Statistics** - Track messages, members, and activity
- **Moderation Logs** - Complete audit trail of actions
- **User Analytics** - Monitor member behavior and activity
- **Export Data** - Download group data and reports

### 🌐 Web Dashboard

- **Real-time Monitoring** - Live group statistics and status
- **Settings Management** - Configure bot settings via web interface
- **Moderation Logs** - View and manage moderation actions
- **Multi-group Support** - Manage multiple groups from one dashboard

## 🚀 Quick Setup

### Prerequisites

- Node.js 16+
- WhatsApp account
- Basic terminal knowledge

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/whatsapp-group-manager.git
   cd whatsapp-group-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp env.example .env
   # Edit .env with your settings
   ```

4. **Start the bot**

   ```bash
   npm start
   ```

5. **Scan QR Code**

   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Scan the QR code displayed in terminal

6. **Access Dashboard**
   - Open http://localhost:3000/dashboard
   - Login with admin credentials

## 📱 Commands

### 👑 Admin Commands

| Command                  | Description              | Example                         |
| ------------------------ | ------------------------ | ------------------------------- |
| `/kick @user [reason]`   | Kick user from group     | `/kick @john Spamming`          |
| `/ban @user [duration]`  | Ban user temporarily     | `/ban @jane 7d`                 |
| `/mute @user [duration]` | Mute user                | `/mute @bob 1h`                 |
| `/warn @user [reason]`   | Give warning             | `/warn @alice Inappropriate`    |
| `/promote @user`         | Make user admin          | `/promote @charlie`             |
| `/demote @user`          | Remove admin rights      | `/demote @david`                |
| `/setdesc [text]`        | Change group description | `/setdesc Welcome to our group` |
| `/setname [name]`        | Change group name        | `/setname My Awesome Group`     |
| `/setrules [text]`       | Set group rules          | `/setrules Be respectful`       |
| `/autowelcome on/off`    | Toggle welcome messages  | `/autowelcome on`               |
| `/antispam on/off`       | Toggle spam protection   | `/antispam on`                  |
| `/antilink on/off`       | Toggle link protection   | `/antilink on`                  |
| `/modlog`                | Show moderation log      | `/modlog`                       |
| `/groupinfo`             | Show group details       | `/groupinfo`                    |

### 👤 User Commands

| Command                  | Description             | Example                |
| ------------------------ | ----------------------- | ---------------------- |
| `/help`                  | Show available commands | `/help`                |
| `/rules`                 | Display group rules     | `/rules`               |
| `/info`                  | Show group information  | `/info`                |
| `/stats`                 | Show group statistics   | `/stats`               |
| `/report @user [reason]` | Report problematic user | `/report @spammer`     |
| `/feedback [message]`    | Send feedback to admins | `/feedback Great bot!` |
| `/warnings @user`        | Check user warnings     | `/warnings @john`      |

## ⚙️ Configuration

### Environment Variables

```env
# Bot Settings
BOT_NAME=GroupManager
BOT_PREFIX=/
BOT_ADMIN_PHONE=+1234567890

# Database
DATABASE_PATH=./database/bot.db

# Web Dashboard
WEB_PORT=3000
WEB_HOST=localhost
DASHBOARD_PASSWORD=admin123

# Auto-Moderation
MAX_WARNINGS=3
WARNING_EXPIRE_DAYS=30
SPAM_THRESHOLD=5
FLOOD_PROTECTION_SECONDS=2

# Welcome Messages
WELCOME_MESSAGE=Welcome to the group!
WELCOME_ENABLED=true

# Anti-Spam
ANTISPAM_ENABLED=true
ANTILINK_ENABLED=true
ALLOWED_DOMAINS=github.com,google.com,youtube.com
```

### Group Settings

Each group can have customized settings:

- Welcome message templates
- Anti-spam sensitivity
- Allowed domains for links
- Maximum warnings before action
- Auto-moderation rules

## 🐳 Docker Deployment

### Build and Run

```bash
# Build the image
docker build -t whatsapp-group-manager .

# Run the container
docker run -d \
  --name whatsapp-bot \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -e DASHBOARD_PASSWORD=your_password \
  whatsapp-group-manager
```

### Docker Compose

```yaml
version: "3.8"
services:
  whatsapp-bot:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - DASHBOARD_PASSWORD=your_password
      - NODE_ENV=production
    restart: unless-stopped
```

## ☁️ Cloud Deployment

### Railway

1. Fork this repository
2. Connect your GitHub account to Railway
3. Deploy with one click using the Railway button above
4. Set environment variables in Railway dashboard

### Render

1. Connect your GitHub repository to Render
2. Use the `render.yaml` configuration
3. Deploy automatically on every push

### Heroku

1. Click the Heroku deploy button above
2. Configure environment variables
3. Deploy with one click

## 📊 Web Dashboard

Access the web dashboard at `http://your-domain:3000/dashboard`

### Features:

- **Real-time Statistics** - Live group activity monitoring
- **Group Management** - Configure settings for each group
- **Moderation Logs** - View all moderation actions
- **Bot Status** - Monitor bot health and performance
- **Settings Panel** - Update bot configuration

### Authentication:

- Username: `admin`
- Password: Set via `DASHBOARD_PASSWORD` environment variable

## 🔧 Development

### Project Structure

```
whatsapp-group-manager/
├── README.md
├── package.json
├── index.js                    # Main bot entry
├── config/
│   ├── settings.js            # Bot configuration
│   └── permissions.js         # Role-based permissions
├── handlers/
│   ├── message.js             # Message processing
│   ├── admin.js               # Admin commands
│   ├── moderation.js          # Auto-moderation
│   └── automation.js          # Scheduled tasks
├── database/
│   ├── models.js              # SQLite schemas
│   ├── groups.js              # Group management
│   └── users.js               # User data & warnings
├── features/
│   ├── welcome.js             # Welcome messages
│   ├── antispam.js            # Spam detection
│   ├── antilink.js            # Link filtering
│   └── analytics.js           # Group statistics
├── web/
│   ├── dashboard.js           # Admin web interface
│   └── public/                # Web assets
└── deploy/
    ├── railway.json
    ├── render.yaml
    ├── heroku.json
    └── Dockerfile
```

### Running in Development

```bash
# Install dependencies
npm install

# Start with nodemon for auto-reload
npm run dev

# Or start normally
npm start
```

## 🛡️ Security

### Best Practices:

- Use strong dashboard passwords
- Regularly update dependencies
- Monitor bot logs for suspicious activity
- Limit bot permissions to necessary groups only
- Use environment variables for sensitive data

### Permissions:

- Bot requires admin privileges in groups
- Commands are role-based (admin/moderator/user)
- Rate limiting prevents command spam
- Cooldowns on powerful commands

## 📈 Performance

### Optimizations:

- SQLite database for fast queries
- In-memory caching for frequently accessed data
- Efficient message processing
- Minimal resource usage
- Automatic cleanup of old data

### Monitoring:

- Built-in health checks
- Performance metrics in dashboard
- Error logging and reporting
- Memory usage tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues:

**Bot not responding:**

- Check if bot has admin privileges
- Verify WhatsApp connection
- Check console logs for errors

**Commands not working:**

- Ensure proper command syntax
- Check user permissions
- Verify bot is admin in group

**Dashboard not loading:**

- Check if web server is running
- Verify port configuration
- Check authentication credentials

### Getting Help:

- 📖 Check the [documentation](docs/)
- 🐛 Report bugs via [GitHub Issues](https://github.com/yourusername/whatsapp-group-manager/issues)
- 💬 Join our [Discord community](https://discord.gg/your-invite)
- 📧 Email support: support@yourdomain.com

## 🙏 Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp Web API
- [Express.js](https://expressjs.com/) - Web framework
- [SQLite](https://sqlite.org/) - Database
- [Node.js](https://nodejs.org/) - Runtime environment

---

**Made with ❤️ for WhatsApp group administrators**

_Reduce admin stress, automate moderation, and create better group experiences!_
