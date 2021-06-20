#![feature(proc_macro_hygiene, decl_macro)]
#![feature(in_band_lifetimes)]

mod map;
mod city_api;
mod config;

use rocket::response::NamedFile;
use rocket::response::status::NotFound;
use std::env;
use std::fs::DirEntry;
use std::io::Error;
use std::path::Path;
use crate::city_api::CityInfo;
use crate::config::AppConfig;

#[macro_use]
extern crate rocket;

#[get("/<city_name>")]
fn index(city_name: String) -> Result<NamedFile, NotFound<String>> {
    let tiles_dir = map::get_dir();
    let available_cities = tiles_dir.read_dir().unwrap();
    let city_found = available_cities.filter_map(|entry|{
        match entry {
            Ok(e) =>{
                let file_name = e.file_name().to_string_lossy().to_ascii_lowercase();
                if file_name.contains(&city_name.to_ascii_lowercase()) {
                    Some(file_name)
                } else {
                    None
                }
            },
            _ => None,
        }
    }).collect::<Vec<String>>();
    match city_found.get(0) {
        Some(s) => {
            let path = map::get_dir().join(Path::new(s));
            NamedFile::open(&path).map_err(|e| NotFound(e.to_string()))
        },
        None => Err(NotFound(format!("La mappa della città '{}' non è stata trovata",city_name)))
    }

}

#[tokio::main]
async fn main() {
    let args: Vec<String> = env::args().collect();
    //TODO si possono rimettere le cartelle dei tiles come erano prima
    //TODO verifica data di download dei tiles (da mettere sulla cartella data)
    if args.len() == 1 {
        rocket::ignite().mount("/", routes![index]).launch();
    } else if args.len() == 2 && args[1] == "init" {
        let config = AppConfig::load();
        for city_name in config.cities{
            match CityInfo::get_for(city_name.to_owned(),config.api_key.to_owned()).await {
                Ok(city_info) => {
                    println!("Downloading map for {}", city_info.complete_name);
                    map::download_map(city_info.bounds,config.min_zoom,config.max_zoom).await;
                    map::zip(city_info.simple_name.as_str());
                    println!("Done.");
                },
                Err(e) => println!("{}", e.message)
            }
        }
    } else {
        //print usage
        println!("Usage: backend init : downloads the map for all the cities specified in the config file\n       backend : starts the server");
    }

}
