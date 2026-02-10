({
  name: "Relay Multi Channel",
  description: "ควบคุมการเปิด-ปิดหลายช่อง พร้อมตั้งเวลาหน่วง",
  author: "Cap_Apiluk",
  category: "Output",
  version: "3.0.1",
  icon: "/static/icon.png",
  color: "#FF6B35",

  blocks: [
    {
      xml: `
        <block type="delay_setup_channels">
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
              <field name="NUM">1000</field>
            </shadow>
          </value>
        </block>
      `
    },

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

    {
      xml: `<block type="delay_turn_off_all"></block>`
    },

    {
      xml: `
        <block type="delay_turn_on_multiple">
          <value name="channels">
            <block type="delay_pin_list">
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

    {
      xml: `<block type="delay_update"></block>`
    },

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
    }
  ],

  js: [
    "/blocks/blocks.js",
    "/blocks/generators.js"
  ],

  modules: [
    {
      name: "delay_multi_channel",
      path: "/modules/delay_multi_channel.py"
    }
  ]
});
