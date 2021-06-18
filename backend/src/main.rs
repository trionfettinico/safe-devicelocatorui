#![feature(proc_macro_hygiene, decl_macro)]
#![feature(in_band_lifetimes)]

mod map;

static CITY_LAT: f32 = 43.5219801;
static CITY_LON: f32 = 13.2443764;

use rocket::response::NamedFile;

use rocket::response::status::NotFound;


use std::env;

#[macro_use]
extern crate rocket;

#[get("/<lat>/<lng>")]
fn index(lat: f32, lng: f32) -> Result<NamedFile, NotFound<String>> {
    map::zip(lat,lng);
    let path = map::get_dir();
    NamedFile::open(&path).map_err(|e| NotFound(e.to_string()))
}

#[tokio::main]
async fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 1 && args[1] == "init" {
        map::download_map(CITY_LAT, CITY_LON).await;
    }

    rocket::ignite().mount("/", routes![index]).launch();
}
