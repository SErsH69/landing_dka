export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 1);
        };
        webP.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=="
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

export function transferItems() {
    if (!document.querySelector('[data-transfer-to]')) return;


    
    
    if (window.innerWidth < 1025) {
        document.querySelectorAll('[data-transfer-to]').forEach(item => {
            if (item.closest('.general__append_wrap') && !item.parentNode.classList.contains(item.dataset.transferTo)) {
                console.log(item.closest('.general__append_wrap').querySelector(`.${item.dataset.transferTo}`));
                item.closest('.general__append_wrap').querySelector(`.${item.dataset.transferTo}`).appendChild(item);
            }
            if (document.querySelector(`.${item.dataset.transferTo}`) && !item.parentNode.classList.contains(item.dataset.transferTo)) {
                document.querySelector(`.${item.dataset.transferTo}`).appendChild(item);
            }
            // console.log(document.querySelecto    r(`.${item.dataset.transferTo}`));
        })
    } else {
        document.querySelectorAll('[data-transfer-to]').forEach(item => {
            if (item.closest('.general__append_wrap') && !item.parentNode.classList.contains(item.dataset.transferBack)) {
                console.log(item.closest('.general__append_wrap').querySelector(`.${item.dataset.transferBack}`));
                item.closest('.general__append_wrap').querySelector(`.${item.dataset.transferBack}`).appendChild(item);
            }
            if (document.querySelector(`.${item.dataset.transferBack}`) && !item.parentNode.classList.contains(item.dataset.transferBack)) {
                document.querySelector(`.${item.dataset.transferBack}`).appendChild(item);
            }
            // console.log(document.querySelector(`.${item.dataset.transferTo}`));
        })
    }

}

export function addTabsChangeHandler({openerDataSelector = 'tab-id', tabDataSelector = 'tab-body'}) {
    if (!document.querySelector(`[data-${openerDataSelector}]`) || !document.querySelector(`[data-${tabDataSelector}]`)) return;

    document.querySelectorAll(`[data-${openerDataSelector}]`).forEach(opener => {
        let camelCaseId = openerDataSelector.replace(/-./g, m => m.toUpperCase()[ 1 ])
        let selector = `[data-${tabDataSelector}="${opener.dataset[camelCaseId]}"]`;

        if (opener.classList.contains('isActive')) {
            document.querySelector(selector).classList.add('isActive');
        }
        
        opener.addEventListener('click', (e) => {
            

            if (document.querySelector(selector)) {
                document.querySelector(`[data-${openerDataSelector}].isActive`).classList.remove('isActive');
                document.querySelector(`[data-${tabDataSelector}].isActive`).classList.remove('isActive');
                
                e.currentTarget.classList.add('isActive')
                document.querySelector(selector).classList.add('isActive');
            }
            
        })
    })
}

export function addTabsSelectChangeHandler({openerDataSelector = '.tabs__select', tabDataSelector = 'tab-body'}) {
    if (!document.querySelector(openerDataSelector) || !document.querySelector(`[data-${tabDataSelector}]`)) return;
    // document.querySelector(`[data-${tabDataSelector}]`).classList.add('isActive');
    document.querySelectorAll(openerDataSelector).forEach(opener => {
        opener.addEventListener('change', (e) => {
            
            let value = opener.value;
            let selector = `[data-${tabDataSelector}="${value}"]`;
            console.log(value, selector);
            if (document.querySelector(selector)) {
                document.querySelector(`[data-${tabDataSelector}].isActive`).classList.remove('isActive');
                
                document.querySelector(selector).classList.add('isActive');
            }
            
        })
    })
}


export function addReadAllHandler() {

    if (!document.querySelector('.read_all_button')) return;

    document.querySelectorAll('.read_all_button').forEach(button => {
        button.addEventListener('click', function() {
            if (document.querySelector(button.dataset.target)) {
                document.querySelector(button.dataset.target).classList.toggle('isOpened')
            }
        })
    })

}
