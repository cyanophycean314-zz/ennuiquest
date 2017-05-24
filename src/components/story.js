
class TextStory {
    constructor(text) {
        this.text = text;
        this.time = Math.ceil(text.length / 10);
    }
}

export function makeStory(charInfo) {
    const prologue = [
        "It was a dark and stormy night,",
        "the kingdom was in danger",
        "only one hero could save them",
        "that was you",
        `${charInfo.name}`
    ];
    return prologue.map((text) => new TextStory(text));
}