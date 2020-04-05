const requests = require('./requests')
const genres = require('./genres')
const fh = require('./filesHandler')

module.exports = {
    
    async getStats(token) {
        let userStats = 'Hello, '
        const userData = await requests.getUserInfo(token);
        userStats += userData.display_name+'\n\nYour Top Five Genres:\n\n';
        
        const genreData = await genres.analyzeGenres('long_term', false, 5, token);
        let count = 0;
        genreData.forEach((genre) => {
            count++;
            userStats += count + ' - ' + fh.formatGenreName(genre.genre) + ': ' + genre.percentage + '%\n';
        });

        userStats += '\n\nTop Artists - Short Term (weeks):\n\n';
        const artists_ST = await requests.getArtists('short_term', 50, token);
        artists_ST.forEach((artist) => {
            userStats += artist.position + ' - ' + artist.name + '\t(' + artist.genres[0] + ')\n';
        });

        userStats += '\n\nTop Artists - Medium Term (months):\n\n';
        const artists_MT = await requests.getArtists('medium_term', 50, token);
        artists_MT.forEach((artist) => {
            userStats += artist.position + ' - ' + artist.name + '\t(' + artist.genres[0] + ')\n';
        });

        userStats += '\n\nTop Artists - Long Term (years):\n\n';
        const artists_LT = await requests.getArtists('long_term', 50, token);
        artists_LT.forEach((artist) => {
            userStats += artist.position + ' - ' + artist.name + '\t(' + artist.genres[0] + ')\n';
        });
        
        userStats += '\n\nTop Tracks - Short Term (weeks):\n\n';
        const tracks_ST = await requests.getTracks('short_term', 50, token);
        tracks_ST.forEach((track) => {
            userStats += track.position + ' - ' + track.name + ', ' + track.artist + '\n';
        });
        
        userStats += '\n\nTop Tracks - Medium Term (months):\n\n';
        const tracks_MT = await requests.getTracks('medium_term', 50, token);
        tracks_MT.forEach((track) => {
            userStats += track.position + ' - ' + track.name + ', ' + track.artist + '\n';
        });

        userStats += '\n\nTop Tracks - Long Term (years):\n\n';
        const tracks_LT = await requests.getTracks('long_term', 50, token);
        tracks_LT.forEach((track) => {
            userStats += track.position + ' - ' + track.name + ', ' + track.artist + '\n';
        });
        userStats += '\n\nDeveloped by Érick Oliveira, Cripto S.A';

        return userStats;
    }
}