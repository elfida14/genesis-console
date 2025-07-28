const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();

function listenCommand() {
  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'it-IT',
    },
    interimResults: false,
  };

  const recognizeStream = client
    .streamingRecognize(request)
    .on('data', (data) => {
      const transcript = data.results[0].alternatives[0].transcript;
      if (transcript.includes("Genesis attiva difesa")) {
        console.log("🛡️ Difesa attivata.");
      } else if (transcript.includes("Genesis spegni tutto")) {
        console.log("🕯️ Sistema in ibernazione.");
      }
    });

  record
    .start({ sampleRateHertz: 16000, threshold: 0 })
    .pipe(recognizeStream);
}

listenCommand();
