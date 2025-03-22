import { GatewayIntentBits, Client, Partials, Message } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}) 

const voicevox_key = (process.env.VOICEVOX_KEY)
const voivevoc_url = ('')

