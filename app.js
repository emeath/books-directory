let http = require('http');
let url = require('url');
let fs = require('fs');

function readJsonFile() {
    return new Promise(resolve => {
        fs.readFile('books.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                return resolve(data);
            }
        })
    })
}

async function ler() {
    let dados = await readJsonFile();
    return dados;
}

function myRouter(route) {
    if (route == "/api/books") {
        let dadosLidos = ler();
        return dadosLidos.toString();
    } else {
        return ":)";
    }
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const q = url.parse(req.url, true).query;

    res.write(myRouter(req.url))

    res.write('\n\nHello World!');

    res.end();
}).listen(1234);