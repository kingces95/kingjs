var { 
  fs: { promises: fsPromises },
  uuid: { v4: uuid },
  path: Path, 
  url: Url,
} = module[require('@kingjs-module/dependencies')]();

var DirNames = {
  downloads: '.downloads',
  compressed: '.compressed',
  decompressed: '.decompressed',
  target: '.target',
}

var Dot = '.';
var DotJson = Dot + 'json';
var Encoding = { encoding: 'utf8' }

/**
 * path - path to info file
 * url - compressed file url
 * 
 * downloads - path to download file; will be published to `compressed`
 * compressed - path to compressed file; will be inflated to `decompressed`
 * decompressed - path to decompressed file
 * 
 * contentLength - compressed file size
 * downloadedLength - compressed bytes downloaded
 * hash - MD5 hash of compressed file
 */
class Info {
  static async create(path) {
    var result = new Info(path);

    var json = JSON.parse(await fsPromises.readFile(path, Encoding));
    for (var name in json)
      result[name] = json[name];

    return result;
  }

  constructor(path) {
    this.path = path;
    this.source = Path.join(DirNames.target, Path.basename(path, DotJson));
    this.uuid = uuid();
  }
  get name() { 
    if (!this.url)
      return;
    return Url.parse(this.url).pathname;
  }
  get nameUuid() { 
    return this.uuid + this.ext;
  }
  get nameHash() { 
    if (!this.hash)
      return;
    return this.hash + this.ext;
  }
  get ext() {
    if (!this.name)
      return;
    return Path.extname(this.name);
  }
  get downloaded() { 
    return Path.join(DirNames.downloads, this.nameUuid);
  }
  get compressed() { 
    if (!this.hash)
      return;
    return Path.join(DirNames.compressed, this.nameHash);
  }
  get decompressedUuid() { 
    return Path.join(DirNames.decompressed, this.nameUuid);
  }
  get decompressed() { 
    if (!this.hash)
      return;
    return Path.join(DirNames.decompressed, this.nameHash);
  }
}

module.exports = Info;