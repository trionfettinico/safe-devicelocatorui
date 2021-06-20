use std::collections::HashSet;
use reqwest::Client;
use reqwest::header::{HeaderMap, USER_AGENT};
use std::path::Path;
use bytes::Bytes;
use crate::map::TileCoords;
use futures::{stream, StreamExt};
use crate::map::utils::get_data_dir;
use walkdir::WalkDir;

const PARALLEL_REQUESTS: usize = 128;

pub async fn get_map_tiles(coordinates: HashSet<TileCoords>){
    let client = Client::new();
    let bodies = stream::iter(coordinates)
        .map(|coords| {
            let client = client.clone();
            tokio::spawn(async move {
                let url = format!("http://tile.thunderforest.com/cycle/{}/{}/{}.png",coords.zoom, coords.x, coords.y);
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

    let output_dir = get_data_dir();

    bodies
        .for_each(|b| async {
            match b {
                Ok(Ok((b, c))) => save_image(c, b, &output_dir),
                Ok(Err(e)) => eprintln!("Got an error: {}", e),
                Err(e) => eprintln!("Got an error: {}", e)
            }
        })
        .await;
}

fn save_image(coords: TileCoords, res: Bytes, output_dir: &Path) {
    let path = output_dir.join(String::from(format!("temp/{}_{}_{}.png", coords.zoom, coords.x, coords.y)));
    std::fs::create_dir_all(path.parent().unwrap()).unwrap();
    std::fs::write(&path, res.as_ref()).unwrap();
}

pub fn get_percent(total: usize) -> f32 {
    let count :f32= WalkDir::new(get_data_dir().join("temp").to_str().unwrap()).into_iter().count() as f32;
    let percent = count / (total as f32) * 100.0;
    return percent;
}