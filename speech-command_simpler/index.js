let recognizer;

function predictWord() {
    const words = recognizer.wordLabels();
    const threshold = 0.9;

    recognizer.listen(({scores}) => {
        scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
        scores.sort((s1, s2) => s2.score - s1.score);
        console.log("SPEECH RECOGNIZED :: " + scores[0].word);
    }, {probabilityThreshold: threshold});
}

async function app() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    predictWord();
}

app();
