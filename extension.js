({
    name: "Delay 4 ช่อง",
    description: "ควบคุมการเปิด-ปิดอุปกรณ์ 4 ช่อง พร้อมตั้งเวลาหน่วง + โหมด Calibration",
    author: "Cap_Apiluk",
    category: "Output",
    version: "3.0.0",
    icon: "/static/icon.png",
    color: "#FF6B35",
    blocks: [
        // Block 1: ตั้งค่า 4 ช่อง
        {
            xml: `
                <block type="delay_setup_4ch">
                    <value name="pin1">
                        <shadow type="math_number">
                            <field name="NUM">25</field>
                        </shadow>
                    </value>
                    <value name="pin2">
                        <shadow type="math_number">
                            <field name="NUM">26</field>
                        </shadow>
                    </value>
                    <value name="pin3">
                        <shadow type="math_number">
                            <field name="NUM">27</field>
                        </shadow>
                    </value>
                    <value name="pin4">
                        <shadow type="math_number">
                            <field name="NUM">32</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 2: เปิดช่อง
        {
            xml: `
                <block type="delay_turn_on">
                    <field name="channel">1</field>
                    <value name="delay">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 3: ปิดช่อง
        {
            xml: `
                <block type="delay_turn_off">
                    <field name="channel">1</field>
                </block>
            `
        },
        // Block 4: ปิดทุกช่อง
        {
            xml: `
                <block type="delay_turn_off_all"></block>
            `
        },
        // Block 5: ปิดบางช่อง
        {
            xml: `
                <block type="delay_turn_off_some">
                    <value name="channels">
                        <block type="delay_channel_list">
                            <value name="ADD0">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="ADD1">
                                <shadow type="math_number">
                                    <field name="NUM">3</field>
                                </shadow>
                            </value>
                        </block>
                    </value>
                </block>
            `
        },
        // Block 6: Calibration
        {
            xml: `
                <block type="delay_calibrate">
                    <field name="channel">1</field>
                    <field name="enable">True</field>
                </block>
            `
        },
        // Block 7: เช็คว่าอยู่ใน Calibration
        {
            xml: `
                <block type="delay_is_calibrating">
                    <field name="channel">1</field>
                </block>
            `
        },
        // Block 8: เช็คสถานะเปิด/ปิด
        {
            xml: `
                <block type="delay_is_on">
                    <field name="channel">1</field>
                </block>
            `
        },
        // Block 9: อ่านเวลาที่เหลือ
        {
            xml: `
                <block type="delay_time_left">
                    <field name="channel">1</field>
                </block>
            `
        },
        // Block 10: อัปเดตทุกช่อง
        {
            xml: `
                <block type="delay_update"></block>
            `
        },
        // Block 11: แสดงสถานะ
        {
            xml: `
                <block type="delay_show_status"></block>
            `
        },
        // Block 12: เปิดหลายช่อง
        {
            xml: `
                <block type="delay_turn_on_multiple">
                    <value name="channels">
                        <block type="delay_channel_list">
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
                        </block>
                    </value>
                    <value name="delay">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 13: รายการช่อง (Helper)
        {
            xml: `
                <block type="delay_channel_list">
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
                </block>
            `
        }
    ],
    // JavaScript files (Blockly blocks and generators)
    js: [
        "/blocks/blocks.js",
        "/blocks/generators.js"
    ],
    // Python module
    modules: [
        {
            name: "delay_multi_channel",
            path: "/modules/delay_multi_channel.py"
        }
    ]
});