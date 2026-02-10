// ================================
// Delay Multi Channel - Blocks
// ================================

Blockly.Blocks['delay_setup_channels'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("🔧 ตั้งค่า Delay")
      .appendField(new Blockly.FieldDropdown([
        ["1 ช่อง", "1"], ["2 ช่อง", "2"], ["3 ช่อง", "3"], ["4 ช่อง", "4"],
        ["5 ช่อง", "5"], ["6 ช่อง", "6"], ["7 ช่อง", "7"], ["8 ช่อง", "8"]
      ]), "num_channels");

    this.appendValueInput("pins")
      .setCheck("Array")
      .appendField("ขา");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#FF6B35");
  }
};

// ---------- Pin List ----------
Blockly.Blocks['delay_pin_list'] = {
  init: function () {
    this.itemCount_ = 2;
    this.setOutput(true, "Array");
    this.setColour("#E67E22");
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['delay_pin_list_item']));
  },

  mutationToDom: function () {
    const c = document.createElement('mutation');
    c.setAttribute('items', this.itemCount_);
    return c;
  },

  domToMutation: function (xml) {
    this.itemCount_ = parseInt(xml.getAttribute('items'), 10) || 2;
    this.updateShape_();
  },

  decompose: function (ws) {
    const c = ws.newBlock('delay_pin_list_container');
    c.initSvg();
    let conn = c.getInput('STACK').connection;

    for (let i = 0; i < this.itemCount_; i++) {
      const b = ws.newBlock('delay_pin_list_item');
      b.initSvg();
      conn.connect(b.previousConnection);
      conn = b.nextConnection;
    }
    return c;
  },

  compose: function (c) {
    let item = c.getInputTargetBlock('STACK');
    const conns = [];
    while (item) {
      conns.push(item.valueConnection_);
      item = item.nextConnection && item.nextConnection.targetBlock();
    }
    this.itemCount_ = conns.length;
    this.updateShape_();

    for (let i = 0; i < conns.length; i++) {
      if (conns[i]) {
        this.getInput('ADD' + i).connection.connect(conns[i]);
      }
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
        .appendField("ขา " + (i + 1));
    }
  }
};

Blockly.Blocks['delay_pin_list_container'] = {
  init: function () {
    this.appendDummyInput().appendField("รายการขา");
    this.appendStatementInput("STACK");
    this.setColour("#E67E22");
  }
};

Blockly.Blocks['delay_pin_list_item'] = {
  init: function () {
    this.appendDummyInput().appendField("ขา");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E67E22");
  }
};

// ---------- Control ----------
Blockly.Blocks['delay_turn_on'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number").appendField("✅ เปิดช่อง");
    this.appendValueInput("delay").setCheck("Number").appendField("หน่วง (ms)");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#27AE60");
  }
};

Blockly.Blocks['delay_turn_off'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number").appendField("❌ ปิดช่อง");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E74C3C");
  }
};

Blockly.Blocks['delay_turn_off_all'] = {
  init: function () {
    this.appendDummyInput().appendField("🚫 ปิดทุกช่อง");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#95A5A6");
  }
};

Blockly.Blocks['delay_is_on'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number").appendField("ช่อง");
    this.appendDummyInput().appendField("เปิดอยู่?");
    this.setOutput(true, "Boolean");
    this.setColour("#3498DB");
  }
};

Blockly.Blocks['delay_time_left'] = {
  init: function () {
    this.appendValueInput("channel").setCheck("Number").appendField("ช่อง");
    this.appendDummyInput().appendField("เวลาเหลือ");
    this.setOutput(true, "Number");
    this.setColour("#9B59B6");
  }
};

Blockly.Blocks['delay_update'] = {
  init: function () {
    this.appendDummyInput().appendField("🔄 update");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#F39C12");
  }
};
