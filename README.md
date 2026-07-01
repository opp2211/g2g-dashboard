# g2g-dashboard

Дашборд для просмотра офферов G2G с автообновлением.

## Скрипты

- `npm run dev` - локальная разработка.
- `npm run build` - production-сборка в `dist`.
- `npm run preview` - предпросмотр production-сборки.
- `npm run lint` - проверка ESLint.

## Настройка приложения

Источники офферов и интервал обновления задаются в `src/constants/config.js`.

## Деплой

Проект деплоится как статический фронтенд:

1. GitHub Actions устанавливает зависимости, запускает lint и собирает `dist`.
2. Готовая статика загружается на VPS в новый релиз внутри `DEPLOY_PATH/releases`.
3. Symlink `DEPLOY_PATH/current` переключается на новый релиз.
4. Caddy отдаёт `DEPLOY_PATH/current` и сам управляет HTTPS.

Docker для деплоя больше не используется.

### GitHub Secrets

Обязательные secrets:

- `DEPLOY_HOST` - IP или домен VPS.
- `DEPLOY_USER` - пользователь на VPS для SSH-деплоя.
- `DEPLOY_SSH_KEY` - приватный SSH-ключ, публичная часть которого добавлена в `~/.ssh/authorized_keys` на VPS.

Опциональные secrets:

- `DEPLOY_PATH` - директория деплоя на VPS. По умолчанию `/srv/g2g-dashboard`.
- `DEPLOY_SSH_PORT` - SSH-порт. По умолчанию `22`.
- `DEPLOY_KNOWN_HOSTS` - заранее проверенная запись `known_hosts`. Если не задано, workflow выполнит `ssh-keyscan`.

### Подготовка VPS

Пример для пользователя `ubuntu` и пути `/srv/g2g-dashboard`:

```bash
sudo apt update
sudo apt install -y caddy

sudo mkdir -p /srv/g2g-dashboard/releases /srv/g2g-dashboard/empty
sudo ln -sfn /srv/g2g-dashboard/empty /srv/g2g-dashboard/current
sudo chown -R ubuntu:ubuntu /srv/g2g-dashboard
```

Публичный SSH-ключ для GitHub Actions нужно добавить на VPS:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Caddy

Пример конфига лежит в `deploy/Caddyfile.example`.

Перед использованием нужно заменить `example.com` на реальный домен и, если нужно, путь `/srv/g2g-dashboard/current`.
Для текущего деплоя домен: `g2g-dashboard.maltsev.fun`.

После изменения `/etc/caddy/Caddyfile`:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy
```
