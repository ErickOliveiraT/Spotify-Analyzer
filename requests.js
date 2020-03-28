const axios = require('axios');
const cred = require('./credentials')

module.exports = {

    async getArtists(time_range, limit) {
        return new Promise((resolve, reject) => {
            var artists = [];
            var position = 0;
            axios({
                method: 'get',
                url: `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=${limit}`,
                headers: {'Authorization': cred.token},
                responseType: 'application/json'
            })
            .then(function (response) {
                const data = response.data.items;
                for (let i = 0; i < data.length; i++) {
                    position++;
                    let artist = {
                        position: position,
                        name: data[i].name,
                        genres: data[i].genres,
                        followers: data[i].followers.total,
                        image_url: data[i].images[0].url,
                        url: data[i].external_urls.spotify
                    }
                    artists.push(artist);
                }
                resolve(artists);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    
    async getTracks(time_range, limit) {
        return new Promise((resolve, reject) => {
            var tracks = [];
            var position = 0;
            axios({
                method: 'get',
                url: `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}`,
                headers: {'Authorization': cred.token},
                responseType: 'application/json'
            })
            .then(function (response) {
                const data = response.data.items;
                for (let i = 0; i < data.length; i++) {
                    position++;
                    let track = {
                        position: position,
                        name: data[i].name,
                        artist: data[i].artists[0].name,
                        image_url: data[i].album.images[0].url,
                        url: data[i].external_urls.spotify
                    }
                    tracks.push(track);
                }
                resolve(tracks);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    
    async getUserInfo() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: 'https://api.spotify.com/v1/me',
                headers: {'Authorization': cred.token},
                responseType: 'application/json'
            })
            .then(function (response) {
                const data = response.data;
                let info = {
                    display_name: data.display_name,
                    name: data.display_name.split(' ')[0],
                    profile_url: data.external_urls.spotify,
                    followers: data.followers.total,
                    image_url: data.images[0].url,
                }
                resolve(info);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}

/* getArtists('short_term', 1)
//getTracks('long_term', 1)
//getUserInfo()
.then((res) => {console.log(res)})
.catch((err) => {console.log(err)}); // err.response.statusText */