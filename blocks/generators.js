Blockly.Python['relay_on'] = function (block) {
  const ch = block.getFieldValue('CH');
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch';
  return `relay_4ch.on(${ch})\n`;
};

Blockly.Python['relay_off'] = function (block) {
  const ch = block.getFieldValue('CH');
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch';
  return `relay_4ch.off(${ch})\n`;
};

Blockly.Python['relay_on_all'] = function () {
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch';
  return `relay_4ch.on_all()\n`;
};

Blockly.Python['relay_off_all'] = function () {
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch';
  return `relay_4ch.off_all()\n`;
};
