
# Telegram Cooking Bot

A Telegram bot that helps you find recipes based on the ingredients you have or gives recipe ideas by category, using OpenAI's API. 

## Features

- **/start**: Starts the bot and introduces its purpose.
- **/receipt**: Generates a recipe based on ingredients you provide.
- **/ideas**: Suggests recipe ideas based on a specific category (e.g., dessert, main course).
- **/help**: Shows available commands for easy interaction.

## Setup

### Prerequisites

- **Node.js** (version 16 or higher)
- **Telegram Bot API token** from [BotFather](https://core.telegram.org/bots#botfather)
- **OpenAI API key** from [OpenAI](https://platform.openai.com/)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/telegram-cooking-bot.git
    cd telegram-cooking-bot
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the project root with the following content:
    ```plaintext
    TELEGRAM_TOKEN=your_telegram_bot_token
    OPENAI_API_KEY=your_openai_api_key
    ```

4. **Run the bot**:
    ```bash
    npm start
    ```

## Usage

1. **Start a chat with your bot on Telegram**.
2. **Type `/start`** to begin.
3. **Use the following commands**:
   - **/receipt**: Enter a list of ingredients, and the bot will find a recipe based on them.
   - **/ideas**: Choose a recipe category, and the bot will suggest ideas.
   - **/help**: Get a list of all available commands.
