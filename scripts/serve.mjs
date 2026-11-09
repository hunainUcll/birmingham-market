import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
const prefix=process.env.PREVIEW_BASE_PATH || ''; 
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost'); if(prefix && url.pathname==='/'){res.writeHead(302,{Location:prefix+'/'}).end();return;} const pathname=prefix && (url.pathname===prefix || url.pathname.startsWith(prefix+'/')) ? url.pathname.slice(prefix.length)||'/' : url.pathname; let file=path.resolve(root,'.'+decodeURIComponent(pathname)); if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;} if((await stat(file)).isDirectory())file=path.join(file,'index.html'); const bytes=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}});
const port=Number(process.env.PORT || 3010);
server.listen(port,'127.0.0.1',()=>console.log(`Birmingham Market preview: http://127.0.0.1:${port}${prefix}/`));
