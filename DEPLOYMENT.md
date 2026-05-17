# Deploy Brill Studio on a Hostinger VPS

This app is prepared to run as one production service:

- React is built into `frontend/dist`
- Express serves both `/api/*` and the React app
- PM2 keeps the Node process running
- Nginx routes your subdomain to Node on port `5000`

Replace `studio.yourdomain.com` with your real subdomain in all commands.

## 1. Point the Subdomain to the VPS

In Hostinger DNS, create an `A` record:

```text
Type: A
Name: studio
Points to: YOUR_VPS_IP
TTL: default
```

DNS propagation can take time. Test it:

```bash
ping studio.yourdomain.com
```

## 2. Prepare the VPS

SSH into the server:

```bash
ssh root@YOUR_VPS_IP
```

Install Node.js LTS, Nginx, Git, PM2, and Certbot:

```bash
apt update
apt install -y nginx git curl certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

Check versions:

```bash
node -v
npm -v
pm2 -v
```

## 3. Upload the Application

Recommended path:

```bash
mkdir -p /var/www
cd /var/www
```

Option A, using Git:

```bash
git clone YOUR_REPOSITORY_URL brill-studio
cd brill-studio
```

Option B, using SCP from your computer:

```bash
scp -r "D:\SitePilot AI\Studio Rental" root@YOUR_VPS_IP:/var/www/brill-studio
```

If using SCP, avoid uploading `node_modules` and `frontend/dist`; the server will rebuild them.

## 4. Configure Environment

On the VPS:

```bash
cd /var/www/brill-studio
cp backend/.env.production.example backend/.env
nano backend/.env
```

Set:

```text
NODE_ENV=production
PORT=5000
JWT_SECRET=use-a-long-random-secret
FRONTEND_ORIGIN=https://studio.yourdomain.com
```

Generate a strong secret if needed:

```bash
openssl rand -hex 32
```

## 5. Install and Build

```bash
npm run install:all
npm run build
```

## 6. Start With PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Run the command printed by `pm2 startup`, then save again:

```bash
pm2 save
```

Check the app:

```bash
pm2 status
curl http://127.0.0.1:5000/api/health
```

Expected:

```json
{"status":"ok","service":"Brill Studio API"}
```

## 7. Configure Nginx

Create the Nginx site:

```bash
nano /etc/nginx/sites-available/brill-studio
```

Paste this and replace the domain:

```nginx
server {
    listen 80;
    server_name studio.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:

```bash
ln -s /etc/nginx/sites-available/brill-studio /etc/nginx/sites-enabled/brill-studio
nginx -t
systemctl reload nginx
```

## 8. Add SSL

```bash
certbot --nginx -d studio.yourdomain.com
```

Test renewal:

```bash
certbot renew --dry-run
```

## 9. Open the App

Visit:

```text
https://studio.yourdomain.com
```

Admin:

```text
https://studio.yourdomain.com/admin
```

Default login:

```text
admin / admin123
```

## Updating Later

After uploading new code:

```bash
cd /var/www/brill-studio
npm run install:all
npm run build
pm2 restart brill-studio
```

## Useful Commands

```bash
pm2 logs brill-studio
pm2 restart brill-studio
pm2 stop brill-studio
systemctl status nginx
nginx -t
```
