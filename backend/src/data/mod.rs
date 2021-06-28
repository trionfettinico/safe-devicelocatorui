use std::path::{PathBuf, Path};
use crate::data::data::{get_city_name_form_filename, remove_directory, get_city_metadata};

mod data;

pub fn get_available_cities() -> Vec<String>{
    let available_cities = get_tiles_dir().read_dir().unwrap();
    available_cities.filter_map(|entry|{
        match entry {
            Ok(e) => Some(get_city_name_form_filename(e.file_name().to_string_lossy().parse().unwrap())),
            _ => None,
        }
    }).collect::<Vec<String>>()
}

pub fn reset_temp_folder() {
    remove_temp_folder();
    create_temp_folder();
}

pub fn is_up_to_date(city_file: String) -> bool{
    //TODO verifica data di download dei tiles
    match get_city_metadata(city_file) {
        Some(metadata) => {
            data::is_up_to_date(metadata)
        },
        None => false
    }
}

pub fn get_data_dir() -> PathBuf {
    data::get_data_dir()
}

pub fn get_tiles_dir() -> PathBuf {
    data::get_data_dir().join(Path::new("tiles"))
}

pub fn create_temp_folder() -> std::io::Result<()> {
    data::create_directory(String::from("temp"))
}

pub fn remove_temp_folder() -> std::io::Result<()> {
    remove_directory(String::from("temp"))
}

pub fn create_tiles_directory() {
    data::create_directory("tiles".parse().unwrap());
}