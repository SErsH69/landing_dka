# JavaScript codeguide

## :zap: Зависимости
```
├── vue
└── jquery
```
## :zap: Инициализация
* В файле ``` src/js/app.js ``` нужно имортировать зависимость:
  * ``` import Vue from 'vue/dist/vue.js'; ```
* Там же нужно создать экземпляр ``` Vue ```:
```
window.app = new Vue({
    el: '#app',
    data: () => ({
        isMounted: false
    }),
    mounted() {
        this.isMounted = true;
    }
});
```
* Все страницы должны быть обернуты в элемент с ```id="app"```, к тегу ```body``` этот id добавлять нельзя

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.

## :open_file_folder: Модули
* Для каждого блока должен существовать отдельный js файл в ``` src/blocks/modules/***/***.js ```, например ``` src/blocks/modules/header/header.js ``` 
* Код для блоков должен быть в виде:
```
const Header = class Header {
    constructor(someVareible){
        this.someVareible = someVareible;
    }
    someMethod() {
        console.log(this.someVareible);
    }
    init() {
        this.someMethod();
    }
}

export default Header;
```
* Обязательно должен быть метод ``` init ``` у каждого модуля, который запускает весь код модуля.
* В файле ``` src/js/app.js ``` импортируем модуль, создаем экземпляр класса и вызываем метод ``` init ```;
```
import Vue from 'vue/dist/vue.js';
import $ from 'jquery';

import Header from '../blocks/modules/header/header.js';


window.app = new Vue({
    el: '#app',
    data: () => ({
        isMounted: false,
        header: new Header({
            someVareible: 'someVareible'
        })
    }),
    mounted() {
        this.isMounted = true;
        this.header.init();
    }
});
```


## :keyboard: Свойства классов
* Свойства в конструктор передаем в виде объекта, для того, чтобы при создании экземпляра было понятно какой параметр за что отвечает, пример:
```
constructor({ someVareible }){
    this.someVareible = someVareible;
}
```
* При создании экземпляра код выглядит так:
```
new Header({
    someVareible: 'someVareible'
})
```

## :keyboard: Методы классов
* Методы классов должны соответствовать парадигме "Один метод - одно действие".