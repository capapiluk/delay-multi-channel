"""
Delay Multi Channel Module
ควบคุมการเปิด-ปิดอุปกรณ์ 1-8 ช่อง พร้อมตั้งเวลาหน่วงแยกอิสระ
"""

from machine import Pin
import time

class DelayMultiChannel:
    def __init__(self, pin_list):
        """
        ตั้งค่าหลายช่อง (ยืดหยุ่น 1-8 ช่อง)
        
        Args:
            pin_list: รายการหมายเลขขา เช่น [25, 26, 27] หรือ [25, 26, 27, 32, 33]
        """
        if not isinstance(pin_list, list) or len(pin_list) == 0:
            raise ValueError("❌ pin_list ต้องเป็น list และมีอย่างน้อย 1 ตัว")
        
        if len(pin_list) > 8:
            raise ValueError("❌ รองรับสูงสุด 8 ช่องเท่านั้น")
        
        self.num_channels = len(pin_list)
        self.pins = [Pin(pin, Pin.OUT) for pin in pin_list]
        
        # สถานะแต่ละช่อง: [เปิดหรือไม่, เวลาที่จะปิด]
        self.channels = [[False, 0] for _ in range(self.num_channels)]
        
        # ปิดทุกช่องตอนเริ่มต้น
        self.turn_off_all()
        
        print(f"✅ ตั้งค่า Delay {self.num_channels} ช่อง: {pin_list}")
        
    def turn_on(self, channel, delay_sec=0):
        """
        เปิดช่องที่เลือก + ตั้งเวลาหน่วง
        
        Args:
            channel: หมายเลขช่อง (1 ถึง num_channels)
            delay_sec: เวลาหน่วงก่อนปิดอัตโนมัติ (วินาที)
        """
        idx = channel - 1
        if 0 <= idx < self.num_channels:
            self.pins[idx].on()
            self.channels[idx][0] = True
            
            if delay_sec > 0:
                self.channels[idx][1] = time.ticks_add(time.ticks_ms(), int(delay_sec * 1000))
            else:
                self.channels[idx][1] = 0
                
            time_info = f" ({delay_sec} วินาที)" if delay_sec > 0 else ""
            print(f"✅ เปิดช่อง {channel}{time_info}")
        else:
            print(f"⚠️ ช่อง {channel} ไม่มีอยู่ (มีแค่ 1-{self.num_channels})")
    
    def turn_off(self, channel):
        """
        ปิดช่องที่เลือก
        
        Args:
            channel: หมายเลขช่อง (1 ถึง num_channels)
        """
        idx = channel - 1
        if 0 <= idx < self.num_channels:
            self.pins[idx].off()
            self.channels[idx][0] = False
            self.channels[idx][1] = 0
            print(f"❌ ปิดช่อง {channel}")
        else:
            print(f"⚠️ ช่อง {channel} ไม่มีอยู่")
    
    def is_on(self, channel):
        """
        เช็คว่าช่องนี้เปิดอยู่หรือไม่
        
        Args:
            channel: หมายเลขช่อง (1 ถึง num_channels)
            
        Returns:
            True ถ้าเปิดอยู่, False ถ้าปิด
        """
        idx = channel - 1
        if 0 <= idx < self.num_channels:
            return self.channels[idx][0]
        return False
    
    def time_left(self, channel):
        """
        อ่านเวลาที่เหลือก่อนปิดอัตโนมัติ
        
        Args:
            channel: หมายเลขช่อง (1 ถึง num_channels)
            
        Returns:
            เวลาที่เหลือ (วินาที) หรือ 0 ถ้าไม่ได้ตั้งเวลา
        """
        idx = channel - 1
        if 0 <= idx < self.num_channels:
            if self.channels[idx][1] > 0:
                remaining = time.ticks_diff(self.channels[idx][1], time.ticks_ms())
                return max(0, remaining / 1000)
        return 0
    
    def update(self):
        """
        อัปเดตและปิดช่องที่หมดเวลาแล้ว
        **ต้องเรียกใน loop ตลอดเวลา**
        """
        now = time.ticks_ms()
        for i in range(self.num_channels):
            if self.channels[i][0] and self.channels[i][1] > 0:
                if time.ticks_diff(self.channels[i][1], now) <= 0:
                    self.turn_off(i + 1)
    
    def turn_off_all(self):
        """
        ปิดทุกช่องพร้อมกัน
        """
        for i in range(self.num_channels):
            self.pins[i].off()
            self.channels[i] = [False, 0]
        print(f"🚫 ปิดทุกช่อง ({self.num_channels} ช่อง)")
    
    def turn_on_multiple(self, channel_list, delay_sec=0):
        """
        เปิดหลายช่องพร้อมกัน
        
        Args:
            channel_list: รายการช่องที่ต้องการเปิด เช่น [1, 2, 3]
            delay_sec: เวลาหน่วงสำหรับทุกช่อง
        """
        if isinstance(channel_list, list):
            for ch in channel_list:
                self.turn_on(ch, delay_sec)
        else:
            print("⚠️ channel_list ต้องเป็น list")
    
    def get_channel_count(self):
        """
        คืนค่าจำนวนช่องทั้งหมด
        
        Returns:
            จำนวนช่อง
        """
        return self.num_channels
    
    def show_status(self):
        """
        แสดงสถานะทุกช่อง
        """
        print(f"\n📊 สถานะ Delay {self.num_channels} ช่อง:")
        print("=" * 45)
        for i in range(self.num_channels):
            status = "🟢 เปิด" if self.channels[i][0] else "🔴 ปิด"
            time_left = self.time_left(i + 1)
            time_info = f" (เหลือ {time_left:.1f} วินาที)" if time_left > 0 else ""
            print(f"  ช่อง {i+1}: {status}{time_info}")
        print("=" * 45 + "\n")