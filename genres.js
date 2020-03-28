const requests = require('./requests')

async function analyzeGenres(time_range) {
    try {
        let fav_artists = await requests.getArtists(time_range, 50);
        let all_genres = [];
        for (let i = 0; i < fav_artists.length; i++) {
            for(let j = 0; j < fav_artists[i].genres.length; j++) all_genres.push(fav_artists[i].genres[j]);
        }
        let uniqueGenres = all_genres.filter(function(elem, pos, self) {
            return self.indexOf(elem) == pos;
        });
        let stats = [];
        uniqueGenres.forEach((genre) => {
            let count = 0;
            for (i = 0; i < all_genres.length; i++) {
                if (genre == all_genres[i]) count++;
            }
            let genreInfo = {
                genre: genre,
                count: count,
                percentage: parseFloat(count*100/all_genres.length).toFixed(2)
            }
            stats.push(genreInfo);
        });
        stats.sort((a, b) => (a.count > b.count) ? -1 : 1);
        //let bestFive = [];
        //for (let i = stats.length-1; i > stats.length-6; i--) bestFive.push(stats[i]);
        return stats;
        //return bestFive;
    }
    catch (e) {
        console.log('Erro ao carregar artisas mais ouvidos');
        console.log(e)
    }
}

analyzeGenres('long_term')
.then((res) => {
    res.forEach((genre) => {
        console.log(genre.genre + ': ' + genre.percentage + '%');
    })
});