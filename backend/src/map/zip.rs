use crate::map::utils::get_data_dir;
use std::path::{Path, PathBuf};
use zip::write::FileOptions;
use std::io::{Write, Seek};
use std::fs::File;
use zip::result::{ZipError, ZipResult};
use zip::{ZipWriter, CompressionMethod};
use std::io::Error as IOError;
use std::io::ErrorKind as IoErrorKind;
use std::io::copy;
use std::fs;
use std::collections::HashSet;
use crate::map::coordinates;

pub struct RecursiveZipWriter<W: Write + Seek> {
    zip_writer: ZipWriter<W>,
}

impl<W: Write + Seek> RecursiveZipWriter<W> {
    pub fn new(inner: W) -> Self {
        RecursiveZipWriter { zip_writer: ZipWriter::new(inner) }
    }

    fn zip_path(&mut self, real_path: &Path, zip_path: &Path) -> Result<(), ZipError> {
        if real_path.is_file() {
            self.zip_writer
                .start_file(zip_path.to_string_lossy().into_owned(),
                            FileOptions::default().compression_method(CompressionMethod::Stored))?;
            let mut file = File::open(real_path).unwrap();
            copy(&mut file, &mut self.zip_writer)?;
            Ok(())
        } else if real_path.is_dir() {
            for listing in real_path.read_dir().unwrap() {
                let file_name = listing.unwrap().file_name();
                self.zip_path(&real_path.join(&file_name), &zip_path.join(&file_name))
                    .unwrap_or(());
            }
            Ok(())
        } else {
            Err(ZipError::Io(IOError::new(IoErrorKind::InvalidInput,
                                          "Cannot add non file/directory.")))
        }
    }

    pub fn add_path(&mut self, real_path: &Path) -> Result<(), ZipError> {
        self.zip_path(real_path, &Path::new(real_path.file_name().unwrap()))
    }

    pub fn finish(&mut self) -> ZipResult<W> {
        self.zip_writer.finish()
    }
}

pub fn zip_tiles() {
    let mut output_dir = get_data_dir();
    output_dir = output_dir.join("copy");
    let zip_file = std::fs::File::create(output_dir.join(Path::new("tiles.zip"))).unwrap();
    let mut zipper = RecursiveZipWriter::new(zip_file);
    zipper.add_path(&*output_dir.join(Path::new("tiles/"))).unwrap();
    zipper.finish().unwrap();
}