export const commands = [
	{ command: '/start', description: 'Start!' },
	{ command: '/receipt', description: 'Get receipt by ingredients' },
	{ command: '/ideas', description: 'Get receipt ideas' },
	{ command: '/help', description: 'Show available commands' },
]

export const messages = {
	start:
		'Hello! I will help you find recipes with AI help. Write down the ingredients you have.',
	receiptPrompt: 'Please, write your list of ingredients.',
	lookingForRecipe: 'Bot is looking for a recipe...',
	ideasPrompt: 'Please, choose category of receipt',
	generatingIdeas: 'Bot is generating ideas...',
	error: 'An error occurred. Please try again later.',
}
