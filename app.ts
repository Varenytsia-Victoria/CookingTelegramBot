import TelegramBot, { Message } from 'node-telegram-bot-api'
import { OpenAI } from 'openai'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
})

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true })

bot.onText(/\/start/, (msg: Message) => {
	const chatId = msg.chat.id
	bot.sendMessage(
		chatId,
		'Hello! I will help you find recipes with AI help. Write down the ingredients you have.'
	)
})

bot.onText(/\/receipt/, (msg: Message) => {
	const chatId = msg.chat.id
	bot.sendMessage(chatId, 'Please, write your list of ingredients.')

	bot.once('message', async (ingredientMsg: Message) => {
		const ingredients = ingredientMsg.text || ''
		bot.sendMessage(chatId, 'Bot is looking for a recipe...')
		await getRecipe(chatId, ingredients)
	})
})

async function getRecipe(chatId: number, ingredients: string): Promise<void> {
	try {
		const prompt = `Find the best recipe I can cook with the following ingredients: ${ingredients}. Describe it in detail.`

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'system', content: prompt }],
		})

		const recipe = response.choices[0]?.message?.content || 'Recipe not found'
		bot.sendMessage(chatId, recipe)
	} catch (error: any) {
		console.error(error)
		bot.sendMessage(chatId, 'Error: ' + error.message)
	}
}

bot.on('polling_error', console.error)
