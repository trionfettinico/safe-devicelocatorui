#![feature(proc_macro_hygiene, decl_macro)]

mod map;
mod device;

static CITY_LAT: f32= 43.619640;
static CITY_LON: f32= 13.382522;

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[tokio::main]
async fn main() {
    //rocket::ignite().mount("/", routes![index]).launch();
    map::download_map(CITY_LAT, CITY_LON).await;
}