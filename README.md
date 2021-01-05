## MGPlayz' Bot
* A discord.js bot made by MGPlayzYT. Features a meme command, voice commands, and more!

## Contributors
* Thanks to the following people who made this project possible!
   * [Nick Chan](https://github.com/asdfugil/)
   * RandomPerson3465
 
## Releases
* [Latest] v1.0.0

## Hosting
* Requirements:
  * Node v14 (required for voice support and optional chaining support)
  * pnpm version 5 (most-efficient) [or npm version 6 if you want]
  * git
  * nano
  * Atleast 100MB of free memory
  * Atleast 500MB of free disk space
  
* Step 1: Clone the repository
```
git clone https://github.com/MGPlayzYT/mgplayz-bot <custom folder name>
```
* Step 2: 
```
cd <your-custom-folder-name>
```
* Step 3:
```
mv .env.example .env
mv config.js.example config.js
```
* Step 4: Change the contents of your .env file
```
BOT_TOKEN=<put your bot token here>
```
* Step 5: Start the installation process
   - pnpm:
   ```
   pnpm install package.json
   ```
   - npm:
   ```
   npm install package.json
   ```
* Step 6: windows-build-tools
Some packages require a package called `windows-build-tools` to work properly. Without this, some packages might not install correctly or will outright fail. To install this package, open an administrative command prompt or powershell window and type `npm i -g windows-build-tools` and it should install. 
* Step 7: Start the bot
```
node index.js
```
and you're done!

## License
This project uses the [AGPL 3 License](https://raw.githubusercontent.com/MGPlayzYT/mgplayz-bot/main/LICENSE).
