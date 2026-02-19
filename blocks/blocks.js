const RELAY_CHANNELS = [
  ["ช่อง 1", "1"],
  ["ช่อง 2", "2"],
  ["ช่อง 3", "3"],
  ["ช่อง 4", "4"]
];

Blockly.Blocks['relay_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("เปิดรีเลย์")
      .appendField(new Blockly.FieldDropdown(RELAY_CHANNELS), "CH");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
  }
};

Blockly.Blocks['relay_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ปิดรีเลย์")
      .appendField(new Blockly.FieldDropdown(RELAY_CHANNELS), "CH");

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

// บล็อคคำสั่งรอ/หน่วงเวลา
Blockly.Blocks['relay_wait'] = {
  init: function () {
    this.appendValueInput("SECONDS")
      .setCheck("Number")
      .appendField("รอ");
    this.appendDummyInput()
      .appendField("วินาที");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip("หน่วงเวลาตามจำนวนวินาทีที่กำหนด");
  }
};
