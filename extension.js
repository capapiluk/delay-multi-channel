({
    name: "Delay หลายช่อง",
    description: "ควบคุมการเปิด-ปิดอุปกรณ์ 1-8 ช่อง พร้อมตั้งเวลาหน่วงแยกอิสระ",
    author: "Your Name",
    category: "Output",
    version: "2.0.0",
    icon: "/static/icon.png",
    color: "#FF6B35",
    blocks: [
        // Block 1: ตั้งค่าหลายช่อง
        {
            xml: `
                <block type="delay_setup_channels">
                    <field name="num_channels">4</field>
                    <value name="pins">
                        <block type="delay_pin_list">
                            <value name="ADD0">
                                <shadow type="math_number">
                                    <field name="NUM">25</field>
                                </shadow>
                            </value>
                            <value name="ADD1">
                                <shadow type="math_number">
                                    <field name="NUM">26</field>
                                </shadow>
                            </value>
                            <value name="ADD2">
                                <shadow type="math_number">
                                    <field name="NUM">27</field>
                                </shadow>
                            </value>
                            <value name="ADD3">
                                <shadow type="math_number">
                                    <field name="NUM">32</field>
                                </shadow>
                            </value>
                        </block>
                    </value>
                </block>
            `
        },
        // Block 2: รายการขา (Helper)
        {
            xml: `
                <block type="delay_pin_list">
                    <value name="ADD0">
                        <shadow type="math_number">
                            <field name="NUM">25</field>
                        </shadow>
                    </value>
                    <value name="ADD1">
                        <shadow type="math_number">
                            <field name="NUM">26</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 3: เปิดช่อง + ตั้งเวลา
        {
            xml: `
                <block type="delay_turn_on">
                    <value name="channel">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="delay">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 4: ปิดช่อง
        {
            xml: `
                <block type="delay_turn_off">
                    <value name="channel">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 5: เช็คสถานะ
        {
            xml: `
                <block type="delay_is_on">
                    <value name="channel">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 6: อ่านเวลาที่เหลือ
        {
            xml: `
                <block type="delay_time_left">
                    <value name="channel">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 7: อัปเดตทุกช่อง
        {
            xml: `
                <block type="delay_update"></block>
            `
        },
        // Block 8: ปิดทุกช่อง
        {
            xml: `
                <block type="delay_turn_off_all"></block>
            `
        },
        // Block 9: แสดงสถานะทุกช่อง
        {
            xml: `
                <block type="delay_show_status"></block>
            `
        },
        // Block 10: อ่านจำนวนช่องทั้งหมด
        {
            xml: `
                <block type="delay_get_channel_count"></block>
            `
        },
        // Block 11: เปิดหลายช่องพร้อมกัน
        {
            xml: `
                <block type="delay_turn_on_multiple">
                    <value name="channels">
                        <block type="lists_create_with">
                            <mutation items="3"></mutation>
                            <value name="ADD0">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="ADD1">
                                <shadow type="math_number">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                            <value name="ADD2">
                                <shadow type="math_number">
                                    <field name="NUM">3</field>
                                </shadow>
                            </value>
                        </block>
                    </value>
                    <value name="delay">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                </block>
            `
        }
    ],
    // JavaScript files (Blockly blocks and generators)
    js: [
        "/blocks.js",
        "/generators.js"
    ],
    // Python module
    modules: [
        {
            name: "delay_multi",
            path: "/modules/delay_multi.py"
        }
    ]
});