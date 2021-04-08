use bytes::Bytes;
use futures::{stream, StreamExt}; // 0.3.5
use reqwest::header::{HeaderMap, USER_AGENT};
use reqwest::{Client}; // 0.10.6
use tokio; // 0.2.21, features = ["macros"]

const PARALLEL_REQUESTS: usize = 128;
static MIN_LAT: f64 = 43.140;
static MAX_LAT: f64 = 43.120;
static MIN_LON: f64 = 13.048;
static MAX_LON: f64 = 13.068;

#[tokio::main]
async fn main() {
    let mut coordinates = Vec::new();

    for z in 15..23 {
        let (min_x, min_y) = deg2num(MIN_LAT, MIN_LON, z);
        let (max_x, max_y) = deg2num(MAX_LAT, MAX_LON, z);
        for _x in min_x..max_x {
            for _y in min_y..max_y {
                coordinates.push([z, _x, _y]);
            }
        }
    }

    get_map_tiles(coordinates).await;
}

async fn get_map_tiles(coordinates: Vec<[i32;3]>){
    let client = Client::new();
    let bodies = stream::iter(coordinates)
        .map(|coords| {
            let client = client.clone();
            tokio::spawn(async move {
                let url = format!("https://a.tile.openstreetmap.org/{}/{}/{}.png",coords[0], coords[1], coords[2]);
                let mut headers = HeaderMap::new();
                headers.insert(USER_AGENT,"User-Agent', 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0".parse().unwrap());
                let resp = client.get(url.as_str()).headers(headers).send().await?;
                match resp.bytes().await {
                    Ok(b) => Ok((b,coords)),
                    Err(e) => Err(e),
                }
            })
        })
        .buffer_unordered(PARALLEL_REQUESTS);

    bodies
        .for_each(|b| async {
            match b {
                Ok(Ok((b, c))) => save_image(c[0], c[1], c[2], b),
                Ok(Err(e)) => eprintln!("Got an error: {}", e),
                Err(e) => eprintln!("Got an error: {}", e)
            }
        })
        .await;
}

fn deg2num(lat_deg: f64, lon_deg: f64, _zoom: i32) -> (i32, i32) {
    let lat_rad = lat_deg.to_radians();
    let mut n: f64 = 2.00;
    n = n.powi(_zoom);
    let x_tile = ((lon_deg + 180.0) / 360.0 * n) as i32;
    let y_tile = ((1.0 - ((lat_rad.tan()).asinh()) / std::f64::consts::PI) / 2.0 * n) as i32;
    return (x_tile, y_tile);
}

fn save_image(z: i32, x: i32, y: i32, res: Bytes) {
    let path = format!("tiles/{}_{}_{}.png", z, x, y);
    let path2 = std::path::Path::new(&path);
    let prefix = path2.parent().unwrap();
    std::fs::create_dir_all(prefix).unwrap();
    println!("writing {}_{}_{}.png", z, x, y);
    std::fs::write(&path, res.as_ref()).unwrap();
}
