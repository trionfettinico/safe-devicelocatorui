use std::collections::HashSet;
use std::hash::{Hash, Hasher};
use crate::device::Device;

impl PartialEq for Device{
    fn eq(&self, other: &Self) -> bool {
        return self.id == other.id;
    }
}
impl Eq for Device{}
impl Hash for Device{
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
    }
}

pub(crate) fn get_devices() -> HashSet<Device>{
    let mut devices = HashSet::new();
    devices.insert(create_device(0,43.144118,13.060696));
    devices.insert(create_device(1, 43.145463,13.067670));
    devices.insert(create_device(2, 43.143224,13.080657));
    devices.insert(create_device(3, 43.149503,13.063626));
    return devices;
}

fn create_device(_id: i32, _lat: f32, _lon: f32) ->Device{
    return Device{id:_id, name:"device", status:true, lat:_lat, lon:_lon};
}