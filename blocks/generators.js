// ================================
// Delay Multi Channel - Generator
// MicroPython
// ================================

Blockly.Python['delay_setup_channels'] = function (block) {
  const num = block.getFieldValue('num_channels');
  const pins = Blockly.Python.valueToCode(block, 'pins',
    Blockly.Python.ORDER_ATOMIC) || '[]';

  Blockly.Python.definitions_['import_delay_multi'] =
    'import delay_multi_channel as delay';

  return `delay.init(${num}, ${pins})\n`;
};

Blockly.Python['delay_pin_list'] = function (block) {
  const items = [];
  let i = 0;
  while (block.getInput('ADD' + i)) {
    items.push(
      Blockly.Python.valueToCode(block, 'ADD' + i,
        Blockly.Python.ORDER_ATOMIC) || '0'
    );
    i++;
  }
  return ['[' + items.join(', ') + ']', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['delay_turn_on'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel',
    Blockly.Python.ORDER_ATOMIC) || '1';
  const d = Blockly.Python.valueToCode(block, 'delay',
    Blockly.Python.ORDER_ATOMIC) || '0';
  return `delay.turn_on(${ch}, ${d})\n`;
};

Blockly.Python['delay_turn_off'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel',
    Blockly.Python.ORDER_ATOMIC) || '1';
  return `delay.turn_off(${ch})\n`;
};

Blockly.Python['delay_turn_off_all'] = () =>
  'delay.turn_off_all()\n';

Blockly.Python['delay_is_on'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel',
    Blockly.Python.ORDER_ATOMIC) || '1';
  return [`delay.is_on(${ch})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['delay_time_left'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel',
    Blockly.Python.ORDER_ATOMIC) || '1';
  return [`delay.time_left(${ch})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['delay_update'] = () =>
  'delay.update()\n';
