const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN) 

bot.start((ctx) => {ctx.reply(`Привіт ${ ctx.message.from.first_name ?? ctx.message.from.last_name ?? ctx.message.from.username ?? 'Хто ти?' }`)})
bot.help((ctx) => ctx.reply(text.commands))

bot.command('Shop', async(ctx) => {
try{
    await ctx.replyWithHTML('<b>Оберіть питання</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Пересорт товару', 'btn_1')], 
            [Markup.button.callback('Проблеми з клієнтами, знижками, реалізаціями...', 'btn_2')], 
            [Markup.button.callback('FAQ', 'btn_3')]   
        ]
        ))
} catch(e) {
    console.error(e)
}
}
)
function addActionBot(name, src, text) {
    bot.action(name, async(ctx) => {
        try{await ctx.answerCbQuery()
            if (src !== false){
                await ctx.replyWithPhoto({
                    source : src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview : true
            })
    
        }catch(e) {
        console.error(e)
        }
    })
}
addActionBot('btn_1', './img/2.jpg', text.text1)
addActionBot('btn_2', './img/3.jpg', text.text2)
addActionBot('btn_3', false, text.text3)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))