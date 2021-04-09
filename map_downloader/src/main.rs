mod map;
mod device;

static CITY_LAT: f32= 43.140360;
static CITY_LON: f32= 13.068770;

#[tokio::main]
async fn main() {
    map::download_map(CITY_LAT,CITY_LON).await;
}
