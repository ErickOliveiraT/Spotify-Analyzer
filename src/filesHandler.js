const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = {

    formatGenreName(genre) {
        let words = genre.split(' ');
        let name = new String;
        if (words.length == 1) {
            name = genre.charAt(0).toUpperCase();
            for (let i = 1; i < genre.length; i++) name += genre.charAt(i);
        }
        else {
            words.forEach((word, index) => {
                let _name = word.charAt(0).toUpperCase();
                for (let i = 1; i < word.length; i++) _name += word.charAt(i);
                name += _name; 
                if (index < words.length-1) name += ' ';
            });
        }
        return name;
    },
  
    async writeStats(data, format) {
        if (format == 'pt-br') {
            data.forEach(element => {
                element.percentage = element.percentage.toString().replace('.',',');
            });
        }
        data.forEach((element) => {element.genre = this.formatGenreName(element.genre)})
        csvWriter = createCsvWriter({
            path: 'stats.csv',
            fieldDelimiter: ';',
            header: [
                {id: 'genre', title: 'GENRE'},
                {id: 'count', title: 'COUNT'},
                {id: 'percentage', title: 'PERCENTAGE'}
            ]
        });
        try {
            await csvWriter.writeRecords(data);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
};