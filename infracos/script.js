document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. СЛОВАРЬ ПЕРЕВОДОВ ---
    const translations = {
        ru: {
            nav_home: "Главная", nav_tourism: "Туризм", nav_procurement: "Госзакупки", nav_vacancies: "Вакансии", nav_more: "Еще ▾", nav_management: "Руководство", nav_departments: "Отделы", nav_realization: "Реализация", nav_compliance: "Комплаенс", nav_contacts: "Контакты", btn_explore: "Исследовать",
            hero_title: "Инфракос: Врата в Космическую Деятельность", hero_desc: "Обеспечение экологической безопасности ракетно-космической деятельности и развитие научно-исследовательской базы на комплексе «Байконур».", btn_more: "Узнать больше",
            title_news: "Новости", news_1: "Итоги научной конференции", news_1_desc: "Обсуждение новых методов эко-контроля.", title_ads: "Объявления", tag_tender: "Закупки", ad_1: "План закупок на II квартал",
            page_tourism_title: "Туризм на комплексе «Байконур»", tour_obj1: "Стартовые площадки", tour_obj2: "Музей космонавтики", tour_price: "Прайс-лист", table_service: "Услуга", price_1: "Посещение визит-центра", price_2: "Выезд на стартовый комплекс"
        },
        en: {
            nav_home: "Home", nav_tourism: "Tourism", nav_procurement: "Procurement", nav_vacancies: "Vacancies", nav_more: "More ▾", nav_management: "Management", nav_departments: "Departments", nav_realization: "Realization", nav_compliance: "Compliance", nav_contacts: "Contacts", btn_explore: "Explore",
            hero_title: "Infrakos: Your Gateway to Space Activities", hero_desc: "Ensuring ecological safety of rocket and space activities and developing the research base at the Baikonur complex.", btn_more: "Discover More",
            title_news: "News", news_1: "Scientific Conference Results", news_1_desc: "Discussion of new eco-control methods.", title_ads: "Announcements", tag_tender: "Tender", ad_1: "Procurement plan for Q2",
            page_tourism_title: "Tourism at Baikonur", tour_obj1: "Launch Pads", tour_obj2: "Space Museum", tour_price: "Price List", table_service: "Service", price_1: "Visit Center Access", price_2: "Launch Complex Tour"
        },
        kz: {
            nav_home: "Басты бет", nav_tourism: "Туризм", nav_procurement: "Мемлекеттік сатып алу", nav_vacancies: "Бос жұмыс орындары", nav_more: "Тағы ▾", nav_management: "Басшылық", nav_departments: "Бөлімдер", nav_realization: "Іске асыру", nav_compliance: "Комплаенс", nav_contacts: "Байланыс", btn_explore: "Зерттеу",
            hero_title: "Инфракос: Ғарыш қызметіне апаратын қақпа", hero_desc: "Зымыран-ғарыш қызметінің экологиялық қауіпсіздігін қамтамасыз ету және «Байқоңыр» кешенінде ғылыми-зерттеу базасын дамыту.", btn_more: "Толығырақ білу",
            title_news: "Жаңалықтар", news_1: "Ғылыми конференция қорытындылары", news_1_desc: "Эко-бақылаудың жаңа әдістерін талқылау.", title_ads: "Хабарландырулар", tag_tender: "Сатып алу", ad_1: "II тоқсанға арналған сатып алу жоспары",
            page_tourism_title: "Байқоңыр кешеніндегі туризм", tour_obj1: "Ұшыру алаңдары", tour_obj2: "Космонавтика мұражайы", tour_price: "Бағалар тізімі", table_service: "Қызмет", price_1: "Визит-орталыққа бару", price_2: "Ұшыру кешеніне шығу"
        }
    };

    // --- 2. МУЛЬТИЯЗЫЧНОСТЬ ---
    let currentLang = localStorage.getItem('siteLang') || 'ru';
    const langBtns = document.querySelectorAll('#langSwitch span');

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            langBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentLang = e.target.getAttribute('data-lang');
            localStorage.setItem('siteLang', currentLang);
            applyTranslations();
        });
    });

    langBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === currentLang));

    // --- 3. РОУТЕР SPA ---
    const appRoot = document.getElementById('app-root');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function renderPage() {
        let hash = window.location.hash || '#home';
        const templateId = `page-${hash.replace('#', '')}`;
        const template = document.getElementById(templateId);

        if (template) {
            appRoot.innerHTML = '';
            const clone = template.content.cloneNode(true);
            
            const wrapper = document.createElement('div');
            wrapper.classList.add('fade-in');
            wrapper.appendChild(clone);
            appRoot.appendChild(wrapper);

            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
            if (activeLink) activeLink.classList.add('active');

            applyTranslations();
            window.scrollTo(0, 0);
        }
    }

    window.addEventListener('hashchange', renderPage);
    renderPage();

    // --- 4. ЭФФЕКТ ПАРАЛЛАКСА ЗА МЫШЬЮ (Только для фона и планет) ---
    document.addEventListener('mousemove', (e) => {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        if (parallaxLayers.length === 0) return;

        // Вычисляем смещение курсора от центра экрана
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const xOffset = x * speed;
            const yOffset = y * speed;
            layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});