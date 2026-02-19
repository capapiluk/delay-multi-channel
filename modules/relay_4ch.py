from machine import Pin
import time

# ฟังก์ชัน digital_write สำหรับควบคุม GPIO
def digital_write(pin, value):
    """เขียนค่า digital (0 หรือ 1) ไปยัง pin ที่กำหนด"""
    pin.value(value)

# ฟังก์ชัน digital_read สำหรับอ่านค่า GPIO  
def digital_read(pin):
    """อ่านค่า digital (0 หรือ 1) จาก pin ที่กำหนด"""
    return pin.value()

# ใช้ GPIO pins 15, 18, 19, 21 สำหรับ relay 4 ช่อง
_CHANNELS = {
    1: Pin(15, Pin.OUT),
    2: Pin(18, Pin.OUT),
    3: Pin(19, Pin.OUT),
    4: Pin(21, Pin.OUT),
}

# ฟังก์ชันรอแยกออกมาเป็นวินาที
def wait(seconds):
    """รอตามจำนวนวินาทีที่กำหนด"""
    time.sleep(seconds)

# เปิดขาเดี่ยว
def on(ch):
    """เปิด relay ช่องที่กำหนด (1-4)"""
    ch = int(ch)
    if ch in _CHANNELS:
        digital_write(_CHANNELS[ch], 0)  # ส่ง 0 เพื่อเปิด relay
        print(f"เปิด Relay ช่อง {ch} (GPIO{_CHANNELS[ch]})")

# ปิดขาเดี่ยว
def off(ch):
    """ปิด relay ช่องที่กำหนด (1-4)"""
    ch = int(ch)
    if ch in _CHANNELS:
        digital_write(_CHANNELS[ch], 1)  # ส่ง 1 เพื่อปิด relay
        print(f"ปิด Relay ช่อง {ch} (GPIO{_CHANNELS[ch]})")

# เปิดทั้งหมด
def on_all():
    """เปิด relay ทุกช่อง"""
    for ch_num, pin in _CHANNELS.items():
        digital_write(pin, 0)  # ส่ง 0 เพื่อเปิด relay
    print("เปิด Relay ทั้งหมด (GPIO 15, 18, 19, 21)")

# ปิดทั้งหมด
def off_all():
    """ปิด relay ทุกช่อง"""
    for ch_num, pin in _CHANNELS.items():
        digital_write(pin, 1)  # ส่ง 1 เพื่อปิด relay
    print("ปิด Relay ทั้งหมด (GPIO 15, 18, 19, 21)")

# ฟังก์ชันเพิ่มเติมสำหรับใช้งานง่าย
def open_all():
    """เปิดทั้งหมด (alias สำหรับ on_all)"""
    on_all()

def close_all():
    """ปิดทั้งหมด (alias สำหรับ off_all)"""
    off_all()

def toggle(ch):
    """สลับสถานะ relay ช่องที่กำหนด"""
    ch = int(ch)
    if ch in _CHANNELS:
        current_value = digital_read(_CHANNELS[ch])
        new_value = 1 - current_value
        digital_write(_CHANNELS[ch], new_value)
        status = "ปิด" if new_value else "เปิด"  # กลับ logic เพราะ Active Low
        print(f"สลับ Relay ช่อง {ch} เป็น {status}")

def status():
    """แสดงสถานะปัจจุบันของ relay ทุกช่อง""" 
    print("สถานะ Relay:")
    gpio_pins = [15, 18, 19, 21]  # GPIO pins ตามลำดับช่อง
    for ch_num, pin in _CHANNELS.items():
        gpio_num = gpio_pins[ch_num - 1]
        status = "ปิด" if digital_read(pin) else "เปิด"  # กลับ logic เพราะ Active Low
        print(f"  ช่อง {ch_num} (GPIO{gpio_num}): {status}")

def sequence_on(delay=1):
    """เปิด relay ทีละช่องตามลำดับ พร้อมหน่วงเวลา"""
    for ch in range(1, 5):
        on(ch)
        wait(delay)

def sequence_off(delay=1):
    """ปิด relay ทีละช่องตามลำดับ พร้อมหน่วงเวลา"""
    for ch in range(1, 5):
        off(ch)
        wait(delay)
