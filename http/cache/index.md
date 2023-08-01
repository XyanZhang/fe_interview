# 什么是HTTP缓存？

HTTP缓存是指在客户端（浏览器）或者服务器端缓存HTTP请求和响应的过程。通过缓存，可以减少网络传输的数据量，提高网站的访问速度和性能。

## HTTP缓存的分类

HTTP缓存可以分为两种类型：强缓存和协商缓存。

+ 强缓存是指在缓存期内，客户端直接从缓存中获取资源，而不会向服务器发送请求。强缓存可以通过设置HTTP响应头中的Expires和Cache-Control字段来实现。
+ 协商缓存是指在缓存期过期后，客户端向服务器发送请求，服务器会根据请求头中的If-Modified-Since和If-None-Match字段来判断资源是否有更新，如果没有更新，则返回304 Not Modified状态码，客户端从缓存中获取资源。协商缓存可以通过设置HTTP响应头中的Last-Modified和ETag字段来实现。

## HTTP缓存的优缺点

+ HTTP缓存的优点是可以减少网络传输的数据量，提高网站的访问速度和性能，同时也可以减轻服务器的负担。
+ HTTP缓存的缺点是可能会导致缓存不一致的问题，即客户端缓存的资源和服务器上的资源不一致，需要通过一些手段来解决，比如版本号控制、缓存策略等。

## HTTP缓存的实现方式

HTTP缓存可以通过设置HTTP响应头中的Expires、Cache-Control、Last-Modified和ETag字段来实现。具体实现方式可以参考以下代码：

```javascript
// 设置强缓存
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
```
