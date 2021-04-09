use std::collections::HashSet;

mod devices;

pub struct Device{
    pub id: i32,
    pub lat: f32,
    pub lon: f32,
    pub name: &'static str,
    pub status: bool
}

pub fn get_devices() -> HashSet<Device>{
    return devices::get_devices();
}