 ({
  name: "Relay 4CH Simple",
  description: "ควบคุมรีเลย์ 4 ช่อง เปิด-ปิดทันที (MicroPython 1.6.0+)",
  author: "Cap_Apiluk",
  category: "Output",
  version: "1.4.0",
  icon: "/static/icon.png",
  color: "#FF6B35",

  blocks: [
    {
      xml: `<block type="relay_on"></block>`
    },
    {
      xml: `<block type="relay_off"></block>`
    },
    {
      xml: `<block type="relay_on_all"></block>`
    },
    {
      xml: `<block type="relay_off_all"></block>`
    },
    {
      xml: `<block type="relay_wait">
        <value name="SECONDS">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>`
    }
  ],

  js: [
    "/blocks/blocks.js",
    "/blocks/generators.js"
  ],

  modules: [
    {
      name: "relay_4ch",
      path: "/modules/relay_4ch.py"
    }
  ]
});
