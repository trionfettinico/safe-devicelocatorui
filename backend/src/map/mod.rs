use crate::map::utils::get_data_dir;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::mpsc::{channel};
use std::thread::{sleep, spawn};
use std::time::Duration;

mod coordinates;
mod tiles;
mod utils;
mod zip;

#[derive(Eq, PartialEq, Hash, Clone)]
pub struct TileCoords {
    pub zoom: i32,
    pub x: i32,
    pub y: i32,
}

pub async fn download_map(lat: f32, lon: f32) {
    println!("Getting devices");
    println!("Generating tiles coordinates");
    let coordinates = coordinates::get_tiles_coordinates(lat, lon, coordinates::SURROUNDING_RANGE);
    let total = coordinates.len();
    println!("Downloading map");
    let (tx, rx) = channel();
    let receiver = spawn(move || {
        while rx.try_recv().is_err() {
            println!("{}%", tiles::get_percent(total));
            sleep(Duration::from_secs(2));
        }
    });
    tiles::get_map_tiles(coordinates).await;
    tx.send(());
    receiver.join();
}

pub fn zip(lat: f32, lng: f32) {
    println!("Zipping files");
    zip::zip_tiles(lat,lng);
    println!("Done.");
}

pub fn get_dir() -> PathBuf {
    return utils::get_data_dir().join(Path::new("tiles.zip"));
}
