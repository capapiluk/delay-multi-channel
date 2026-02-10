({
  name: "Relay Multi Channel",
  description: "ควบคุม Relay หลายช่อง พร้อมตั้งเวลาหน่วง",
  author: "Cap_Apiluk",
  category: "Output",
  version: "3.0.2",
  icon: "/static/icon.png",
  color: "#FF6B35",

  blocks: [
    { xml: `<block type="delay_setup_channels"></block>` },
    { xml: `<block type="delay_pin_list"></block>` },
    { xml: `<block type="delay_turn_on"></block>` },
    { xml: `<block type="delay_turn_off"></block>` },
    { xml: `<block type="delay_turn_off_all"></block>` },
    { xml: `<block type="delay_update"></block>` },
    { xml: `<block type="delay_is_on"></block>` },
    { xml: `<block type="delay_time_left"></block>` }
  ],

  js: [
    "/blocks/blocks.js"
  ],

  modules: [
    {
      name: "delay_multi_channel",
      path: "/modules/delay_multi_channel.py"
    }
  ]
});
