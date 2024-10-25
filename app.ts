import TelegramBot, { Message } from 'node-telegram-bot-api'
import { OpenAI } from 'openai'
import dotenv from 'dotenv'
import { commands, messages } from './botConfig'

dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true })

bot.setMyCommands(commands)

async function fetchOpenAIResponse(prompt: string): Promise<string> {
	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'system', content: prompt }],
		})
		return response.choices[0]?.message?.content || 'No response found.'
	} catch (error) {
		console.error('OpenAI Error:', error)
		throw new Error(messages.error)
	}
}

bot.onText(/\/start/, (msg: Message) => {
	bot.sendMessage(msg.chat.id, messages.start)
})

bot.onText(/\/receipt/, (msg: Message) => {
	bot.sendMessage(msg.chat.id, messages.receiptPrompt)

	bot.once('message', async (ingredientMsg: Message) => {
		const ingredients = ingredientMsg.text || ''
		bot.sendMessage(msg.chat.id, messages.lookingForRecipe)
		await sendRecipe(msg.chat.id, ingredients)
	})
})

bot.onText(/\/ideas/, (msg: Message) => {
	bot.sendMessage(msg.chat.id, messages.ideasPrompt)

	bot.once('message', async (categoryMsg: Message) => {
		const category = categoryMsg.text || ''
		bot.sendMessage(msg.chat.id, messages.generatingIdeas)
		await sendIdeas(msg.chat.id, category)
	})
})

async function sendRecipe(chatId: number, ingredients: string): Promise<void> {
	const prompt = `Find the best recipe I can cook with the following ingredients: ${ingredients}. Describe it in detail.`
	const response = await fetchOpenAIResponse(prompt)
	bot.sendMessage(chatId, response)
}

async function sendIdeas(chatId: number, category: string): Promise<void> {
	const prompt = `I need ideas for a ${category} recipe. Describe the ingredients and steps.`
	const response = await fetchOpenAIResponse(prompt)
	bot.sendMessage(chatId, response)
}

bot.on('polling_error', console.error)
