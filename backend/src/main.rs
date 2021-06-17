#![feature(proc_macro_hygiene, decl_macro)]

mod map;

static CITY_LAT: f32 = 43.146918;
static CITY_LON: f32 = 13.066712;

use rocket::response::NamedFile;

use rocket::response::status::NotFound;


use std::env;

use std::path::Path;

#[macro_use]
extern crate rocket;

#[get("/<lat>/<lng>")]
fn index(lat: String, lng: String) -> Result<NamedFile, NotFound<String>> {
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
