new WOW().init();

let cardWrapper = document.querySelector('.card-wrapper');
let modalWrapper = document.querySelector('.modal-wrapper');
let navItems = Array.from(document.querySelectorAll('.navbar')[1].children);

document.addEventListener('click', (event) => {
    if (event.target.matches('.info-card')) {
        let modalInfo = Array.from(event.target.parentElement.children);
        clonedModalInfo = modalInfo[modalInfo.length - 1].cloneNode(true);
        clonedModalInfo.classList.remove('d-none');
        modalBody.innerHTML = '';
        modalBody.append(clonedModalInfo);
        myModal.show();
    }
});

const fetchJSONFile = (path, callback) => {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
};

const dynamicCardRendering = (objectArray) => {
    objectArray.forEach((obj) => {
        let cardSection = document.createElement('div');

        objectArray.length <= 10
            ? cardSection.classList.add('col-md-4')
            : cardSection.classList.add('col-lg-3', 'col-md-4');

        cardSection.classList.add('p-1', 'col-sm-6');

        let card = document.createElement('div');

        let modalContent = document.createElement('div');
        modalContent.classList.add('container-fluid');
        let row = document.createElement('div');
        row.classList.add('row');

        const keyValueArr = Object.entries(obj);

        // Card Header
        const header = document.createElement('div');
        header.classList.add(
            'd-flex',
            'justify-content-between',
            'w-85',
            'mx-auto',
            'pb-3'
        );

        const cardNumber = document.createElement('span');
        cardNumber.innerText = `#${keyValueArr[0][1]}`;
        cardNumber.classList.add('bigger-size');
        const timeScale = document.createElement('span');
        timeScale.classList.add('bolder', 'bigger-size');
        timeScale.innerText = `${keyValueArr[4][1]}`;
        header.append(cardNumber);
        header.append(timeScale);
        card.append(header);

        // Card Body
        const cardName = document.createElement('h4');
        cardName.classList.add(
            'py-2',
            'bolder',
            'w-85',
            'mx-auto',
            'info-card'
        );
        cardName.innerText = `${keyValueArr[1][1]}`;
        card.append(cardName);

        // Card footer
        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add('w-85', 'mx-auto', 'py-2');
        const cardImpact = document.createElement('span');
        console.log('Impact keyValue arr', keyValueArr);
        if (keyValueArr[6][1][0] === 'S') {
            cardImpact.innerHTML = `Impact: <span class="badge rounded-pill bg-success">Small Scale</span>`;
        } else if (keyValueArr[6][1][0] === 'L') {
            cardImpact.innerHTML = `Impact: <span class="badge rounded-pill bg-warning">Large Scale</span>`;
        } else if (keyValueArr[6][1][0] === 'T') {
            cardImpact.innerHTML = `Impact: <span class="badge rounded-pill bg-danger">Transformative</span>`;
        }
        footerWrapper.append(cardImpact);
        card.append(footerWrapper);

        keyValueArr.forEach((keyValue, index) => {
            if (
                keyValue[0] === 'Name' ||
                keyValue[0] === 'Time Scale' ||
                keyValue[0] === 'Priorities' ||
                keyValue[0] === 'People' ||
                keyValue[0] === 'Impact' ||
                keyValue[0] === 'Goals' ||
                keyValue[0] === 'Area' ||
                keyValue[0] === 'Indicators'
            ) {
                // Modal Content Generaton
                const sectionWrapper = document.createElement('div');
                sectionWrapper.classList.add('col-sm-6', 'p-2');
                const section = document.createElement('div');
                section.classList.add('celdaficha');
                const title = document.createElement('h6');
                title.classList.add('titulo');
                title.innerText = `${keyValue[0]}`;
                const content = document.createElement('div');
                content.classList.add(
                    'd-flex',
                    'align-items-center',
                    'content-min-height',
                    'mx-auto'
                );

                let fieldData = document.createElement('h6');
                switch (keyValue[0]) {
                    case 'Time Scale':
                        fieldData.classList.add(
                            'text-center',
                            'w-90',
                            'giant-size',
                            'bolder'
                        );
                        fieldData.innerText = `${keyValue[1][0]}`;
                        if (keyValue[1][0] === 'S') {
                            fieldData.innerHTML += `<p class="subtext">Short term<br>(6 months to 1 year)</p>`;
                        } else if (keyValue[1][0] === 'M') {
                            fieldData.innerHTML += `<p class="subtext">Medium term<br>(6 months to 1 year)</p>`;
                        } else {
                            fieldData.innerHTML += `<p class="subtext">Long term<br>(6 months to 1 year)</p>`;
                        }
                        break;
                    case 'Impact':
                        if (keyValueArr[6][1][0] === 'S') {
                            fieldData.innerHTML = `<span class="badge rounded-pill bg-success">Small Scale</span>`;
                        } else if (keyValueArr[6][1][0] === 'L') {
                            fieldData.innerHTML = `<span class="badge rounded-pill bg-warning">Large Scale</span>`;
                        } else if (keyValueArr[6][1][0] === 'T') {
                            fieldData.innerHTML = `<span class="badge rounded-pill bg-danger">Transformative</span>`;
                        }
                        break;
                    case 'Priorities':
                        keyValue[1].forEach((priority) => {
                            fieldData.innerHTML += `<span class="badge rounded-pill bg-primary">${priority}</span> `;
                        });
                        fieldData.classList.add('w-90');
                        break;
                    case 'Metas':
                        fieldData.innerText = `${keyValue[1]}`;
                        fieldData.classList.add('text-center');
                        break;
                    case 'Area':
                        keyValue[1].forEach((area) => {
                            switch (area) {
                                case 'Empowering Learners':
                                    fieldData.innerHTML += `<span class="badge rounded-pill bg-cat1">${area}</span> `;
                                    break;
                                case 'Facilitating Learner':
                                    fieldData.innerHTML += `<span class="badge rounded-pill bg-cat2">${area}</span> `;
                                    break;
                                case 'Assessment':
                                    fieldData.innerHTML += `<span class="badge rounded-pill bg-cat3">${area}</span> `;
                                    break;
                                case 'Teaching and Learning':
                                    fieldData.innerHTML += `<span class="badge rounded-pill bg-cat4">${area}</span> `;
                                    break;
                                case 'Digital Resources':
                                    fieldData.innerHTML += `<span class="badge rounded-pill bg-cat5">${area}</span> `;
                                    break;
                                case 'Professional Engagement':
                                    fieldData.innerHTML += `<span class="badge rounded-pill bg-cat6">${area}</span> `;
                                    break;
                            }
                        });
                        fieldData.classList.add('w-90');
                        break;
                    default:
                        fieldData.classList.add('w-90');
                        fieldData.innerText = `${keyValue[1]}`;
                        break;
                }

                content.append(fieldData);
                section.append(title);
                section.append(content);
                sectionWrapper.append(section);
                row.append(sectionWrapper);
            }
        });
        if (obj['Time Scale'][0] === 'S') {
            card.classList.add('lightblue');
        } else if (obj['Time Scale'][0] === 'M') {
            card.classList.add('blue');
        } else if (obj['Time Scale'][0] === 'L') {
            card.classList.add('darkblue');
        }

        modalContent.append(row);
        modalContent.classList.add('d-none');
        card.append(modalContent);

        card.classList.add(
            'w-90',
            'mx-auto',
            'py-3',
            'border',
            'wow',
            'fadeInUp',
            'text-light',
            'min-height'
        );
        card.setAttribute('data-wow-duration', '1s');

        Array.from(cardWrapper.children).forEach((card, index) => {
            card.children[0].setAttribute(
                'data-wow-delay',
                `${(index + 1) * 0.2}s`
            );
        });

        cardSection.append(card);
        cardWrapper.append(cardSection);
    });
};

fetchJSONFile('./Actions.json', (data) => {
    console.log(data);
    data = data.sort((a, b) =>
        a['Time Scale'][0] > b['Time Scale'][0] ? -1 : 1
    );

    dynamicCardRendering(data);

    const renderedCards = Array.from(
        document.querySelector('.card-wrapper').children
    );

    const renderAll = (e) => {
        renderedCards.forEach((card) => {
            if (card.classList.contains('d-none')) {
                card.classList.remove('d-none');
            }
        });
        navItems.forEach((navItem) => navItem.classList.remove('active'));
        e.target.classList.add('active');
    };

    const renderFiltered = (area, e) => {
        const keyValueArr = Object.entries(data);
        renderedCards.forEach((card, index) => {
            card.classList.add('d-none');
            if (keyValueArr[index][1].Area.includes(area)) {
                card.classList.remove('d-none');
            }
        });
        navItems.forEach((navItem) => navItem.classList.remove('active'));
        e.target.classList.add('active');
    };

    console.log(navItems.children, document.querySelector);
    navItems.forEach((navItem) => {
        navItem.addEventListener('click', (e) => {
            switch (e.target) {
                case navItems[0]:
                    renderAll(e);
                    break;
                case navItems[1]:
                    renderFiltered('Empowering Learners', e);
                    break;
                case navItems[2]:
                    renderFiltered('Facilitating Learner', e);
                    break;
                case navItems[3]:
                    renderFiltered('Assessment', e);
                    break;
                case navItems[4]:
                    renderFiltered('Teaching and Learning', e);
                    break;
                case navItems[5]:
                    renderFiltered('Digital Resources', e);
                    break;
                case navItems[6]:
                    renderFiltered('Professional Engagement', e);
                    break;
                default:
                    console.log('Algo salio mal');
                    break;
            }
        });
    });
});

const modal = document.createElement('div');
modal.classList.add('modal', 'fade');
modal.setAttribute('id', `cardModal`);

const modalDialog = document.createElement('div');
modalDialog.classList.add('modal-dialog');
modalDialog.classList.add('modal-lg');

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

var modalBody = document.createElement('div');
modalBody.classList.add('modal-body');

modalContent.append(modalBody);
modalDialog.append(modalContent);
modal.append(modalDialog);
modalWrapper.append(modal);

var myModal = new bootstrap.Modal(document.getElementById('cardModal'));
