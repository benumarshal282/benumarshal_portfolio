#!/bin/zsh
# Double-click this file to run the site on your Mac.
# It installs anything missing, starts the site, and opens it in your browser.
cd "$(dirname "$0")" || exit 1

# make sure node/npm can be found, however they were installed
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.volta/bin:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh"
command -v fnm >/dev/null 2>&1 && eval "$(fnm env)"

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js was not found. Install it from https://nodejs.org and double-click this file again."
  read -r "?Press Enter to close."
  exit 1
fi

echo "Installing anything missing (first run takes a minute)..."
npm install || { echo "npm install failed - see the error above."; read -r "?Press Enter to close."; exit 1; }

echo ""
echo "Starting the site at http://localhost:5199  (keep this window open; Ctrl+C stops it)"
npm run dev -- --port 5199 --strictPort --open
read -r "?The site stopped. Press Enter to close."
