let recognizer;

function predictWord() {
    const words = recognizer.wordLabels();
    const threshold = 0.9;
    
    // particular wordlist variables
    var global_recognizer = '';
    var score = -1;
    var yes_score = -1;
    var go_score = -1;
    var time = Date.now();
    var time_th = 1500;
    
    
    recognizer.listen(({scores}) => {
        scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
        
        // for particular wordlist :: ['yes', 'go']
        yes_score = scores[18].score;
        go_score = scores[6].score;
        
        if (go_score > yes_score && go_score > threshold && time + time_th < Date.now())
        {
            time = Date.now();
            global_recognizer = scores[6].word;
            score = go_score;
            console.log("SPEECH RECOGNIZED :: " + global_recognizer);
        }
        else if (go_score < yes_score && yes_score > threshold && time + time_th < Date.now())
        {
            time = Date.now();
            global_recognizer = scores[18].word;
            score = yes_score;
            console.log("SPEECH RECOGNIZED :: " + global_recognizer);
        }

    }, {probabilityThreshold: threshold});
}

async function app() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    predictWord();
}

app();
