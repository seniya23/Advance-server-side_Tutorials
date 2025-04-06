class Celebrity {
    constructor() {
        this.celebrities = [
            { name: 'Emma Stone', age: 32, image: 'https://via.placeholder.com/150', topFilms: ['La La Land', 'Easy A', 'The Help'] },
            { name: 'Brad Pitt', age: 57, image: 'https://via.placeholder.com/150', topFilms: ['Fight Club', 'Seven', 'Once Upon a Time in Hollywood'] },
            { name: 'Tom Cruise', age: 58, image: 'https://via.placeholder.com/150', topFilms: ['Mission: Impossible', 'Top Gun', 'Jerry Maguire'] }
        ];
    }

    getAllCelebrities() {
        return this.celebrities.map(celebrity => celebrity.name);
    }

    getCelebrityByName(name) {
        return this.celebrities.find(celebrity => celebrity.name.toLowerCase() === name.toLowerCase());
    }
}

module.exports = new Celebrity();