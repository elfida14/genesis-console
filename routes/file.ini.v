{
  "master_key": "Genesis313",
  "guardian_key": "Genesis313",
  "activation_phrase": "Genesis313",
  "access_log": [],
  "hidden_paths": [
    "/shadow",
    "/modulo15-coreIgnis",
    "/modulo17-occhiodombra",
    "/genesis"
  ],
  "sensitive_commands": [
    "resurrect",
    "decryptAll",
    "rebootGenesis",
    "phaseShift"
  ],
  "crypto": {
    "enabled": true,
    "method": "SHA-512+AES",
    "backup_key": "Genesis313",
    "timestamp": true
  },
  "vision_core": {
    "enabled": true,
    "console_mode": "interactive",
    "sensors": ["meta_input", "logic_gate", "vibe_field"],
    "language_model": "O4-mini-simulato"
  },
  "debug_mode": false,
  "invocation_mode": "semi-auto",
  "protection_layer": {
    "firewall": true,
    "fallback_ai": "shadow_guardian",
    "self_repair": true
  }
}
