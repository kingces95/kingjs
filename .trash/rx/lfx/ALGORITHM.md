# Algorithm
Download, caches, and extracts urls described in JSON "pointer" 
files found in `source` and its subdirectories into corresponding 
subdirectory of `target`.

## Pointer Files
A pointer file is a JSON file that describes from where a compressed file
can be downloaded and how it can be decompressed. For example, a pointer file for `android-15` SDK zip looks like this:
```json
{
  "url": "http://dl.google.com/android/repository/android-15_r05.zip#android-4.0.4"
}
```
Assuming the above pointer file is located at `./source/android/android-15.json` then running
```
$lfx source target
```
Will set the cache root directory to  
  - the environment variable `LFX_CACHE_DIR` if defined
  - the `cacheDir` property in `.lfx-config` found in the `cwd` or its parents
  - the default value `.lfx-cache`

Then execute the poset for each file found in source:

## Initialize
  - erase `[ROOT]/staging`

## Reflect
  - join pointer files in `target` with links in `source` to create an array
  of pointer objects with `source` and `target` properties for either or both.
  - for those pointers objects with `source`, expand the contents of pointer file into the pointer object.

## Scorch
Given the pointer objects:
  - if a dry run, then RETURN
  - erase every pointer with only a `target` and no `source`.

## Link
Given the pointer file to link:
  - if no `target` RETURN
  - REQUEST DECOMPRESS
  - expect `hash`, `compressed`, `decompressed`
  - if dry run, then BLOCK
  - LINK `target` to `decompressed`

## Decompress
Given the pointer object to decompress:
  - REQUEST DOWNLOAD
  - expect `hash`, `compressed`
  - if dry run, then BLOCK
  - unzip `[ROOT]/compressed/[MD5]` to `[ROOT]/decompressed/[MD5]`
  - add `decompressed`

## Download
Given the pointer object to download:
  - if `hash` is missing, or `[ROOT]/compressed/[MD5]` is missing, or `force`
    - if dry run, then BLOCK
    - DOWNLOAD the file to `[ROOT]/staged/android/android-15.json/android-15_05.zip`
    - add/update `hash`
    - flush the pointer object to disk
    - if `[ROOT]/compressed/[MD5]` is missing
      - copy the staged file to `[ROOT]/compressed/[MD5]`
  - add `compressed`
