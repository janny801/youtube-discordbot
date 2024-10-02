//outdated 

const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const { YTSearcher } = require('ytsearcher');
const { Readable } = require('stream');

const client = new Discord.Client();
const searcher = new YTSearcher(/*youtube api key*/);

const queue = new Map();
const playing = new Map();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => { // Marking the listener function as async
  if (!message.guild) return;

  if (message.content.startsWith('!play ')) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('you need to be in a voice channel to play music!');
    }

    const serverQueue = queue.get(message.guild.id);
    const song = await getSong(message.content.replace('!play ', '')); // using await here

    const queueSong = {
      title: song.title,
      url: song.url,
      user: message.author.tag,
    };

    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };
      queueConstruct.songs.push(queueSong);
      queue.set(message.guild.id, queueConstruct);

      try {
        const connection = await voiceChannel.join(); // await here, so function must be async
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Error joining voice channel: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Error joining voice channel: ${error}`);
      }
    } else {
      serverQueue.songs.push(queueSong);
      return message.channel.send(`**${queueSong.title}** has been added to the queue by ${message.author.tag}`);
    }
  } else if (message.content.startsWith('!playlist ')) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('you need to be in a voice channel to play music!');
    }

    const serverQueue = queue.get(message.guild.id);
    const playlist = await getPlaylist(message.content.replace('!playlist ', '')); // await here

    playlist.videos.forEach(video => {
      const queueSong = {
        title: video.title,
        url: video.url,
        user: message.author.tag,
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };
        queueConstruct.songs.push(queueSong);
        queue.set(message.guild.id, queueConstruct);

        try {
          const connection = await voiceChannel.join(); // await here
          queueConstruct.connection = connection;
          play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`Error joining voice channel: ${error}`);
          queue.delete(message.guild.id);
          return message.channel.send(`Error joining voice channel: ${error}`);
        }
      } else {
        serverQueue.songs.push(queueSong);
      }
    });

    if (!serverQueue.playing) {
      serverQueue.playing = true;
      try {
        const connection = await voiceChannel.join(); // await here
        serverQueue.connection = connection;
        play(message.guild, serverQueue.songs[0]);
      } catch (error) {
        console.error(`Error joining voice channel: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Error joining voice channel: ${error}`);
      }
    }
  }
});

// Function to search for a song using YTSearcher
async function getSong(query) {
  try {
    const result = await searcher.search(query, { type: 'video' });
    if (result.first) {
      return {
        title: result.first.title,
        url: result.first.url
      };
    }
    throw new Error('No video found');
  } catch (error) {
    console.error(error);
    return message.reply('Error finding the song.');
  }
}

// Function to search for a playlist using YTSearcher
async function getPlaylist(query) {
  try {
    const result = await searcher.search(query, { type: 'playlist' });
    if (result.first) {
      const playlistInfo = await ytdl.getInfo(result.first.url);
      return {
        title: result.first.title,
        url: result.first.url,
        videos: playlistInfo.videoDetails.related_videos.map(video => ({
          title: video.title,
          url: `https://www.youtube.com/watch?v=${video.id}`
        }))
      };
    }
    throw new Error('No playlist found');
  } catch (error) {
    console.error(error);
    return message.reply('Error finding the playlist.');
  }
}

// Mark play function as async since it uses await
async function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(await ytdl(song.url, { filter: 'audioonly', highWaterMark: 1<<25 }), { type: 'opus' }) // await here
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Now playing: **${song.title}**`);
}

client.login(/*discord bot token*/);
