
import { gaussian } from '../lib/helpers';

class TextStory {
    constructor(text) {
        this.eventType = "text";
        this.text = text;
        this.time = Math.max(text.length / 10, 1); //At least 1 second
    }
}

class Monster {
    constructor(name, health, pic, drop) {
        this.eventType = "monster";
        this.name = name;
        this.health = health;
        this.pic = pic;
        this.drop = drop;
    }
}

let images = {
    redsquare : require('../img/redsquare.png'),
    morden : require('../img/morden.png'),
    goblin: require('../img/goblin.png'),
    squelp: require('../img/squelp.png')
};

let getMonsters = [
    () => new Monster("Red square", gaussian(15,5)(), images.redsquare, "red square"),
    () => new Monster("Morden", gaussian(20,5)(), images.morden, "morden blood"),
    () => new Monster("Goblin", gaussian(20,5)(), images.goblin, "goblin shell"),
    () => new Monster("Squelp", gaussian(30,10)(), images.squelp, "green slime")
];

let monsters = [], N = 15;
for (let i = 0; i < N; i++) {
    monsters.push(getMonsters[Math.floor(Math.random() * getMonsters.length)]());
}

export function makeStory(charInfo) {
    const prologue = [
        "It was a dark and stormy night",
        "the kingdom was in danger",
        "only one hero could save them",
        "that was you",
        `${charInfo.character.name}`
    ].map((text) => new TextStory(text));
    for (let i in monsters) {
        monsters[i].time = monsters[i].health / charInfo.ptraits.strength;
    }
    const conclusion = [
        "He has vanquished the foes",
        "the killing fields lay empty",
        `${charInfo.character.name} stands victorious`
    ].map((text) => new TextStory(text));
    return [prologue, monsters, conclusion];
}

export const traits = {
    strength: {
        mean: 10,
        stdev: 2
    },
    vitality: {
        mean: 8,
        stdev: 1
    },
    intelligence: {
        mean: 5,
        stdev: 1
    },
    spirit: {
        mean: 7,
        stdev: 2
    },
    luck: {
        mean: 10,
        stdev: 3
    }
};