mod config;

use serde::{Serialize, Deserialize};
use crate::config::config::{load_from_disk, store_on_disk};

#[derive(Serialize, Deserialize, Clone, Eq, PartialEq)]
pub struct AppConfig {
    pub cities: Vec<String>,
    pub min_zoom: i32,
    pub max_zoom: i32,
    pub api_key: String,
}

impl ::std::default::Default for AppConfig {
    fn default() -> Self { Self { cities: Vec::new(), api_key: "".into(), min_zoom: 15, max_zoom: 18 } }
}

impl AppConfig {
    pub fn load() -> AppConfig {
        load_from_disk()
    }

    pub fn store(self) {
        store_on_disk(self);
    }

    pub fn is_default(self) -> bool{
        self == AppConfig::default()
    }
}