use std::collections::HashSet;
use reqwest::Client;
use reqwest::header::{HeaderMap, USER_AGENT};
use std::path::{PathBuf, Path};
use directories::ProjectDirs;
use bytes::Bytes;
use crate::map::TileCoords;
use futures::{stream, StreamExt};

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

    let output_dir = get_output_dir();

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

fn get_output_dir() -> PathBuf {
    let proj_dirs = ProjectDirs::from("it", "Safe", "SafeMap");
    return match proj_dirs {
        Some(dirs) => dirs.data_local_dir().to_path_buf(),
        None => Path::new("tiles/").to_path_buf()
    }
}

fn save_image(coords: TileCoords, res: Bytes, output_dir: &Path) {
    let path = output_dir.join(String::from(format!("tiles/{}/{}/{}.png", coords.zoom, coords.x, coords.y)));
    std::fs::create_dir_all(path.parent().unwrap()).unwrap();
    println!("writing {}_{}_{}.png",coords.zoom, coords.x, coords.y);
    std::fs::write(&path, res.as_ref()).unwrap();
}