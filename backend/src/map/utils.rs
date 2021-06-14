use std::path::{PathBuf, Path};
use std::fs;
use directories::ProjectDirs;

pub fn get_data_dir() -> PathBuf {
    let proj_dirs = ProjectDirs::from("it", "Safe", "SafeMap");
    return match proj_dirs {
        Some(dirs) => dirs.data_local_dir().to_path_buf(),
        None => Path::new("tiles/").to_path_buf()
    }
}

pub fn create_directory(path:String) -> std::io::Result<()> {
    let mut path_folder = get_data_dir().clone();
    path_folder = path_folder.join(path);
    fs::create_dir(path_folder)?;
    Ok(())
}

pub fn remove_directory() -> std::io::Result<()> {
    fs::remove_dir_all("./static/temporary")?;
    Ok(())
}