const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;

const wordsToSymbols = {
  "plus": "+",
  "minus": "-",
  "times": "*",
  "multiplied by": "*",
  "divided by": "/",
  "into": "*",
  "by": "/"
};

function replaceWords(expr) {
  expr = expr.toLowerCase();
  for (let word in wordsToSymbols) {
    const regex = new RegExp(word, "g");
    expr = expr.replace(regex, wordsToSymbols[word]);
  }
  return expr.replace(/[^\d+\-*/.]/g, ''); 
}

startBtn.onclick = () => {
  output.textContent = "Listening...";
  recognition.start();
};

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  output.textContent = `You said: "${transcript}"`;

  try {
    const expression = replaceWords(transcript);
    const result = eval(expression);
    output.textContent += `\nResult: ${result}`;
  } catch (e) {
    output.textContent += `\nCouldn't calculate the expression.`;
  }
};

recognition.onerror = function(event) {
  output.textContent = "Error: " + event.error;
};
