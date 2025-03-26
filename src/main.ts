import { GatewayIntentBits, Client, Partials, Message,SlashCommandBuilder } from 'discord.js'
import { entersState } from '@discordjs/voice'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
}) 

const voicevox_key = (process.env.VOICEVOX_KEY)
const voivevoc_url = ('')
const prefix = '!'
let channelId: string|null = null
let channelName: string|undefined

client.on('ready', (message) => {
    console.log('discord bot is ready!')
    setInterval(() => {
        client.user?.setActivity({name: `ping${client.ws.ping}ms`,
         })   
    }, 1000)
}) 

client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    if (message.channel.id == channelId && message.content.length >= 1 ){

    }

    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(/\s+g/)
    try{
        if (command === 'start'){
            channelId = message.channel.id
            message.channel.send('読み上げを開始するよ')
        }else if (command === 'end'){
            channelId = null
            channelName = message.member?.voice.channel?.name
            message.channel.send(channelName+'から切断されました')
        }else if (command === 'help'){
            console.log('')
        }else if (command === 'shutdown'){
            if (!message.member?.permissions.has('Administrator')){
                message.channel.send ('permisson denied.')
                return
            }
            await client.destroy            
        }
    }catch(e){
        if (e instanceof Error){
            console.log(e.message)
        }
    }
})
client.login(process.env.DISCORD_BOT_TOKEN)
