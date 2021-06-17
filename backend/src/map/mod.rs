use crate::map::coordinates::get_range;
use crate::map::utils::get_data_dir;
use futures::stream::ReadyChunks;
use futures::StreamExt;
use std::borrow::Borrow;
use std::fs;
use std::ops::Add;
use std::path::{Path, PathBuf};
use std::sync::mpsc::{channel, Receiver, Sender};
use std::thread::{sleep, spawn, JoinHandle};
use std::time::Duration;
use walkdir::WalkDir;

mod coordinates;
mod tiles;
mod utils;
mod zip;

#[derive(Eq, PartialEq, Hash)]
pub struct TileCoords {
    pub zoom: i32,
    pub x: i32,
    pub y: i32,
}

pub async fn download_map(lat: f32, lon: f32) {
    println!("Getting devices");
    println!("Generating tiles coordinates");
    let coordinates = coordinates::get_tiles_coordinates(lat, lon);
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

pub fn zip(lat: String, lng: String) {
    create_dir("copy".to_string());
    copy_tiles(lat, lng);
    let mut path = get_dir();
    path.pop();
    path = path.join("tiles");
    // if (WalkDir::new(path).into_iter().count() != 59) {
        println!("Zipping files");
        zip::zip_tiles();
        println!("Done.");
    // }
}

pub fn copy_tiles(lat: String, lng: String) {
    let coord_lat = lat.parse::<f32>().unwrap();
    let coord_lng = lng.parse::<f32>().unwrap();
    let mut path = PathBuf::new();
    path = path.join(get_data_dir().into_os_string().into_string().unwrap());
    path = path.join("tiles");
    let mut path_copy = PathBuf::new();
    path_copy = path_copy.join(get_data_dir().into_os_string().into_string().unwrap());
    path_copy = path_copy.join("copy/tiles");
    create_dir("copy/tiles".to_string());
    for z in 15..21 {
        path = path.join(z.to_string());
        path_copy = path_copy.join(z.to_string());
        let (min_x, min_y) =
            coordinates::deg2num(coord_lat + get_range(), coord_lng - get_range(), z);
        let (max_x, max_y) =
            coordinates::deg2num(coord_lat - get_range(), coord_lng + get_range(), z);
        for _x in min_x..max_x {
            path = path.join(_x.to_string());
            path_copy = path_copy.join(_x.to_string());
            for _y in min_y..max_y {
                path = path.join(_y.to_string() + ".png");
                path_copy = path_copy.join(_y.to_string() + ".png");
                let mut var: String = "/copy/tiles/".to_string();
                let mut app = get_data_dir().into_os_string().into_string().unwrap();
                var.push_str(&*z.to_string());
                app.push_str(&*var);
                create_dir(app);
                var.push_str(&*"/".to_string());
                var.push_str(&*_x.to_string());
                let mut app = get_data_dir().into_os_string().into_string().unwrap();
                app.push_str(&*var);
                create_dir(app);
                fs::copy(
                    path.as_path().display().to_string(),
                    path_copy.as_path().display().to_string(),
                );
                path.pop();
                path_copy.pop();
            }
            path.pop();
            path_copy.pop();
        }
        path.pop();
        path_copy.pop();
    }
}

pub fn get_dir() -> PathBuf {
    return utils::get_data_dir().join(Path::new("copy/tiles.zip"));
}

pub fn create_dir(path: String) {
    utils::create_directory(path);
}

pub fn remove_dir() {
    utils::remove_directory();
}
