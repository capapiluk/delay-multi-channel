// ========================================
// Delay Multi Channel Extension - Blocks
// ========================================

// Block 1: ตั้งค่าหลายช่อง (แบบยืดหยุ่น)
Blockly.Blocks['delay_setup_channels'] = {
  init: function() {
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
        ]), "num_channels")
        .appendField("");
    this.appendValueInput("pins")
        .setCheck("Array")
        .appendField("ขา (List)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF6B35");
    this.setTooltip("กำหนดจำนวนช่องและหมายเลขขา เช่น [25, 26, 27]");
    this.setHelpUrl("");
  }
};

// Block 1.1: สร้าง List ของขา (helper)
Blockly.Blocks['delay_pin_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📌 รายการขา");
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true, "Array");
    this.setColour("#E67E22");
    this.setMutator(new Blockly.Mutator(['delay_pin_list_item']));
    this.setTooltip("สร้างรายการหมายเลขขา");
  },
  
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10) || 2;
    this.updateShape_();
  },
  
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('delay_pin_list_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('delay_pin_list_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  
  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    const connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (let i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },
  
  updateShape_: function() {
    // ลบ input เก่า
    let i = 0;
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
    // เพิ่ม input ใหม่
    for (i = 0; i < this.itemCount_; i++) {
      this.appendValueInput('ADD' + i)
          .setCheck('Number')
          .appendField('ขา ' + (i + 1));
    }
  }
};

// Helper blocks for mutator
Blockly.Blocks['delay_pin_list_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('รายการขา');
    this.appendStatementInput('STACK');
    this.setColour("#E67E22");
    this.contextMenu = false;
  }
};

Blockly.Blocks['delay_pin_list_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('ขา');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#E67E22");
    this.contextMenu = false;
  }
};

// Block 2: เปิดช่อง + ตั้งเวลา (เลือกเลขช่องเอง)
Blockly.Blocks['delay_turn_on'] = {
  init: function() {
    this.appendValueInput("channel")
        .setCheck("Number")
        .appendField("✅ เปิดช่อง");
    this.appendValueInput("delay")
        .setCheck("Number")
        .appendField("หน่วงเวลา");
    this.appendDummyInput()
        .appendField("วินาที");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#27AE60");
    this.setTooltip("เปิดช่องที่เลือก และตั้งเวลาหน่วง");
    this.setHelpUrl("");
  }
};

// Block 3: ปิดช่อง (เลือกเลขช่องเอง)
Blockly.Blocks['delay_turn_off'] = {
  init: function() {
    this.appendValueInput("channel")
        .setCheck("Number")
        .appendField("❌ ปิดช่อง");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E74C3C");
    this.setTooltip("ปิดช่องที่เลือก");
    this.setHelpUrl("");
  }
};

// Block 4: เช็คสถานะ
Blockly.Blocks['delay_is_on'] = {
  init: function() {
    this.appendValueInput("channel")
        .setCheck("Number")
        .appendField("🔍 ช่อง");
    this.appendDummyInput()
        .appendField("เปิดอยู่หรือไม่?");
    this.setOutput(true, "Boolean");
    this.setColour("#3498DB");
    this.setTooltip("เช็คว่าช่องนี้เปิดอยู่หรือไม่");
    this.setHelpUrl("");
  }
};

// Block 5: อ่านเวลาที่เหลือ
Blockly.Blocks['delay_time_left'] = {
  init: function() {
    this.appendValueInput("channel")
        .setCheck("Number")
        .appendField("⏱️ ช่อง");
    this.appendDummyInput()
        .appendField("เหลือเวลาอีกกี่วินาที?");
    this.setOutput(true, "Number");
    this.setColour("#9B59B6");
    this.setTooltip("อ่านเวลาที่เหลือก่อนปิดอัตโนมัติ");
    this.setHelpUrl("");
  }
};

// Block 6: อัปเดตทุกช่อง (ใส่ใน loop)
Blockly.Blocks['delay_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄 อัปเดต Delay ทุกช่อง");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#F39C12");
    this.setTooltip("เช็คและปิดช่องที่หมดเวลาแล้ว (ต้องใส่ใน loop)");
    this.setHelpUrl("");
  }
};

// Block 7: ปิดทุกช่อง
Blockly.Blocks['delay_turn_off_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🚫 ปิดทุกช่อง");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#95A5A6");
    this.setTooltip("ปิดทุกช่องพร้อมกัน");
    this.setHelpUrl("");
  }
};

// Block 8: แสดงสถานะทุกช่อง
Blockly.Blocks['delay_show_status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📊 แสดงสถานะทุกช่อง");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#1ABC9C");
    this.setTooltip("แสดงสถานะและเวลาที่เหลือของทุกช่อง");
    this.setHelpUrl("");
  }
};

// Block 9: อ่านจำนวนช่องทั้งหมด
Blockly.Blocks['delay_get_channel_count'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔢 จำนวนช่องทั้งหมด");
    this.setOutput(true, "Number");
    this.setColour("#34495E");
    this.setTooltip("คืนค่าจำนวนช่องที่กำหนดไว้");
    this.setHelpUrl("");
  }
};

// Block 10: เปิดหลายช่อง (แบบ loop-friendly)
Blockly.Blocks['delay_turn_on_multiple'] = {
  init: function() {
    this.appendValueInput("channels")
        .setCheck("Array")
        .appendField("✅ เปิดหลายช่อง");
    this.appendValueInput("delay")
        .setCheck("Number")
        .appendField("หน่วงเวลา");
    this.appendDummyInput()
        .appendField("วินาที");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#27AE60");
    this.setTooltip("เปิดหลายช่องพร้อมกัน เช่น [1, 2, 3]");
    this.setHelpUrl("");
  }
};