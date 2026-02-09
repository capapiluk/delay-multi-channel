// ========================================
// Delay Multi Channel - Code Generators
// ========================================

Blockly.Python['delay_setup_channels'] = function(block) {
  Blockly.Python.definitions_['import_delay_multi'] = 'from delay_multi import DelayMultiChannel';
  
  const numChannels = block.getFieldValue('num_channels');
  const pins = Blockly.Python.valueToCode(block, 'pins', Blockly.Python.ORDER_ATOMIC) || '[]';
  
  Blockly.Python.definitions_['var_delay_multi'] = 
    `delay_ch = DelayMultiChannel(${pins})`;
  
  return '';
};

Blockly.Python['delay_pin_list'] = function(block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const value = Blockly.Python.valueToCode(block, 'ADD' + i, Blockly.Python.ORDER_NONE) || '0';
    elements.push(value);
  }
  const code = '[' + elements.join(', ') + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['delay_turn_on'] = function(block) {
  const channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  const delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC) || '0';
  return `delay_ch.turn_on(${channel}, ${delay})\n`;
};

Blockly.Python['delay_turn_off'] = function(block) {
  const channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  return `delay_ch.turn_off(${channel})\n`;
};

Blockly.Python['delay_is_on'] = function(block) {
  const channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  const code = `delay_ch.is_on(${channel})`;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['delay_time_left'] = function(block) {
  const channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  const code = `delay_ch.time_left(${channel})`;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['delay_update'] = function(block) {
  return 'delay_ch.update()\n';
};

Blockly.Python['delay_turn_off_all'] = function(block) {
  return 'delay_ch.turn_off_all()\n';
};

Blockly.Python['delay_show_status'] = function(block) {
  return 'delay_ch.show_status()\n';
};

Blockly.Python['delay_get_channel_count'] = function(block) {
  const code = 'delay_ch.get_channel_count()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['delay_turn_on_multiple'] = function(block) {
  const channels = Blockly.Python.valueToCode(block, 'channels', Blockly.Python.ORDER_ATOMIC) || '[]';
  const delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC) || '0';
  return `delay_ch.turn_on_multiple(${channels}, ${delay})\n`;
};