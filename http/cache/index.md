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

## HTTP 1.0和 HTTP 1.1 有以下区别：

● 连接方面，http1.0 默认使用非持久连接，而 http1.1 默认使用持久连接。http1.1 通过使用持久连接来使多个 http 请求复用同一个 TCP 连接，以此来避免使用非持久连接时每次需要建立连接的时延。
● 资源请求方面，在 http1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，http1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
● 缓存方面，在 **http1.0** 中主要使用 header 里的 **If-Modified-Since、Expires** 来做为缓存判断的标准，**http1.1** 则引入了更多的缓存控制策略，例如 **Etag、If-Unmodified-Since、If-Match、If-None-Match** 等更多可供选择的缓存头来控制缓存策略。
● http1.1 中新增了 host 字段，用来指定服务器的域名。http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，这样就可以将请求发往到同一台服务器上的不同网站。
● http1.1 相对于 http1.0 还新增了很多请求方法，如 PUT、HEAD、OPTIONS 等。

## HTTP 1.1 和 HTTP 2.0 的区别

● 二进制协议：HTTP/2 是一个二进制协议。在 HTTP/1.1 版中，报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是二进制。**HTTP/2 则是一个彻底的二进制协议**，头信息和数据体都是二进制，并且统称为"帧"，可以分为头信息帧和数据帧。 帧的概念是它实现多路复用的基础。
● 多路复用：HTTP/2 实现了多路复用，HTTP/2 仍然复用 TCP 连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回应，而且不用按照顺序一一发送，这样就避免了"队头堵塞"【1】的问题。
● 数据流：HTTP/2 使用了数据流的概念，因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流。每个数据流都有一个独一无二的编号。数据包发送时，都必须标记数据流 ID ，用来区分它属于哪个数据流。
● 头信息压缩：HTTP/2 实现了头信息压缩，由于 **HTTP 1.1 协议不带状态**，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如 Cookie 和 User Agent ，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面，**客户端和服务器同时维护一张头信息表**，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就能提高速度了。
● 服务器推送：HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。使用服务器推送提前给客户端推送必要的资源，这样就可以相对减少一些延迟时间。这里需要注意的是 http2 下服务器主动推送的是静态资源，和 WebSocket 以及使用 SSE 等方式向客户端发送即时数据的推送是不同的。