import { GatewayIntentBits, Client, Partials, Message,SlashCommandBuilder, applicationDirectory } from 'discord.js'
import { entersState } from '@discordjs/voice'
import dotenv from 'dotenv'
import axios from 'axios'

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
const voicevox_url = 'https://deprecatedapis.tts.quest/v2/voicevox/audio/'
const voicevox_usage = 'https://deprecatedapis.tts.quest/v2/voicevox/api/'
const prefix = '!'
let channelId: string|null = null
let channelName: string|undefined

async function getusage(apiUrl: string, apiKey: string|undefined): Promise<string> {
    try{
    const params = new URLSearchParams()
    params.append('key', apiKey ?? '')
    const response = await fetch (apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
    },
    body: params.toString(),
})

if (!response.ok) {
    throw new Error(`API request failed`)
}

const data = await response.json()

return data.usage
    }catch (error){
        console.error('faild to fetch api usage:', error)
        throw error
    }
}


async function getvoice() {
    try {
        const response = await axios.post(voicevox_url, {
            text: Text,
            key: voicevox_key
        })
    } catch (error){
        console.log('error')
    }
}

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
	        const channel = message.member?.voice.channel
            if(!channel) return message.reply ('VCに未参加です')
            message.channel.send('読み上げを開始するよ')
            
        }else if (command === 'end'){
            channelId = null
            channelName = message.member?.voice.channel?.name
            message.channel.send(channelName+'から切断されました')
        }else if (command === 'help'){
            message.channel.send('ggrks')
        }else if (command === 'shutdown'){
            if (!message.member?.permissions.has('Administrator')){
                message.channel.send ('permisson denied. you are not administrator.')
                return
            }
            await client.destroy()

        }else if (command === 'usage'){
            getusage(voicevox_usage, voicevox_key)
            .then(usage => {
                message.channel.send(`usage:${usage}`)
            })
            .catch(err => {
                message.channel.send(err)
            })
        }
    }catch(e){
        if (e instanceof Error){
            console.log(e.message)
        }
    }
})
client.login(process.env.DISCORD_BOT_TOKEN)
