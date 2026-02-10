"""
Delay Multi Channel Module for MicroBlock Extension
ควบคุมการเปิด-ปิดอุปกรณ์ 4 ช่อง พร้อมตั้งเวลาหน่วง + Calibration
รองรับ Digital Pin ESP32
Compatible with MicroPython 1.6.0+ (No f-strings)
"""

from machine import Pin
import time

class DelayMultiChannel:
    def __init__(self, pin_list):
        """
        ตั้งค่า 4 ช่อง Digital
        
        Args:
            pin_list: รายการหมายเลขขา เช่น [25, 26, 27, 32]
        """
        if not isinstance(pin_list, list):
            raise ValueError("❌ pin_list ต้องเป็น list")
        
        if len(pin_list) != 4:
            raise ValueError("❌ ต้องกำหนด 4 ช่องเท่านั้น")
        
        self.num_channels = 4
        self.pins = [Pin(pin, Pin.OUT) for pin in pin_list]
        self.pin_numbers = pin_list
        
        # สถานะแต่ละช่อง: [เปิดหรือไม่, เวลาที่จะปิด, โหมด calibration]
        self.channels = [[False, 0, False] for _ in range(4)]
        
        # ปิดทุกช่องตอนเริ่มต้น
        self.turn_off_all()
        
        print("✅ ตั้งค่า 4 ช่อง Digital: " + str(pin_list))
        
    def turn_on(self, channel, delay_sec=0):
        """
        เปิดช่องที่เลือก + ตั้งเวลาหน่วง (หรือไม่ก็ได้)
        
        Args:
            channel: หมายเลขช่อง (1-4)
            delay_sec: เวลาหน่วงก่อนปิดอัตโนมัติ (วินาที), 0 = ไม่หน่วง
        """
        idx = channel - 1
        if 0 <= idx < 4:
            # ถ้าอยู่ในโหมด calibration ห้ามเปิด
            if self.channels[idx][2]:
                print("⚠️ ช่อง " + str(channel) + " อยู่ในโหมด Calibration ไม่สามารถเปิดได้")
                return
                
            self.pins[idx].on()
            self.channels[idx][0] = True
            
            if delay_sec > 0:
                self.channels[idx][1] = time.ticks_add(time.ticks_ms(), int(delay_sec * 1000))
                print("✅ เปิดช่อง " + str(channel) + " (หน่วง " + str(delay_sec) + " วินาที)")
            else:
                self.channels[idx][1] = 0
                print("✅ เปิดช่อง " + str(channel) + " (ไม่หน่วงเวลา)")
        else:
            print("⚠️ ช่อง " + str(channel) + " ไม่ถูกต้อง (ต้องเป็น 1-4)")
    
    def turn_off(self, channel):
        """
        ปิดช่องที่เลือก
        
        Args:
            channel: หมายเลขช่อง (1-4)
        """
        idx = channel - 1
        if 0 <= idx < 4:
            self.pins[idx].off()
            self.channels[idx][0] = False
            self.channels[idx][1] = 0
            print("❌ ปิดช่อง " + str(channel))
        else:
            print("⚠️ ช่อง " + str(channel) + " ไม่ถูกต้อง")
    
    def turn_off_all(self):
        """
        ปิดทุกช่องพร้อมกัน
        """
        for i in range(4):
            self.pins[i].off()
            self.channels[i][0] = False
            self.channels[i][1] = 0
        print("🚫 ปิดทุกช่อง (4 ช่อง)")
    
    def turn_off_some(self, channel_list):
        """
        ปิดบางช่องตามที่กำหนด
        
        Args:
            channel_list: รายการช่องที่ต้องการปิด เช่น [1, 3] หรือ [2, 4]
        """
        if not isinstance(channel_list, list):
            print("⚠️ channel_list ต้องเป็น list")
            return
            
        for ch in channel_list:
            if 1 <= ch <= 4:
                self.turn_off(ch)
            else:
                print("⚠️ ช่อง " + str(ch) + " ไม่ถูกต้อง (ต้องเป็น 1-4)")
    
    def calibrate_channel(self, channel, enable=True):
        """
        เข้าโหมด Calibration สำหรับช่องที่เลือก
        เมื่อเข้าโหมด Calibration ช่องนั้นจะถูกปิดและล็อคไม่ให้เปิดได้
        
        Args:
            channel: หมายเลขช่อง (1-4)
            enable: True = เข้าโหมด Calibration, False = ออกจากโหมด
        """
        idx = channel - 1
        if 0 <= idx < 4:
            self.channels[idx][2] = enable
            
            if enable:
                # ปิดช่องและล็อค
                self.pins[idx].off()
                self.channels[idx][0] = False
                self.channels[idx][1] = 0
                print("🔧 ช่อง " + str(channel) + " เข้าโหมด Calibration (ล็อค)")
            else:
                print("🔓 ช่อง " + str(channel) + " ออกจากโหมด Calibration")
        else:
            print("⚠️ ช่อง " + str(channel) + " ไม่ถูกต้อง")
    
    def is_calibrating(self, channel):
        """
        เช็คว่าช่องนี้อยู่ในโหมด Calibration หรือไม่
        
        Args:
            channel: หมายเลขช่อง (1-4)
            
        Returns:
            True ถ้าอยู่ในโหมด Calibration
        """
        idx = channel - 1
        if 0 <= idx < 4:
            return self.channels[idx][2]
        return False
    
    def is_on(self, channel):
        """
        เช็คว่าช่องนี้เปิดอยู่หรือไม่
        
        Args:
            channel: หมายเลขช่อง (1-4)
            
        Returns:
            True ถ้าเปิดอยู่
        """
        idx = channel - 1
        if 0 <= idx < 4:
            return self.channels[idx][0]
        return False
    
    def time_left(self, channel):
        """
        อ่านเวลาที่เหลือก่อนปิดอัตโนมัติ
        
        Args:
            channel: หมายเลขช่อง (1-4)
            
        Returns:
            เวลาที่เหลือ (วินาที) หรือ 0 ถ้าไม่ได้ตั้งเวลา
        """
        idx = channel - 1
        if 0 <= idx < 4:
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
        for i in range(4):
            # ข้ามช่องที่อยู่ในโหมด calibration
            if self.channels[i][2]:
                continue
                
            if self.channels[i][0] and self.channels[i][1] > 0:
                if time.ticks_diff(self.channels[i][1], now) <= 0:
                    self.turn_off(i + 1)
    
    def turn_on_multiple(self, channel_list, delay_sec=0):
        """
        เปิดหลายช่องพร้อมกัน
        
        Args:
            channel_list: รายการช่องที่ต้องการเปิด เช่น [1, 2, 3]
            delay_sec: เวลาหน่วงสำหรับทุกช่อง (0 = ไม่หน่วง)
        """
        if not isinstance(channel_list, list):
            print("⚠️ channel_list ต้องเป็น list")
            return
            
        for ch in channel_list:
            if 1 <= ch <= 4:
                self.turn_on(ch, delay_sec)
            else:
                print("⚠️ ช่อง " + str(ch) + " ไม่ถูกต้อง")
    
    def show_status(self):
        """
        แสดงสถานะทุกช่อง
        """
        print("\n📊 สถานะ 4 ช่อง Digital:")
        print("=" * 55)
        for i in range(4):
            pin_num = self.pin_numbers[i]
            
            # เช็คโหมด
            if self.channels[i][2]:
                status = "🔧 Calibration"
                time_info = ""
            elif self.channels[i][0]:
                status = "🟢 เปิด"
                time_left_val = self.time_left(i + 1)
                if time_left_val > 0:
                    time_info = " (เหลือ " + str(round(time_left_val, 1)) + " วินาที)"
                else:
                    time_info = " (ไม่หน่วง)"
            else:
                status = "🔴 ปิด"
                time_info = ""
                
            print("  ช่อง " + str(i+1) + " (GPIO " + str(pin_num) + "): " + status + time_info)
        print("=" * 55 + "\n")


# ========================================
# Simplified API สำหรับ MicroBlock Extension
# ========================================

_relay = None

def init(pin1=25, pin2=26, pin3=27, pin4=32):
    """เริ่มต้น 4 ช่อง Digital"""
    global _relay
    _relay = DelayMultiChannel([pin1, pin2, pin3, pin4])
    return _relay

def turn_on(channel, delay_sec=0):
    """เปิดช่อง (ไม่หน่วงหรือหน่วงก็ได้)"""
    global _relay
    if _relay is None:
        init()
    _relay.turn_on(channel, delay_sec)

def turn_off(channel):
    """ปิดช่อง"""
    global _relay
    if _relay is None:
        init()
    _relay.turn_off(channel)

def turn_off_all():
    """ปิดทุกช่อง"""
    global _relay
    if _relay is None:
        init()
    _relay.turn_off_all()

def turn_off_some(channel_list):
    """ปิดบางช่อง เช่น [1, 3]"""
    global _relay
    if _relay is None:
        init()
    _relay.turn_off_some(channel_list)

def calibrate(channel, enable=True):
    """เข้า/ออกโหมด Calibration"""
    global _relay
    if _relay is None:
        init()
    _relay.calibrate_channel(channel, enable)

def is_calibrating(channel):
    """เช็คว่าช่องอยู่ในโหมด Calibration หรือไม่"""
    global _relay
    if _relay is None:
        init()
    return _relay.is_calibrating(channel)

def is_on(channel):
    """เช็คว่าช่องเปิดอยู่หรือไม่"""
    global _relay
    if _relay is None:
        init()
    return _relay.is_on(channel)

def time_left(channel):
    """เช็คเวลาที่เหลือ"""
    global _relay
    if _relay is None:
        init()
    return _relay.time_left(channel)

def update():
    """อัปเดตสถานะ (ต้องเรียกใน loop)"""
    global _relay
    if _relay is None:
        init()
    _relay.update()

def show_status():
    """แสดงสถานะทุกช่อง"""
    global _relay
    if _relay is None:
        init()
    _relay.show_status()

def turn_on_multiple(channel_list, delay_sec=0):
    """เปิดหลายช่อง"""
    global _relay
    if _relay is None:
        init()
    _relay.turn_on_multiple(channel_list, delay_sec)