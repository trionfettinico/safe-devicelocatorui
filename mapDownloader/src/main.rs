extern crate reqwest;
extern crate tokio;
use reqwest::header::{USER_AGENT, HeaderMap};
use std::fs::File;
use std::io::prelude::*;
use std::fs;
use std::path::{PathBuf, Path};
use std::error::Error;
use image::{DynamicImage, ImageBuffer, ImageFormat};
use reqwest::{Request, Response, Client};
use std::borrow::Borrow;

static MIN_LAT:f64=43.153;
static MAX_LAT:f64=43.112;
static MIN_LON:f64=13.028;
static MAX_LON:f64=13.098;
pub const PI: f64 = 3.14159265358979323846264338327950288f64; // 3.1415926535897931f64

#[tokio::main]
async fn main() {

    for z in 15..21{

        let (min_x,min_y) = deg2num(MIN_LAT,MIN_LON,z);

        let (max_x,max_y) = deg2num(MAX_LAT,MAX_LON,z);

        println!("downloading zoom = {}",z);

        for _x in min_x..max_x{
            for _y in min_y..max_y{
                let path = String::from("https://a.tile.openstreetmap.org/");
                let xyz = &[path,z.to_string(),"/".to_string(),_x.to_string(),"/".to_string(),_y.to_string(),".png".to_string()].concat();
                println!("ora tocca a = {}_{}_{}.png",z,_x,_y);
                let client = reqwest::blocking::Client::new();
                let mut headers = HeaderMap::new();
                headers.insert(USER_AGENT,"User-Agent', 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0".parse().unwrap());
                let resp = client.get(xyz).headers(headers).send().unwrap().bytes();
                let path2 = format!("tiles/{}_{}_{}.png",z,_x,_y);
                let path3 = std::path::Path::new(&path2);
                let prefix = path3.parent().unwrap();
                std::fs::create_dir_all(prefix).unwrap();
                std::fs::write(&path2, resp.unwrap()).unwrap();
            }
        }
    }
}

// fn createFile(z:i32,x:i32,y:i32,res:bytes::Bytes ){
//     let path = format!("tiles/{}_{}_{}.png",z,x,y);
//     let path2 = std::path::Path::new(&path);
//     let prefix = path2.parent().unwrap();
//     std::fs::create_dir_all(prefix).unwrap();
//     match image::load_from_memory_with_format(res.as_ref(), ImageFormat::Png) {
//         Ok(img) => {
//             println!("input in png");
//             std::fs::write(&path, img.as_bytes()).unwrap();
//         }
//         Err(_) => {
//             println!("input is not png");
//         }
//     }
// }

// fn gottem(url:&str) -> Result<bytes::Bytes, reqwest::Error> {
//     let client = reqwest::blocking::Client::new();
//     let resp = client.get(url).send()?.bytes()?;
//     Ok(resp)
// }

fn deg2num(lat_deg:f64,lon_deg:f64,_zoom:i32)->(i32,i32){
    let lat_rad = lat_deg.to_radians();
    let mut n:f64 = 2.00;
    n = n.powi(_zoom);
    let x_tile = ((lon_deg + 180.0)/360.0 * n) as i32;
    let y_tile = ((1.0 - ((lat_rad.tan()).asinh()) /  PI) / 2.0 * n) as i32;
    return (x_tile,y_tile);
}