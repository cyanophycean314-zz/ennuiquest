
import { gaussian } from '../lib/helpers';

class TextStory {
    constructor(text) {
        this.text = text;
        this.time = text.length / 10;
    }
}

class Monster {
    constructor(name, health, pic, drop) {
        this.name = name;
        this.health = health;
        this.pic = pic;
        this.drop = drop;
    }
}

let images = {
    redsquare : require('../img/redsquare.png'),
    morden : require('../img/morden.png')
};

let getRedSquare = () => new Monster("Red square", gaussian(15,5)(), images.redsquare, "red square");
let getMorden = () => new Monster("Morden", gaussian(20,5)(), images.morden, "morden blood");

let monsters = [], N = 5;
for (let i = 0; i < N; i++) {
    if (Math.random() < 0.3) {
        monsters.push(getRedSquare());
    } else {
        monsters.push(getMorden());
    }
}

export function makeStory(charInfo) {
    const prologue = [
        "It was a dark and stormy night",
        "the kingdom was in danger",
        "only one hero could save them",
        "that was you",
        `${charInfo.character.name}`
    ];
    for (let i in monsters) {
        monsters[i].time = monsters[i].health / charInfo.ptraits.strength;
    }
    let story = prologue.map((text) => new TextStory(text))
    return [monsters, story];
}