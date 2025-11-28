

export const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir:  `${app.path.build.html}`
        },
        notify: true,
        port: process.env.PORT ? process.env.PORT : 3000,
        plugins: ['bs-console-qrcode']
    }, async function(err, bs) {
        if (process.env.NGROK_AUTHKEY) {
            const mainServer = await app.plugins.ngrok.connect({
                proto: 'http', // http|tcp|tls, defaults to http
                addr: bs.options.get('port'), // port or network address, defaults to 80
                authtoken: '1rRQKbm1wNQAhQaiBwD0gHZmCB5_EfLWMZz6UpwbQ9Qsq7oa', // your authtoken from ngrok.com
            });
            console.log(`Ссылка для дуступа извне:`, '\x1b[36m', mainServer, '\x1b[0m');
        } 
    });
}