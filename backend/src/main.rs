#![feature(proc_macro_hygiene, decl_macro)]
#![feature(in_band_lifetimes)]

mod map;
mod city_api;
mod config;
mod data;

use rocket::response::NamedFile;
use rocket::response::status::NotFound;
use std::env;
use std::fs::DirEntry;
use std::io::Error;
use std::path::Path;
use crate::city_api::CityInfo;
use crate::config::AppConfig;
use rocket::response::content::Json;
use json::JsonValue;
use crate::data::is_up_to_date;
use rocket::http::Method;
use rocket_cors::{Cors, AllowedOrigins, CorsOptions, AllowedHeaders};

#[macro_use]
extern crate rocket;

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost",
    ]);

    CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&[
            "Authorization",
            "Accept",
            "Access-Control-Allow-Origin",
        ]),
        allow_credentials: false,
        ..Default::default()
    }
        .to_cors()
        .expect("error while building CORS")
}

#[get("/download/<city_name>")]
fn download(city_name: String) -> Result<NamedFile, NotFound<String>> {
    let path = data::get_tiles_dir().join(Path::new(&format!("{}.zip",city_name)));
    NamedFile::open(&path).map_err(|e| NotFound(e.to_string()))
}
#[get("/list/available")]
fn list() -> Json<String> {
    let available_cities = data::get_available_cities();
    let json_vec: Vec<JsonValue> = available_cities.iter().map(|e| { JsonValue::String(e.to_owned()) }).collect();
    let available_cities_json = JsonValue::Array(json_vec);
    Json(available_cities_json.to_string())
}

#[tokio::main]
async fn main() {
    let args: Vec<String> = env::args().collect();
    //TODO si possono rimettere le cartelle dei tiles come erano prima
    if args.len() == 1 {
        rocket::ignite().mount("/", routes![download,list]).attach(make_cors()).launch();
    } else if args.len() == 2 && args[1] == "init" {
        let config = AppConfig::load();
        for city_name in config.cities{
            match CityInfo::get_for(city_name.to_owned(),config.api_key.to_owned()).await {
                Ok(city_info) => {
                    if is_up_to_date(city_info.simple_name.to_owned()) {
                        println!("Map for '{}' is already up to date", city_info.complete_name);
                    }else{
                        println!("Downloading map for '{}'", city_info.complete_name);
                        map::download_map(city_info.bounds,config.min_zoom,config.max_zoom).await;
                        map::zip(city_info.simple_name.as_str());
                        println!("Done.");
                    }
                },
                Err(e) => println!("{}", e.message)
            }
        }
    } else {
        //print usage
        println!("Usage: backend init : downloads the map for all the cities specified in the config file\n       backend : starts the server");
    }

}
