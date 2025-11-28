// Основной модуль
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { svgSprites } from './gulp/tasks/svgSprites.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

plugins.dotenv.config();

// Передаем значение в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
};

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const fontsWatcher = gulp.series(otfToTtf, ttfToWoff, fontsStyle, scss);

// Создаем наблюдатель за изменениями в файлах
const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.svgicons, svgSprites);
    gulp.watch(path.watch.fonts, fontsWatcher);
}



// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgSprites));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);


// Экспорт сценариев
export {dev};
export {build};

// Выполнение сценария по умолчанию
gulp.task('default', dev);


