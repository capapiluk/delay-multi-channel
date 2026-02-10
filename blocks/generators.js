Blockly.Python['relay_on'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'CH', Blockly.Python.ORDER_ATOMIC);
  const delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch_delay';
  return `relay_4ch_delay.on(${ch}, ${delay})\n`;
};

Blockly.Python['relay_off'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'CH', Blockly.Python.ORDER_ATOMIC);
  const delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch_delay';
  return `relay_4ch_delay.off(${ch}, ${delay})\n`;
};

Blockly.Python['relay_off_all'] = function () {
  Blockly.Python.definitions_['import_relay'] = 'import relay_4ch_delay';
  return `relay_4ch_delay.off_all()\n`;
};
