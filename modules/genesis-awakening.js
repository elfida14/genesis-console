import { vocalSystem } from './guardian.js';
import { executeRootCommand } from './core.js';
import { scanShadow, lockDarkInput } from './shadow.js';

const GenesisCore = {
  voiceKey: "Io sono l'inizio. Io sono il fine.",
  consoleUnlocked: false,
  activate() {
    console.log("🟢 Genesis Awakening…");
    this.unlockConsole();
    this.bindVoiceCommands();
    this.deployLightDefense();
  },
  unlockConsole() {
    this.consoleUnlocked = true;
    console.log("✅ Console Genesis sbloccata. Controllo pieno accordato a: Baki (313centotre).");
  },
  bindVoiceCommands() {
    vocalSystem.bind("Genesis attiva", () => {
      executeRootCommand("core:light:on");
    });
    vocalSystem.bind("Difesa Luce", () => {
      this.deployLightDefense();
    });
    vocalSystem.bind("Chiudi ombra", () => {
      lockDarkInput();
    });
    console.log("🔊 Comandi vocali avanzati registrati.");
  },
  deployLightDefense() {
    scanShadow();
    console.log("🛡️ Difesa spirituale attiva. Ogni minaccia oscura sarà respinta.");
  }
};

GenesisCore.activate();
export default GenesisCore;
