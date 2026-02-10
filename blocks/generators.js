// ========================================
// Delay Multi Channel Extension - Generators
// MicroPython
// ========================================

// setup
Blockly.Python['delay_setup_channels'] = function (block) {
  const num = block.getFieldValue('num_channels');
  const pins =
    Blockly.Python.valueToCode(block, 'pins',
      Blockly.Python.ORDER_ATOMIC) || '[]';

  Blockly.Python.definitions_['import_delay_multi'] =
    'import delay_multi_channel as delay';

  return `delay.init(${num}, ${pins})\n`;
};

// ----------------------------------------
// pin list
// ----------------------------------------
Blockly.Python['delay_pin_list'] = function (block) {
  const items = [];
  let i = 0;
  while (block.getInput('ADD' + i)) {
    const v =
      Blockly.Python.valueToCode(block, 'ADD' + i,
        Blockly.Python.ORDER_ATOMIC) || '0';
    items.push(v);
    i++;
  }
  return ['[' + items.join(', ') + ']', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['delay_pin_list_container'] = function () {
  return '';
};

Blockly.Python['delay_pin_list_item'] = function () {
  return '';
};

// ----------------------------------------
// turn on channel
// ----------------------------------------
Blockly.Python['delay_turn_on'] = function (block) {
  const ch =
    Blockly.Python.valueToCode(block, 'channel',
      Blockly.Python.ORDER_ATOMIC) || '1';
  const d =
    Blockly.Python.valueToCode(block, 'delay',
      Blockly.Python.ORDER_ATOMIC) || '0';

  return `delay.turn_on(${ch}, ${d})\n`;
};

// ----------------------------------------
// turn off channel
// ----------------------------------------
Blockly.Python['delay_turn_off'] = function (block) {
  const ch =
    Blockly.Python.valueToCode(block, 'channel',
      Blockly.Python.ORDER_ATOMIC) || '1';

  return `delay.turn_off(${ch})\n`;
};

// ----------------------------------------
// turn off all
// ----------------------------------------
Blockly.Python['delay_turn_off_all'] = function () {
  return 'delay.turn_off_all()\n';
};

// ----------------------------------------
// is on (Boolean)
// ----------------------------------------
Blockly.Python['delay_is_on'] = function (block) {
  const ch =
    Blockly.Python.valueToCode(block, 'channel',
      Blockly.Python.ORDER_ATOMIC) || '1';

  return [`delay.is_on(${ch})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ----------------------------------------
// time left (ms)
// ----------------------------------------
Blockly.Python['delay_time_left'] = function (block) {
  const ch =
    Blockly.Python.valueToCode(block, 'channel',
      Blockly.Python.ORDER_ATOMIC) || '1';

  return [`delay.time_left(${ch})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ----------------------------------------
// update (call in loop)
// ----------------------------------------
Blockly.Python['delay_update'] = function () {
  return 'delay.update()\n';
};

// ----------------------------------------
// turn on multiple channels
// ----------------------------------------
Blockly.Python['delay_turn_on_multiple'] = function (block) {
  const chs =
    Blockly.Python.valueToCode(block, 'channels',
      Blockly.Python.ORDER_ATOMIC) || '[]';
  const d =
    Blockly.Python.valueToCode(block, 'delay',
      Blockly.Python.ORDER_ATOMIC) || '0';

  return `delay.turn_on_multiple(${chs}, ${d})\n`;
};
