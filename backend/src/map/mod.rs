use std::thread::{sleep, spawn, JoinHandle};
use std::time::Duration;
use walkdir::WalkDir;
use std::sync::mpsc::{Sender, Receiver, channel};
use std::borrow::Borrow;
use futures::StreamExt;
use futures::stream::ReadyChunks;
use std::path::{PathBuf, Path};


mod coordinates;
mod tiles;
mod utils;
mod zip;

#[derive (Eq, PartialEq, Hash)]
pub struct TileCoords {
    pub zoom: i32,
    pub x: i32,
    pub y: i32
}

pub async fn download_map(lat: f32, lon: f32){
    println!("Getting devices");
    println!("Generating tiles coordinates");
    let coordinates = coordinates::get_tiles_coordinates(lat, lon);
    println!("Downloading map");
    let (tx, rx) = channel();
    let receiver = spawn(move || {
       while rx.try_recv().is_err(){
           println!("{}%", tiles::get_percent());
           sleep(Duration::from_secs(2));
       }
    });
    tiles::get_map_tiles(coordinates).await;
    tx.send(());
    receiver.join();
}

pub fn zip(){
    println!("Zipping files");
    zip::zip_tiles();
    println!("Done.");
}

pub fn get_dir()-> PathBuf{
    return utils::get_data_dir().join(Path::new("tiles.zip"));
}

pub fn createDir(){
    utils::createDirectory();
}

pub fn removeDir(){
    utils::removeDirectory();
}

pub fn copy(){
    utils::copy("./static/prova","./static/tempo");
}
