document.addEventListener('DOMContentLoaded', () => {

    /* --- MENU MOBILE --- */
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('ph-x', 'ph-list');
            }
        });
    });

    /* --- HEADER STICKY --- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- SCROLL REVEAL (ANIMAÇÕES) --- */
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* --- ACCORDION FAQ --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Fechar todos
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Se não estava ativo, abre. Se estava, fechou no passo acima.
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* --- ENVIO DO FORMULÁRIO PARA WHATSAPP --- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const cidade = document.getElementById('cidade').value;
            const quantidade = document.getElementById('quantidade').value;
            const material = document.getElementById('material').value;
            const mensagem = document.getElementById('mensagem').value;

            // Formata a mensagem para o URL do WhatsApp
            let zapText = `Olá, quero solicitar uma cotação de sucata de metal duro / tungstênio.\n\n`;
            zapText += `*Nome:* ${nome}\n`;
            zapText += `*Cidade:* ${cidade}\n`;
            zapText += `*Material:* ${material}\n`;
            zapText += `*Quantidade aproximada:* ${quantidade}\n`;
            
            if (mensagem.trim() !== '') {
                zapText += `*Detalhes:* ${mensagem}`;
            }

            const encodedText = encodeURIComponent(zapText);
            const wppNumber = '5511943550880';
            const wppUrl = `https://wa.me/${wppNumber}?text=${encodedText}`;

            // Abre navegação em nova aba
            window.open(wppUrl, '_blank');
        });
    }

    /* --- UPDATE YEAR IN FOOTER --- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    /* --- CARROSSEL --- */
    const track = document.querySelector('.carousel-track');
    const originalSlides = Array.from(document.querySelectorAll('.carousel-slide') || []);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (track && originalSlides.length > 0) {
        // Clonar primeiros e últimos itens para o loop infinito
        // Clonamos 3 de cada para garantir que o preenchimento visual de 3 colunas funcione no pulo
        const firstClones = originalSlides.slice(0, 3).map(s => s.cloneNode(true));
        const lastClones = originalSlides.slice(-3).map(s => s.cloneNode(true));
        
        firstClones.forEach(clone => track.appendChild(clone));
        lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));
        
        let currentIndex = 3; // Começa no primeiro slide original (após os 3 clones iniciais)
        const slideCount = originalSlides.length;
        
        // Ajuste inicial de posição sem transição
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
        
        // Setup indicators baseados apenas nos slides originais
        originalSlides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                moveToSlide(index + 3);
            });
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = Array.from(document.querySelectorAll('.indicator'));
        let isTransitioning = false;

        const updateIndicators = (index) => {
            let visualIndex = (index - 3) % slideCount;
            if (visualIndex < 0) visualIndex += slideCount;
            
            indicators.forEach(ind => ind.classList.remove('active'));
            if (indicators[visualIndex]) indicators[visualIndex].classList.add('active');
        };
        
        const moveToSlide = (index, withTransition = true) => {
            if (isTransitioning && withTransition) return;
            
            isTransitioning = true;
            track.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
            track.style.transform = `translateX(-${index * (100 / 3)}%)`;
            
            currentIndex = index;
            updateIndicators(currentIndex);
        };
        
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            
            // Lógica de loop infinito: se estiver nos clones, pula para o real correspondente
            if (currentIndex >= slideCount + 3) {
                moveToSlide(3, false);
            } else if (currentIndex < 3) {
                moveToSlide(slideCount + currentIndex, false);
            }
        });
        
        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });
        
        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });
        
        // Auto-play
        setInterval(() => {
            if (!isTransitioning) {
                moveToSlide(currentIndex + 1);
            }
        }, 5000);
    }
});
