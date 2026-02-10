// ========================================
// Delay Multi Channel Extension - Blocks
// ========================================

Blockly.Blocks['delay_setup_channels'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("🔧 ตั้งค่า Delay")
      .appendField(new Blockly.FieldDropdown([
        ["1 ช่อง", "1"],
        ["2 ช่อง", "2"],
        ["3 ช่อง", "3"],
        ["4 ช่อง", "4"],
        ["5 ช่อง", "5"],
        ["6 ช่อง", "6"],
        ["7 ช่อง", "7"],
        ["8 ช่อง", "8"]
      ]), "num_channels");

    this.appendValueInput("pins")
      .setCheck("Array")
      .appendField("ขา (List)");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(25);
    this.setTooltip("กำหนดจำนวนช่องและขา เช่น [25,26,27]");
  }
};

// ----------------------------------------

Blockly.Blocks['delay_pin_list'] = {
  init: function () {
    this.appendDummyInput().appendField("📌 รายการขา");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true, "Array");
    this.setColour(45);
    this.setMutator(new Blockly.Mutator(['delay_pin_list_item']));
  },

  mutationToDom: function () {
    const container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function (xml) {
    this.itemCount_ = parseInt(xml.getAttribute('items'), 10) || 2;
    this.updateShape_();
  },

  decompose: function (workspace) {
    const container = workspace.newBlock('delay_pin_list_container');
    container.initSvg();
    let connection = container.getInput('STACK').connection;

    for (let i = 0; i < this.itemCount_; i++) {
      const item = workspace.newBlock('delay_pin_list_item');
      item.initSvg();
      connection.connect(item.previousConnection);
      connection = item.nextConnection;
    }
    return container;
  },

  compose: function (container) {
    let item = container.getInputTargetBlock('STACK');
    const connections = [];

    while (item) {
      connections.push(item.valueConnection_);
      item = item.nextConnection && item.nextConnection.targetBlock();
    }

    this.itemCount_ = connections.length;
    this.updateShape_();

    for (let i = 0; i < connections.length; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },

  saveConnections: function (container) {
    let item = container.getInputTargetBlock('STACK');
    let i = 0;
    while (item) {
      const input = this.getInput('ADD' + i);
      item.valueConnection_ = input && input.connection.targetConnection;
      item = item.nextConnection && item.nextConnection.targetBlock();
      i++;
    }
  },

  updateShape_: function () {
    let i = 0;
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }

    for (i = 0; i < this.itemCount_; i++) {
      this.appendValueInput('ADD' + i)
        .setCheck('Number')
        .appendField('ขา ' + (i + 1));
    }
  }
};

Blockly.Blocks['delay_pin_list_container'] = {
  init: function () {
    this.appendDummyInput().appendField("รายการขา");
    this.appendStatementInput("STACK");
    this.setColour(45);
  }
};

Blockly.Blocks['delay_pin_list_item'] = {
  init: function () {
    this.appendDummyInput().appendField("ขา");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(45);
  }
};

// ----------------------------------------

Blockly.Blocks['delay_turn_on'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number")
      .appendField("เปิดช่อง");
    this.appendValueInput("delay").setCheck("Number")
      .appendField("หน่วง");
    this.appendDummyInput().appendField("ms");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  }
};

Blockly.Blocks['delay_turn_off'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number")
      .appendField(" ปิดช่อง");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
  }
};

Blockly.Blocks['delay_turn_off_all'] = {
  init: function () {
    this.appendDummyInput().appendField(" ปิดทุกช่อง");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
  }
};

Blockly.Blocks['delay_is_on'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number")
      .appendField("ช่อง");
    this.appendDummyInput().appendField("เปิดอยู่?");
    this.setOutput(true, "Boolean");
    this.setColour(210);
  }
};

Blockly.Blocks['delay_time_left'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number")
      .appendField("ช่อง");
    this.appendDummyInput().appendField("เวลาเหลือ (ms)");
    this.setOutput(true, "Number");
    this.setColour(260);
  }
};

Blockly.Blocks['delay_update'] = {
  init: function () {
    this.appendDummyInput().appendField("อัปเดต Delay");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
  }
};

Blockly.Blocks['delay_turn_on_multiple'] = {
  init: function () {
    this.appendValueInput("channels").setCheck("Array")
      .appendField("เปิดหลายช่อง");
    this.appendValueInput("delay").setCheck("Number")
      .appendField("หน่วง");
    this.appendDummyInput().appendField("ms");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  }
};
