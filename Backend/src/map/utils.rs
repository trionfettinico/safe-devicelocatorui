use std::path::{PathBuf, Path};
use directories::ProjectDirs;

pub fn get_data_dir() -> PathBuf {
    let proj_dirs = ProjectDirs::from("it", "Safe", "SafeMap");
    return match proj_dirs {
        Some(dirs) => dirs.data_local_dir().to_path_buf(),
        None => Path::new("tiles/").to_path_buf()
    }
}