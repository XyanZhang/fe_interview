// 缓存运用 
res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString()); // 缓存1小时
res.setHeader('Cache-Control', 'max-age=3600'); // 缓存1小时

// 设置协商缓存
const lastModified = new Date(fileStat.mtimeMs).toUTCString();
const etag = crypto.createHash('md5').update(fileContent).digest('hex');
res.setHeader('Last-Modified', lastModified);
res.setHeader('ETag', etag);

// 判断是否命中缓存
const ifModifiedSince = req.headers['if-modified-since'];
const ifNoneMatch = req.headers['if-none-match'];
if (ifModifiedSince && ifModifiedSince === lastModified) {
  res.statusCode = 304;
  res.end();
} else if (ifNoneMatch && ifNoneMatch === etag) {
  res.statusCode = 304;
  res.end();
} else {
  // 返回资源
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', fileContent.length);
  res.end(fileContent);
}