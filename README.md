# YouTube Discord Bot (Outdated)


## Overview

This is a Discord music bot developed in Fall 2022 using Discord.js v12. It allows users to play YouTube videos and playlists in voice channels, queue songs, and manage playback through commands like `!play` and `!playlist`. The bot utilizes the YouTube Data API and `ytdl-core-discord` for streaming audio.


## ⚠️ Status: No Longer Functional

This bot is currently **outdated and non-functional** due to the following reasons:


1. **Discord.js v12 Deprecation** – The bot was built using Discord.js v12, which is no longer supported. Discord has made API changes that require upgrading to newer versions of Discord.js (v14+).
2. **YouTube Data API Restrictions** – Changes in YouTube's API policies have affected third-party applications, making direct YouTube streaming more difficult.
3. **ytdl-core-discord Deprecation** – The `ytdl-core-discord` library, used for audio streaming, is no longer actively maintaine


## Repository

This repository remains available for reference purposes, but active development has stopped. Feel free to fork and update it if you'd like to modernize the bot.



## How It Worked (Before Becoming Outdated)

When it was functional, the bot could:

- Join a user's voice channel and play YouTube videos or playlists.
- Allow users to queue multiple songs.
- Fetch song and playlist information from YouTube using the YouTube Data API.
- Stream high-quality audio using `ytdl-core-discord`.


### Example Commands:

- `!play <song name or YouTube URL>` – Searches for a song on YouTube and plays it in a voice channel.
- `!playlist <playlist name or YouTube URL>` – Searches for a playlist and adds all videos to the queue.
- Automatically moved to the next song in the queue once the current one finished.


