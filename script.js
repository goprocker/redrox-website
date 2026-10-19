document.addEventListener('DOMContentLoaded', () => {

    /* THEME SWITCHER LOGIC */
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    } else {
        // Default to dark mode based on project aesthetic if not set
        document.body.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.body.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Re-init grid color
            if (ctx) initGrid();
        });
    }

    /* INITIALIZE AOS ANIMATIONS */
    if (window.AOS) {
        AOS.init({ once: true, offset: 50 });
    }

    /* SPOTLIGHT EFFECT & INTERACTIVE CANVAS */
    const spotlight = document.getElementById('spotlight');
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let canvasWidth, canvasHeight;
    let mouse = { x: -1000, y: -1000 };
    const canvasDots = [];
    const spacing = 60;

    if (canvas && ctx) {
        function initGrid() {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const dotColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(17,24,39,0.05)';
            
            canvasWidth = canvas.width = window.innerWidth;
            canvasHeight = canvas.height = window.innerHeight;
            canvasDots.length = 0;
            for (let x = 0; x <= canvasWidth; x += spacing) {
                for (let y = 0; y <= canvasHeight; y += spacing) {
                    canvasDots.push({ x, y, baseX: x, baseY: y, size: 1.5, color: dotColor });
                }
            }
        }
        initGrid();
        window.addEventListener('resize', initGrid);

        function animateCanvas() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            for (let i = 0; i < canvasDots.length; i++) {
                let p = canvasDots[i];
                let dx = mouse.x - p.baseX;
                let dy = mouse.y - p.baseY;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                let maxDist = 200;
                if (dist < maxDist) {
                    const isDark = document.body.getAttribute('data-theme') === 'dark';
                    let force = (maxDist - dist) / maxDist;
                    p.x = p.baseX - (dx / dist) * force * 15;
                    p.y = p.baseY - (dy / dist) * force * 15;
                    p.size = 1.5 + force * 2.5;
                    p.color = isDark ? `rgba(255, 0, 0, ${0.1 + force * 0.7})` : `rgba(255, 0, 0, ${0.05 + force * 0.5})`;
                    
                    // Connect lines to mouse
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255, 0, 0, ${force * (isDark ? 0.1 : 0.05)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                } else {
                    const isDark = document.body.getAttribute('data-theme') === 'dark';
                    p.x += (p.baseX - p.x) * 0.1;
                    p.y += (p.baseY - p.y) * 0.1;
                    p.size = 1.5;
                    p.color = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(17, 24, 39, 0.05)';
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    window.addEventListener('mousemove', e => {
        if (spotlight) {
            spotlight.style.setProperty('--x', `${e.clientX}px`);
            spotlight.style.setProperty('--y', `${e.clientY}px`);
        }
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    /* NAVBAR & MOBILE MENU */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            if (currentScrollY > lastScrollY && !mobileMenu.classList.contains('open')) {
                navbar.classList.add('hidden'); // Down
            } else {
                navbar.classList.remove('hidden'); // Up
            }
        } else {
            navbar.classList.remove('hidden'); // Top
        }
        lastScrollY = currentScrollY;

        // Scroll to top
        const btnTop = document.getElementById('scrollToTop');
        if (currentScrollY > 800) btnTop.classList.add('visible');
        else btnTop.classList.remove('visible');
    });

    menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });

    // Scroll to top action
    document.getElementById('scrollToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* REDROX PRODUCT CHATBOT
       UI pattern adapted from ORION. Answers stay inside facts published in this repo. */
    const chatLauncher = document.getElementById('chatLauncher');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatMinimize = document.getElementById('chatMinimize');
    const chatBody = document.getElementById('chatBody');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatQuickReplies = document.getElementById('chatQuickReplies');
    let chatStarted = false;

    const chatbotKnowledge = [
        {
            terms: ['strong', 'strength', 'load', 'durable', 'compression'],
            answer: 'REDROX blocks are formed with 110-ton hydraulic compression. The website states they deliver 4–5× greater load-bearing strength than conventional clay bricks.'
        },
        {
            terms: ['speed', 'fast', 'time', 'timeline', 'construction'],
            answer: 'The dry-stack interlocking system reduces alignment work, plastering, and skilled-labor dependency. REDROX states this can reduce a typical two-year build cycle to about six months.'
        },
        {
            terms: ['sustainable', 'sustainability', 'eco', 'environment', 'water', 'cement', 'textile', 'waste'],
            answer: 'REDROX uses shredded waste-cloth fibers in its block matrix. The website reports up to 70% lower water consumption with significant cement savings per build.'
        },
        {
            terms: ['temperature', 'thermal', 'heat', 'cool', 'insulation', 'electricity'],
            answer: 'REDROX blocks trap air to reduce heat transfer. The website reports indoor temperatures up to 10°C cooler, which can reduce AC and electricity use.'
        },
        {
            terms: ['sound', 'noise', 'acoustic', 'vibration'],
            answer: 'The block system is designed to absorb sound and reduce noise, echo, and vibration.'
        },
        {
            terms: ['earthquake', 'seismic', 'crack', 'resistance'],
            answer: 'REDROX presents the blocks as seismic-resistant and crack-resistant. Shredded cloth fibers provide micro-reinforcement that helps absorb tensile stress.'
        },
        {
            terms: ['electrical', 'plumbing', 'channel', 'wall cutting'],
            answer: 'Built-in electrical and plumbing channels reduce wall cutting and rework during installation.'
        },
        {
            terms: ['test', 'report', 'certificate', 'certification', 'verify', 'verified'],
            answer: 'The website lists Master Performance Report no. 6031101, issued March 16, 2026. Use the Verification section to open the published testing report PDF.'
        },
        {
            terms: ['price', 'pricing', 'cost', 'much', 'quote', 'buy', 'purchase', 'order', 'supply', 'partner', 'contact', 'support', 'email', 'phone', 'location', 'located', 'based', 'where'],
            answer: 'Project pricing is not published. Submit the Partner With REDROX form or email redroxindustriespvtltd@gmail.com. REDROX is based in Tamil Nadu, India.'
        },
        {
            terms: ['what', 'about', 'redrox', 'block', 'product'],
            answer: 'REDROX Industries develops high-strength interlocking construction blocks using shredded textile fibers and 110-ton hydraulic compression. The system focuses on faster, lower-resource construction.'
        }
    ];

    function addChatMessage(text, role) {
        const row = document.createElement('div');
        row.className = `redrox-chat__message redrox-chat__message--${role}`;

        const avatar = document.createElement('span');
        avatar.className = 'redrox-chat__avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = role === 'assistant' ? 'R' : 'You';

        const bubble = document.createElement('p');
        bubble.textContent = text;

        row.append(avatar, bubble);
        chatMessages.appendChild(row);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function answerChatbot(question) {
        const normalizedQuestion = question.toLowerCase();
        let best = null;
        let bestScore = 0;

        chatbotKnowledge.forEach(entry => {
            const score = entry.terms.reduce((total, term) => total + (normalizedQuestion.includes(term) ? 1 : 0), 0);
            if (score > bestScore) {
                best = entry;
                bestScore = score;
            }
        });

        return bestScore > 0
            ? best.answer
            : 'I can answer questions about REDROX block strength, construction speed, sustainability, insulation, testing, or contact details. For project-specific advice, use the partnership form.';
    }

    function startChat() {
        if (chatStarted) return;
        addChatMessage('Hi! I’m the REDROX Assistant. Ask me about our interlocking blocks, performance, sustainability, verification, or partnerships.', 'assistant');
        chatStarted = true;
    }

    function openChat() {
        startChat();
        chatWindow.hidden = false;
        chatBody.hidden = false;
        chatWindow.classList.remove('is-minimized');
        chatLauncher.hidden = true;
        chatLauncher.setAttribute('aria-expanded', 'true');
        chatMinimize.setAttribute('aria-label', 'Minimize chatbot');
        window.setTimeout(() => chatInput.focus(), 50);
    }

    function closeChat() {
        chatWindow.hidden = true;
        chatLauncher.hidden = false;
        chatLauncher.setAttribute('aria-expanded', 'false');
        chatLauncher.focus();
    }

    if (chatLauncher && chatWindow && chatForm) {
        chatLauncher.addEventListener('click', openChat);
        chatClose.addEventListener('click', closeChat);
        chatMinimize.addEventListener('click', () => {
            const willMinimize = !chatBody.hidden;
            chatBody.hidden = willMinimize;
            chatWindow.classList.toggle('is-minimized', willMinimize);
            chatMinimize.setAttribute('aria-label', willMinimize ? 'Expand chatbot' : 'Minimize chatbot');
            if (!willMinimize) chatInput.focus();
        });

        chatForm.addEventListener('submit', event => {
            event.preventDefault();
            const question = chatInput.value.trim();
            if (!question) return;
            addChatMessage(question, 'user');
            chatInput.value = '';
            chatQuickReplies.hidden = true;
            window.setTimeout(() => addChatMessage(answerChatbot(question), 'assistant'), 250);
        });

        chatQuickReplies.addEventListener('click', event => {
            const button = event.target.closest('[data-chat-question]');
            if (!button) return;
            chatInput.value = button.dataset.chatQuestion;
            chatForm.requestSubmit();
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !chatWindow.hidden) closeChat();
        });
    }

    /* 5-VIDEO CONSECUTIVE LOOP (Senior Architect Implementation) */
    const bgVideo = document.getElementById('loopVideo');
    const videoFiles = [
        'videos/1.mp4',
        'videos/2.mp4',
        'videos/3.mp4',
        'videos/4.mp4',
        'videos/5.mp4'
    ];
    let currentVideoIndex = 0;

    if (bgVideo) {
        bgVideo.addEventListener('ended', () => {
            currentVideoIndex++;
            if (currentVideoIndex >= videoFiles.length) {
                currentVideoIndex = 0; // Reset to first video
            }

            // Smooth transition effect
            bgVideo.style.opacity = 0;
            setTimeout(() => {
                bgVideo.src = videoFiles[currentVideoIndex];
                bgVideo.load();
                bgVideo.play().catch(e => console.log('Autoplay prevented', e));
                bgVideo.style.opacity = 1;
            }, 300); // 0.3s fade out before switch
        });
    }

    /* FAQ ACCORDION */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const panel = item.querySelector('.faq-panel');
        
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-panel').style.maxHeight = null;
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    /* ADVANCED STICKY SCROLL REVEAL / PARALLAX TWEAK */
    // Native CSS `position: sticky` handles the stacking. 
    // This observer fades elements out slightly as they move up past the viewport center.
    const stickyCards = document.querySelectorAll('.sticky-card');
    window.addEventListener('scroll', () => {
        if(window.innerWidth <= 900) return; // Disable effect on mobile stacking
        
        const scrollY = window.scrollY;
        const winH = window.innerHeight;
        
        stickyCards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            // Calculate how far the card is from the center
            const distFromTop = rect.top;
            const threshold = 180 + (i * 20); // The top offset
            
            // If the card is in its sticky "locked" position at the top
            if(distFromTop <= threshold + 5) {
                // Dim previous cards slightly when new ones stack on top
                card.style.opacity = '1';
                
                // Dim cards *beneath* the currently active top card
                // Card 0 is behind Card 1, Card 1 is behind Card 2, etc.
                // We let CSS naturally cover them, but we can scale them slightly for depth
                const scale = Math.max(0.9, 1 - ((i * 0.02))); 
                card.style.transform = `scale(${scale})`;
            } else {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
        });
    }, { passive: true });

});
