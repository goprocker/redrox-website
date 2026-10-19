(function () {
    'use strict';

    const knowledge = [
        {
            id: 'all',
            phrases: ['tell me everything', 'all information', 'full details', 'complete details', 'what do you know', 'what are the features', 'what are the benefits', 'what makes redrox different'],
            terms: ['everything', 'complete', 'features', 'benefits', 'capabilities', 'advantages'],
            answer: 'REDROX Industries Pvt Ltd. develops interlocking construction blocks made with shredded textile fibers and 110-ton hydraulic compression. Website claims include 4-5x strength, up to 70% lower water use, indoor temperatures up to 10°C cooler, and build-time reduction from about 2 years to about 6 months. Features include dry-stack alignment, built-in utility channels, crack resistance, sound insulation, thermal insulation, and seismic resistance. A March 16, 2026 lab report for five 300 x 150 x 95 mm samples records average compressive strength of 12.02 N/mm² and average water absorption of 7.51%. REDROX serves project partnerships from Tamil Nadu, India.',
            action: { label: 'Open testing report', href: 'TESTING%20REPORT.pdf' }
        },
        {
            id: 'overview',
            phrases: ['what is redrox', 'about redrox', 'who are you', 'what do you make', 'company overview', 'what material is used'],
            terms: ['redrox', 'company', 'product', 'block', 'brick', 'material'],
            answer: 'REDROX Industries Pvt Ltd. is a clean-tech construction startup. It develops high-strength interlocking blocks using shredded waste-cloth fibers and 110-ton hydraulic compression. The system targets faster construction, lower resource use, thermal and sound comfort, and durable masonry.'
        },
        {
            id: 'strength',
            phrases: ['compressive strength', 'load bearing', 'how strong', 'stronger than brick', 'strength test'],
            terms: ['strength', 'strong', 'compression', 'load', 'durable', 'mpa'],
            answer: 'Website states REDROX blocks are 4-5x stronger than conventional bricks and are formed with 110-ton hydraulic compression. Independent report no. 6031101 tested five samples at 11.58, 12.53, 11.80, 12.60, and 11.60 N/mm². Average compressive strength was 12.02 N/mm². The report says results conform to IS 1077:2025, Class 10, with testing under IS 3495 (Part 1):2019.',
            action: { label: 'View source report', href: 'TESTING%20REPORT.pdf' }
        },
        {
            id: 'water-test',
            phrases: ['water absorption', 'absorption test', 'how much water'],
            terms: ['absorption', 'moisture'],
            answer: 'Report no. 6031101 records water absorption of 8.41%, 7.23%, 7.51%, 7.46%, and 6.93% across five samples. Average was 7.51%, below the report\'s stated 20% maximum. Testing followed IS 3495 (Part 2):2019, and the report says results conform to IS 1077:2025.',
            action: { label: 'View source report', href: 'TESTING%20REPORT.pdf' }
        },
        {
            id: 'report',
            phrases: ['testing report', 'test report', 'certificate number', 'lab report', 'performance report'],
            terms: ['report', 'test', 'certificate', 'certification', 'verified', 'verification', 'standard'],
            answer: 'DAS Material Testings Pvt Ltd issued report no. 6031101 on March 16, 2026. It covers five REDROX interlocking-brick samples received March 11, 2026. Sample size was 300 x 150 x 95 mm. Tests cover compressive strength and water absorption. Results apply to the submitted samples.',
            action: { label: 'Open testing report', href: 'TESTING%20REPORT.pdf' }
        },
        {
            id: 'size',
            phrases: ['block size', 'brick size', 'dimensions', 'how big'],
            terms: ['size', 'dimension', 'length', 'width', 'height', 'weight'],
            answer: 'Testing report identifies submitted REDROX interlocking-brick samples as 300 x 150 x 95 mm. Recorded sample weights ranged from 8.460 kg to 8.870 kg.'
        },
        {
            id: 'speed',
            phrases: ['build time', 'construction time', 'how fast', 'speed up construction', 'dry stack'],
            terms: ['speed', 'fast', 'timeline', 'construction', 'months', 'years', 'plastering', 'labor'],
            answer: 'Website states the dry-stack interlocking system can reduce a typical 2-year build cycle to about 6 months. Accurate alignment, minimal plastering, and less skilled-labor dependency reduce site work.'
        },
        {
            id: 'sustainability',
            phrases: ['textile waste', 'eco friendly', 'water saving', 'cement saving', 'sustainable material'],
            terms: ['sustainable', 'sustainability', 'eco', 'environment', 'water', 'cement', 'textile', 'waste', 'cloth'],
            answer: 'REDROX uses shredded waste-cloth fibers in its compressed block matrix. Website reports up to 70% lower water consumption and significant cement savings per build. The product addresses textile waste while reducing wet construction work.'
        },
        {
            id: 'thermal',
            phrases: ['thermal insulation', 'temperature reduction', 'keep house cool', 'heat transfer'],
            terms: ['thermal', 'temperature', 'heat', 'cool', 'insulation', 'electricity', 'ac'],
            answer: 'Blocks trap air to reduce heat transfer. Website reports indoor temperatures up to 10°C cooler, supporting thermal comfort and potentially reducing air-conditioning demand.'
        },
        {
            id: 'sound',
            phrases: ['sound insulation', 'noise reduction', 'acoustic performance'],
            terms: ['sound', 'noise', 'acoustic', 'echo', 'vibration'],
            answer: 'REDROX presents the block system as sound-insulating. It is designed to reduce noise, echo, and vibration through sound absorption.'
        },
        {
            id: 'utilities',
            phrases: ['electrical channel', 'plumbing channel', 'wall cutting', 'built in channel'],
            terms: ['electrical', 'plumbing', 'channel', 'wiring', 'pipe', 'rework'],
            answer: 'Blocks include built-in channels for electrical and plumbing services. This avoids wall cutting and reduces rework during installation.'
        },
        {
            id: 'resistance',
            phrases: ['earthquake resistance', 'crack resistance', 'seismic zone'],
            terms: ['earthquake', 'seismic', 'crack', 'resistance', 'fiber', 'reinforcement', 'tensile'],
            answer: 'Website presents REDROX blocks as earthquake-resistant and crack-resistant. Shredded cloth fibers act as micro-reinforcement inside the compressed matrix and help absorb tensile stress. Project-specific structural suitability still requires qualified engineering design.'
        },
        {
            id: 'team',
            phrases: ['leadership team', 'who founded', 'founder name', 'meet the team'],
            terms: ['team', 'founder', 'ceo', 'cofounder', 'leadership', 'kanith', 'raghavi', 'adhith', 'kiruthivasan', 'anushri', 'varsha'],
            answer: 'Website lists S.A Kanith Kumar as Founder and CEO; S. Raghavi as Co-Founder and CCO; S. Adhith as COO; M. Kiruthivasan as CFO; M. S. Anushri as CMO; and Varsha Prabhakaran as Business Development Executive.'
        },
        {
            id: 'customers',
            phrases: ['who do you supply', 'target customers', 'business model', 'bulk order'],
            terms: ['developer', 'contractor', 'government', 'housing', 'customer', 'supply', 'contract', 'partnership'],
            answer: 'Website describes bulk project contracts and long-term supply agreements. Intended partners include real-estate developers, contractors, affordable-housing projects, and government infrastructure.'
        },
        {
            id: 'pricing',
            phrases: ['how much', 'price list', 'get quote', 'cost per block', 'buy blocks', 'place order'],
            terms: ['price', 'pricing', 'cost', 'quote', 'buy', 'purchase', 'order'],
            answer: 'Public website does not list project pricing. Pricing depends on project requirements. Use the partnership form or email REDROX for a quote.',
            action: { label: 'Go to partnership form', href: 'index.html#contact' }
        },
        {
            id: 'contact',
            phrases: ['contact redrox', 'email address', 'where are you', 'get in touch', 'phone number'],
            terms: ['contact', 'email', 'phone', 'location', 'located', 'address', 'tamil', 'chennai'],
            answer: 'REDROX operates in Tamil Nadu, India. Email redroxindustriespvtltd@gmail.com or submit the Partner With REDROX form. No public phone number is listed on the website.',
            action: { label: 'Open contact form', href: 'index.html#contact' }
        }
    ];

    const genericTerms = new Set(['a', 'an', 'and', 'are', 'about', 'can', 'do', 'does', 'for', 'how', 'i', 'in', 'is', 'it', 'me', 'of', 'on', 'the', 'to', 'what', 'with', 'you', 'your']);

    function normalize(value) {
        return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9%]+/g, ' ').trim();
    }

    function scoreEntry(question, entry) {
        const normalized = normalize(question);
        const words = new Set(normalized.split(' ').filter(Boolean));
        let score = 0;

        entry.phrases.forEach(phrase => {
            if (normalized.includes(normalize(phrase))) score += 9;
        });

        entry.terms.forEach(term => {
            const normalizedTerm = normalize(term);
            const matchesTerm = words.has(normalizedTerm) || (normalizedTerm.length >= 4 && [...words].some(word => word === `${normalizedTerm}s` || word === `${normalizedTerm}es`));
            if (matchesTerm) {
                const isBroadOverviewTerm = entry.id === 'overview' && ['company', 'product', 'block', 'brick'].includes(normalizedTerm);
                score += genericTerms.has(normalizedTerm) || isBroadOverviewTerm ? 1 : 3;
            }
        });

        return score;
    }

    function getAnswer(question) {
        const normalized = normalize(question);
        if (/^(hi|hello|hey|vanakkam|good morning|good evening)\b/.test(normalized)) {
            return {
                id: 'greeting',
                answer: 'Hello! Ask me about REDROX blocks, verified test results, construction benefits, sustainability, team, pricing, or partnerships.'
            };
        }

        const matches = knowledge
            .map(entry => ({ entry, score: scoreEntry(question, entry) }))
            .sort((a, b) => b.score - a.score);

        if (!matches[0] || matches[0].score < 3) {
            return {
                id: 'fallback',
                answer: 'I could not match that to verified website information. Ask about strength, water absorption, block size, build speed, sustainability, insulation, utilities, team, pricing, or contact details. For project-specific advice, contact REDROX.',
                action: { label: 'Contact REDROX', href: 'index.html#contact' }
            };
        }

        return matches[0].entry;
    }

    function createChatMarkup() {
        const section = document.createElement('section');
        section.className = 'redrox-chat';
        section.id = 'redroxChat';
        section.setAttribute('aria-label', 'REDROX Assistant');
        section.innerHTML = `
            <button class="redrox-chat__launcher" id="chatLauncher" type="button" aria-expanded="false" aria-controls="chatWindow">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/></svg>
                <span>Ask REDROX</span>
            </button>
            <div class="redrox-chat__window" id="chatWindow" role="dialog" aria-modal="false" aria-labelledby="chatTitle" hidden>
                <header class="redrox-chat__header">
                    <div class="redrox-chat__identity"><span class="redrox-chat__mark" aria-hidden="true">R</span><div><h2 id="chatTitle">REDROX Assistant</h2><p><span class="redrox-chat__status" aria-hidden="true"></span> Website knowledge · Online</p></div></div>
                    <div class="redrox-chat__actions">
                        <button id="chatMinimize" type="button" aria-label="Minimize chatbot"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>
                        <button id="chatClose" type="button" aria-label="Close chatbot"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
                    </div>
                </header>
                <div class="redrox-chat__body" id="chatBody">
                    <div class="redrox-chat__messages" id="chatMessages" role="log" aria-live="polite" aria-label="Chat messages"></div>
                    <div class="redrox-chat__quick" id="chatQuickReplies" aria-label="Suggested questions"><p>Popular questions</p><div>
                        <button type="button" data-chat-question="Tell me everything about REDROX">Full overview</button>
                        <button type="button" data-chat-question="What are the verified test results?">Test results</button>
                        <button type="button" data-chat-question="How does REDROX speed up construction?">Build speed</button>
                        <button type="button" data-chat-question="How can I contact REDROX?">Contact</button>
                    </div></div>
                    <form class="redrox-chat__form" id="chatForm">
                        <label class="sr-only" for="chatInput">Ask about REDROX</label>
                        <input id="chatInput" name="message" type="text" maxlength="300" placeholder="Ask about REDROX blocks..." autocomplete="off" required>
                        <button type="submit" aria-label="Send message"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button>
                    </form>
                    <p class="redrox-chat__note">Answers use published website and testing-report information.</p>
                </div>
            </div>`;
        return section;
    }

    function initChatbot() {
        if (document.getElementById('redroxChat')) return;
        document.body.appendChild(createChatMarkup());

        const launcher = document.getElementById('chatLauncher');
        const windowElement = document.getElementById('chatWindow');
        const closeButton = document.getElementById('chatClose');
        const minimizeButton = document.getElementById('chatMinimize');
        const body = document.getElementById('chatBody');
        const messages = document.getElementById('chatMessages');
        const form = document.getElementById('chatForm');
        const input = document.getElementById('chatInput');
        const quickReplies = document.getElementById('chatQuickReplies');
        let started = false;

        function addMessage(text, role, action) {
            const row = document.createElement('div');
            row.className = `redrox-chat__message redrox-chat__message--${role}`;
            const avatar = document.createElement('span');
            avatar.className = 'redrox-chat__avatar';
            avatar.setAttribute('aria-hidden', 'true');
            avatar.textContent = role === 'assistant' ? 'R' : 'You';
            const bubble = document.createElement('p');
            bubble.textContent = text;
            row.append(avatar, bubble);
            messages.appendChild(row);

            if (action) {
                const link = document.createElement('a');
                link.href = action.href;
                link.textContent = action.label;
                if (action.href.endsWith('.pdf')) {
                    link.target = '_blank';
                    link.rel = 'noopener';
                }
                messages.appendChild(link);
            }
            messages.scrollTop = messages.scrollHeight;
        }

        function start() {
            if (started) return;
            addMessage('Hi! I am the REDROX Assistant. Ask about products, verified test results, construction benefits, sustainability, team, pricing, or partnerships.', 'assistant');
            started = true;
        }

        function open() {
            start();
            windowElement.hidden = false;
            body.hidden = false;
            windowElement.classList.remove('is-minimized');
            launcher.hidden = true;
            launcher.setAttribute('aria-expanded', 'true');
            minimizeButton.setAttribute('aria-label', 'Minimize chatbot');
            window.setTimeout(() => input.focus(), 50);
        }

        function close() {
            windowElement.hidden = true;
            launcher.hidden = false;
            launcher.setAttribute('aria-expanded', 'false');
            launcher.focus();
        }

        function ask(question) {
            addMessage(question, 'user');
            input.value = '';
            const response = getAnswer(question);
            window.setTimeout(() => addMessage(response.answer, 'assistant', response.action), 180);
        }

        launcher.addEventListener('click', open);
        closeButton.addEventListener('click', close);
        minimizeButton.addEventListener('click', () => {
            const willMinimize = !body.hidden;
            body.hidden = willMinimize;
            windowElement.classList.toggle('is-minimized', willMinimize);
            minimizeButton.setAttribute('aria-label', willMinimize ? 'Expand chatbot' : 'Minimize chatbot');
            if (!willMinimize) input.focus();
        });
        form.addEventListener('submit', event => {
            event.preventDefault();
            const question = input.value.trim();
            if (question) ask(question);
        });
        quickReplies.addEventListener('click', event => {
            const button = event.target.closest('[data-chat-question]');
            if (button) ask(button.dataset.chatQuestion);
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !windowElement.hidden) close();
        });
    }

    window.RedroxChatbot = { getAnswer, knowledge };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initChatbot);
    else initChatbot();
}());
