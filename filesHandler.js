const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = {
  
    async writeStats(data, format) {
        if (format == 'pt-br') {
            data.forEach(element => {
                element.percentage = parseFloat(element.percentage.toString().replace('.',','));
            });
        }
        csvWriter = createCsvWriter({
            path: 'stats.csv',
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