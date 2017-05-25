
class TextStory {
    constructor(text) {
        this.text = text;
        this.time = Math.ceil(text.length / 10);
    }
}

class Monster {
    constructor(name, health, pic) {
        this.name = name;
        this.health = health;
        this.pic = pic;
    }
}

let images = {
    redsquare : require('../img/redsquare.png'),
    morden : require('../img/morden.png')
};

let monsters = [
    new Monster("Red square", 10, images.redsquare),
    new Monster("Morden", 30, images.morden),
];

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