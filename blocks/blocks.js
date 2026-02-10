// ========================================
// Relay 4CH Simple - Blocks + Generator
// GPIO fixed: 18,19,21,22
// ========================================

/* ---------- เปิดช่อง ---------- */
Blockly.Blocks['relay_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("เปิดช่อง")
      .appendField(new Blockly.FieldDropdown([
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"]
      ]), "ch");

    this.appendValueInput("delay")
      .setCheck("Number")
      .appendField("หน่วง (วินาที)");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#2ECC71");
  }
};

/* ---------- ปิดทุกช่อง ---------- */
Blockly.Blocks['relay_off_all'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ปิดทุกช่อง");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E74C3C");
  }
};

/* ---------- Generator ---------- */
Blockly.Python['relay_on'] = function (block) {
  const ch = block.getFieldValue('ch');
  const d  = Blockly.Python.valueToCode(
    block, 'delay', Blockly.Python.ORDER_ATOMIC
  ) || '0';

  Blockly.Python.definitions_['import_relay4ch'] =
    'import relay_4ch';

  return `relay_4ch.on(${ch}, ${d})\n`;
};

Blockly.Python['relay_off_all'] = function () {
  Blockly.Python.definitions_['import_relay4ch'] =
    'import relay_4ch';

  return `relay_4ch.off_all()\n`;
};
