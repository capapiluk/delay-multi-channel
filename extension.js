({
  name: "Relay 4 ช่อง (ง่าย)",
  description: "เปิด-ปิด Relay 4 ช่อง (GPIO 18,19,21,22) พร้อมหน่วงเวลาเป็นวินาที",
  author: "Cap_Apiluk",
  category: "Output",
  version: "1.0.0",
  icon: "/static/icon.png",
  color: "#FF6B35",

  blocks: [
    {
      xml: `
        <block type="relay_on">
          <value name="delay">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
      `
    },
    {
      xml: `<block type="relay_off_all"></block>`
    }
  ],

  js: [
    "/blocks/blocks.js"
  ],

  modules: [
    {
      name: "relay_4ch",
      path: "/modules/relay_4ch.py"
    }
  ]
});
