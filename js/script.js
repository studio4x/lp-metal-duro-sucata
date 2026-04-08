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
    const slides = Array.from(document.querySelectorAll('.carousel-slide') || []);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (track && slides.length > 0) {
        let currentSlideIndex = 0;
        
        // Setup indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                moveToSlide(index);
            });
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = Array.from(document.querySelectorAll('.indicator'));
        
        const moveToSlide = (index) => {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            track.style.transform = `translateX(-${index * (100 / 3)}%)`;
            
            // Update indicators
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
            
            currentSlideIndex = index;
        };
        
        nextButton.addEventListener('click', () => {
            moveToSlide(currentSlideIndex + 1);
        });
        
        prevButton.addEventListener('click', () => {
            moveToSlide(currentSlideIndex - 1);
        });
        
        // Auto-play (a cada 5 segundos)
        setInterval(() => {
            moveToSlide(currentSlideIndex + 1);
        }, 5000);
    }
});
