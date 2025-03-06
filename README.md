# YouTube Discord Bot (Outdated)


## Overview

This is a Discord music bot developed in Fall 2022 using Discord.js v12. It allows users to play YouTube videos and playlists in voice channels, queue songs, and manage playback through commands like `!play` and `!playlist`. The bot utilizes the YouTube Data API and `ytdl-core-discord` for streaming audio.


## ⚠️ Status: No Longer Functional

This bot is currently **outdated and non-functional** due to the following reasons:



This bot is currently **outdated and non-functional** due to the following reasons:

1. **Discord.js v12 Deprecation** – The bot was built using Discord.js v12, which is no longer supported. Discord has made API changes that require upgrading to newer versions of Discord.js (v14+).
2. **YouTube Data API Restrictions** – Changes in YouTube's API policies have affected third-party applications, making direct YouTube streaming more difficult.
3. **ytdl-core-discord Deprecation** – The `ytdl-core-discord` library, used for audio streaming, is no longer actively maintained and has compatibility issues with Discord's latest voice updates.



## How It Worked (Before Becoming Outdated)

When it was functional, the bot could:

- Join a user's voice channel and play YouTube videos or playlists.
- Allow users to queue multiple songs.
- Fetch song and playlist information from YouTube using the YouTube Data API.
- Stream high-quality audio using `ytdl-core-discord`.


### Example Commands:

- `!play <song name or YouTube URL>` – Searches for a song on YouTube and plays it in a voice channel.
- `!playlist <playlist name or YouTube URL>` – Searches for a playlist and adds all videos to the queue.
- `!skip` – Skips the currently playing song and plays the next one in the queue.
- `!stop` – Stops playback and clears the queue.
- `!queue` – Displays the current queue of songs.
- `!volume <1-10>` – Adjusts the playback volume.

## Understanding Discord Bot Tokens

A **Discord bot token** is a unique identifier used to authenticate a bot with Discord’s API.

Tokens were required to initialize and run the bot using:

```js
client.login(/*discord bot token*/); 
```
⚠️ Warning: Discord bot tokens should never be shared or exposed in public repositories. If leaked, anyone could control the bot. If a token is compromised, it should be regenerated in the Discord Developer Portal.



## Future Development

This repository remains available for reference purposes, but active development has stopped. Feel free to fork and update it if you'd like to modernize the bot.

