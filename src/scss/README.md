# SCSS codeguide

## :zap: Блоки
* Для каждого блока стили должны находиться в  ``` src/blocks/modules/***/***.scss ``` например ``` src/blocks/modules/header/header.scss ```.
* Каждый блок нужно импортировать в ``` src/blocks/modules/_modules.scss ``` так: ```@import "header/header";```.
* Глобальные стили должны находиться в  ``` src/scss/base/_global.scss ```.
* Переменные, примеси и функции находятся в  ``` src/scss/helpers/_*.scss ```.
* Стили для плагинов должны находиться в  ``` src/scss/vendor/import/ ```. Для подключения стилей плагинов нужно создать файл ``` plugin_name.scss ```, вставить в него код стилей плагина и импортировать его в ``` src/scss/vendor/_libs.scss```

## :zap: Функции
* Функция перевода px в vw
```
@function vw($target) {
    $vw-result: math.div($target * 100, 1920) * 1vw;
    @return $vw-result;
}
```
* Вызывается так: ```width: vw(20);```

## :zap: Переменные
* Все цвета должны быть вынесены в переменные, оттенки цветов должны быть вычислены с помощью [Специальных функций](https://sass-lang.com/documentation/modules/color)



## :zap: Префиксы
* Все классы для стилей должны иметь префикс osm
* Например (HTML): ``` <span class="osm-span__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, soluta.</span> ```
* Например (SCSS): ``` .osm-span { &__text { color: #000; } } ```