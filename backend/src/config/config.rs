use crate::config::AppConfig;

pub fn load_from_disk() -> AppConfig {
    let config: AppConfig = match confy::load("safe-backend") {
        Ok(cfg) => cfg,
        Err(e) => {
            store_default();
            AppConfig::default()
        }
    };
    if config.to_owned().is_default() {
        store_default();
        println!("ATTENZIONE: non era presente un file di configurazione (o conteneva errori) perciò ne è stato creato uno con valori di default");
    }
    config
}

pub fn store_on_disk(config: AppConfig){
    confy::store("safe-backend", config);
}

fn store_default(){
    let cfg = AppConfig::default();
    confy::store("safe-backend", cfg);
}