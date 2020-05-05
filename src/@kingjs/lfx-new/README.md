# @[kingjs][@kingjs]/[lfx][ns0]
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

## Link
Given the pointer file to link:
  - if the MD5 hash of the compressed file is missing
    - REQUEST download and update the pointer with the hash
  - if `.lfx-cache/decompressed/[MD5]` is missing
    - REQUEST decompression of the pointer file
  - link `./target/android/android-15` to `.lfx-cache/decompressed/[MD5]`

## Decompress
Given the pointer file to decompress:
  - get the MD5 hash from the pointer file
  - if `.lfx-cache/compressed/[MD5]` is missing
    - REQUEST downloading of the pointer file
  - decompress `.lfx-cache/compressed/[MD5]` to `.lfx-cache/decompressed/[MD5]`

## Download
Given the pointer file to download:
  - download the file to `.lfx-cache/staging/android/android-15.json/android-15_05.zip`
  - compute MD5 hash
  - if `.lfx-cache/compressed/[MD5]` is missing copy the staged file there
  - return the MD5 hash

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/lfx
```

## Source
https://repository.kingjs.net/lfx
## License
MIT

![Analytics](https://analytics.kingjs.net/lfx)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/lfx
