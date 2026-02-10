Blockly.Blocks['relay_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("เปิดรีเลย์ ช่อง");
    this.appendValueInput("CH")
      .setCheck("Number");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
  }
};

Blockly.Blocks['relay_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ปิดรีเลย์ ช่อง");
    this.appendValueInput("CH")
      .setCheck("Number");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
  }
};

Blockly.Blocks['relay_on_all'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("เปิดรีเลย์ทั้งหมด");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
  }
};

Blockly.Blocks['relay_off_all'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ปิดรีเลย์ทั้งหมด");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
  }
};
