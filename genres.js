const requests = require('./requests')

async function analyzeGenres(time_range, considerAll, genresLimit) {
    if (genresLimit > 50) considerAll = true;
    var fav_artists = null;
    try {
        fav_artists = await requests.getArtists(time_range, 50);
    }
    catch (e) {
        console.log('Erro ao carregar artisas mais ouvidos');
        console.log(e)
    }

    let all_genres = [];
        for (let i = 0; i < fav_artists.length; i++) {
            for(let j = 0; j < fav_artists[i].genres.length; j++) all_genres.push(fav_artists[i].genres[j]);
        }
        let uniqueGenres = all_genres.filter(function(elem, pos, self) {
            return self.indexOf(elem) == pos;
        });
        let stats = [];
        if (considerAll) {
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

            return stats;
        }
        else {
            uniqueGenres.forEach((genre) => {
                let count = 0;
                for (i = 0; i < all_genres.length; i++) {
                    if (genre == all_genres[i]) count++;
                }
                let genreInfo = {
                    genre: genre,
                    count: count
                }
                stats.push(genreInfo);
            });
            stats.sort((a, b) => (a.count > b.count) ? -1 : 1);
            let totalOccurrences = 0;
            for (let i = 0; i < genresLimit; i++) totalOccurrences += stats[i].count;
            let reductedStats = [];
            for (let i = 0; i < genresLimit; i++) {
                reductedStats.push({
                    genre: stats[i].genre,
                    count: stats[i].count,
                    percentage: parseFloat(stats[i].count*100/totalOccurrences).toFixed(2)
                });
            }

            return reductedStats;
        }
}

analyzeGenres('long_term', false, 5)
.then((res) => {
    res.forEach((genre) => {
        console.log(genre.genre + ': ' + genre.percentage + '%');
    })
});