({
  name: "Relay 4CH Simple",
  description: "ควบคุมรีเลย์ 4 ช่อง เปิด-ปิดทันที",
  author: "Cap_Apiluk",
  category: "Output",
  version: "1.0.0",
  color: "#FF6B35",

  blocks: [
    {
      xml: `
      <block type="relay_on">
        <value name="CH">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>`
    },
    {
      xml: `
      <block type="relay_off">
        <value name="CH">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>`
    },
    {
      xml: `<block type="relay_on_all"></block>`
    },
    {
      xml: `<block type="relay_off_all"></block>`
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
