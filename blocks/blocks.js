// ========================================
// Relay / Delay Multi Channel - Blocks
// Compatible with KidBright / MicroBlock
// ========================================

/* ---------- Setup Channels ---------- */
Blockly.Blocks['delay_setup_channels'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ตั้งค่า Relay")
      .appendField(new Blockly.FieldDropdown([
        ["4 ช่อง", "4"],
        ["8 ช่อง", "8"]
      ]), "num_channels");

    this.appendValueInput("pins")
      .setCheck("Array")
      .appendField("ขา GPIO");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#FF6B35");
  }
};

/* ---------- Pin List (FIX ช่อง / NO mutator) ---------- */
Blockly.Blocks['delay_pin_list'] = {
  init: function () {
    this.appendValueInput("PIN1").setCheck("Number").appendField("ขา 1");
    this.appendValueInput("PIN2").setCheck("Number").appendField("ขา 2");
    this.appendValueInput("PIN3").setCheck("Number").appendField("ขา 3");
    this.appendValueInput("PIN4").setCheck("Number").appendField("ขา 4");

    this.setOutput(true, "Array");
    this.setColour("#E67E22");
  }
};

/* ---------- Turn ON ---------- */
Blockly.Blocks['delay_turn_on'] = {
  init: function () {
    this.appendValueInput("channel")
      .setCheck("Number")
      .appendField("เปิดช่อง");

    this.appendValueInput("delay")
      .setCheck("Number")
      .appendField("หน่วง ms");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#2ECC71");
  }
};

/* ---------- Turn OFF ---------- */
Blockly.Blocks['delay_turn_off'] = {
  init: function () {
    this.appendValueInput("channel")
      .setCheck("Number")
      .appendField("ปิดช่อง");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E74C3C");
  }
};

/* ---------- Turn OFF ALL ---------- */
Blockly.Blocks['delay_turn_off_all'] = {
  init: function () {
    this.appendDummyInput().appendField("ปิดทุกช่อง");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#7F8C8D");
  }
};

/* ---------- Update ---------- */
Blockly.Blocks['delay_update'] = {
  init: function () {
    this.appendDummyInput().appendField("อัปเดตระบบ Relay");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#F1C40F");
  }
};

/* ---------- Is ON ---------- */
Blockly.Blocks['delay_is_on'] = {
  init: function () {
    this.appendValueInput("channel")
      .setCheck("Number")
      .appendField("ช่อง");

    this.appendDummyInput().appendField("เปิดอยู่?");
    this.setOutput(true, "Boolean");
    this.setColour("#3498DB");
  }
};

/* ---------- Time Left ---------- */
Blockly.Blocks['delay_time_left'] = {
  init: function () {
    this.appendValueInput("channel")
      .setCheck("Number")
      .appendField("ช่อง");

    this.appendDummyInput().appendField("เวลาเหลือ ms");
    this.setOutput(true, "Number");
    this.setColour("#9B59B6");
  }
};

/* ========================================
   Generators (MicroPython)
======================================== */

Blockly.Python['delay_setup_channels'] = function (block) {
  const num = block.getFieldValue('num_channels');
  const pins = Blockly.Python.valueToCode(
    block, 'pins', Blockly.Python.ORDER_ATOMIC
  ) || '[]';

  Blockly.Python.definitions_['import_delay_multi'] =
    'import delay_multi_channel as delay';

  return `delay.init(${num}, ${pins})\n`;
};

Blockly.Python['delay_pin_list'] = function (block) {
  const pins = [
    Blockly.Python.valueToCode(block, 'PIN1', Blockly.Python.ORDER_ATOMIC) || '0',
    Blockly.Python.valueToCode(block, 'PIN2', Blockly.Python.ORDER_ATOMIC) || '0',
    Blockly.Python.valueToCode(block, 'PIN3', Blockly.Python.ORDER_ATOMIC) || '0',
    Blockly.Python.valueToCode(block, 'PIN4', Blockly.Python.ORDER_ATOMIC) || '0'
  ];
  return ['[' + pins.join(', ') + ']', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['delay_turn_on'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  const d  = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC) || '0';
  return `delay.turn_on(${ch}, ${d})\n`;
};

Blockly.Python['delay_turn_off'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  return `delay.turn_off(${ch})\n`;
};

Blockly.Python['delay_turn_off_all'] = function () {
  return 'delay.turn_off_all()\n';
};

Blockly.Python['delay_update'] = function () {
  return 'delay.update()\n';
};

Blockly.Python['delay_is_on'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  return [`delay.is_on(${ch})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['delay_time_left'] = function (block) {
  const ch = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC) || '1';
  return [`delay.time_left(${ch})`, Blockly.Python.ORDER_FUNCTION_CALL];
};
