const stateTranslations = [
    { from: 'CALIF', to: 'CA' },
    { from: 'FLA', to: 'FL' },
    { from: 'COLO', to: 'CO' },
    { from: 'CONN', to: 'CT' },
    { from: 'ILL', to: 'IL' },
    { from: 'ORE', to: 'OR' },
    { from: 'OHIO', to: 'OH' },
    { from: 'MICH', to: 'MI' },
    { from: 'TEXAS', to: 'TX' },
    { from: 'MASS', to: 'MA' },
    { from: 'IND', to: 'IN' },
    { from: 'OKLA', to: 'OK' },
    { from: 'WASH', to: 'WA' },
    { from: 'UTAH', to: 'UT' },
    { from: 'ARIZ', to: 'AZ' },
    { from: 'MINN', to: 'MN' },
    { from: 'KAN', to: 'KS'},
    { from: 'NEB', to: 'NE' }
]

class ClubExtractor {
    constructor() {}

    getName(data, index) {
        return data[1][index];
    }

    getLocation(data, index) {
        return data[2][index];
    }

    getCity(data, index) {
        const location = this.getLocation(data, index);
        const tokens = location.split(',');
        const city = tokens[0].trim();

        return city;
    }

    translateState(value) {
        // Trim the incoming string.
        value = value.trim();

        // Remove all occurrences of '.'.
        value = value.replace(/\./g, '');

        value = value.toUpperCase();

        for (let i = 0 ; i < stateTranslations.length ; i++) {
            let currentTranslation = stateTranslations[i];

            if (value === currentTranslation.from) {
                return currentTranslation.to;
            }
        }

        return value;
    }

    getState(data, index) {
        const location = this.getLocation(data, index);
        const tokens = location.split(',');
        const state = this.translateState(tokens[1].trim());

        return state;
    }

    getAgeGroupsText(data, index) {
        return data[3][index];
    }

    getPrefixedAgeGroup(data, index, prefix) {
        const ageGroups = this.getAgeGroupsText(data, index);
        const lines = ageGroups.split('\n');

        let values = [];

        for (let i = 0 ; i < lines.length ; i++) {
            let line = lines[i].trim();

            if (line.startsWith(prefix)) {
                line = line.substr(prefix.length).trim();

                let tokens = line.split(',');
                for (let j = 0 ; j < tokens.length ; j++) {
                    values.push(tokens[j].trim());
                }
            }
        }

        return values;
    }

    getBoys(data, index) {
        return this.getPrefixedAgeGroup(data, index, 'Boys');
    }

    getGirls(data, index) {
        return this.getPrefixedAgeGroup(data, index, 'Girls');
    }

    getClub(data, index) {
        return {
            name: this.getName(data, index),
            city: this.getCity(data, index),
            state: this.getState(data, index),
            boys: this.getBoys(data, index),
            girls: this.getGirls(data, index)
        }
    }
}

module.exports = {
    ClubExtractor: new ClubExtractor()
}
