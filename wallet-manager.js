// walletManager.js

const bitcoin = require("bitcoinjs-lib");
const ECPairFactory = require("ecpair").ECPairFactory;
const tinysecp = require("tiny-secp256k1");
const axios = require("axios");

const ECPair = ECPairFactory(tinysecp);
const NETWORK = bitcoin.networks.bitcoin; // Mainnet
const API_BASE = "https://blockstream.info/api";

// === CHIAVE PRIVATA DIRETTA ===
const WIF = process.env.PRIVATE_KEY_WIF;
if (!WIF) throw new Error("❌ Variabile PRIVATE_KEY_WIF non trovata!");

const keyPair = ECPair.fromWIF(WIF, NETWORK);
const { address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network: NETWORK
});

// === FUNZIONI ===

async function getBalance(addr = address) {
  const res = await axios.get(`${API_BASE}/address/${addr}`);
  const funded = res.data.chain_stats.funded_txo_sum;
  const spent = res.data.chain_stats.spent_txo_sum;
  const balance = (funded - spent) / 1e8;
  return { address: addr, balance };
}

async function sendBTC(destAddress, amountBTC) {
  const utxosRes = await axios.get(`${API_BASE}/address/${address}/utxo`);
  const utxos = utxosRes.data;

  const psbt = new bitcoin.Psbt({ network: NETWORK });
  let inputSum = 0;
  const fee = 500;

  for (const utxo of utxos) {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script: Buffer.from(utxo.scriptpubkey, 'hex'),
        value: utxo.value
      }
    });
    inputSum += utxo.value;
    if (inputSum > amountBTC * 1e8 + fee) break;
  }

  const sendValue = Math.floor(amountBTC * 1e8);
  const change = inputSum - sendValue - fee;

  psbt.addOutput({ address: destAddress, value: sendValue });
  if (change > 0) {
    psbt.addOutput({ address, value: change });
  }

  psbt.signAllInputs(keyPair);
  psbt.finalizeAllInputs();

  const raw = psbt.extractTransaction().toHex();
  const sendTx = await axios.post(`${API_BASE}/tx`, raw);
  return sendTx.data;
}

module.exports = {
  getBalance,
  sendBTC,
  address,
};
