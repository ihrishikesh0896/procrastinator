    // Matrix rain effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39ff14';
      ctx.font = fontSize + 'px VT323';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 50);

    // Smooth scrolling
    function scrollToSection(event, sectionId) {
      event.preventDefault();
      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.terminal-box').forEach(box => {
      observer.observe(box);
    });

    // Easter egg terminal
    let terminalVisible = false;
    const hiddenTerminal = document.getElementById('hiddenTerminal');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');

    function toggleEasterEgg(event) {
      event.preventDefault();
      terminalVisible = !terminalVisible;
      hiddenTerminal.classList.toggle('show', terminalVisible);
      if (terminalVisible) {
        terminalInput.focus();
      }
    }

    // Terminal commands
    const commands = {
      help: 'Available commands: whoami, skills, experience, certs, clear, exit, hack',
      whoami: 'Hrishikesh Nate - Cybersecurity Specialist',
      skills: 'Python | Bash | Java | K8s | Docker | AWS | Pentesting',
      experience: 'TIAA → Paytm → Justdial | 5+ years in cybersecurity',
      certs: 'CKS | CKA | CEH | CNSS | CRTP',
      hack: 'Access denied. Nice try! 😉',
      clear: '',
      exit: 'Goodbye, fellow hacker! 👋'
    };

    terminalInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const command = this.value.toLowerCase();
        const output = commands[command] || `Command not found: ${command}. Type 'help' for available commands.`;

        if (command === 'clear') {
          terminalOutput.innerHTML = '';
        } else if (command === 'exit') {
          terminalOutput.innerHTML += `<div class="prompt">root@portfolio:~# ${this.value}</div><div>${output}</div>`;
          setTimeout(() => {
            hiddenTerminal.classList.remove('show');
            terminalVisible = false;
          }, 1000);
        } else {
          terminalOutput.innerHTML += `<div class="prompt">root@portfolio:~# ${this.value}</div><div>${output}</div>`;
        }

        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleEasterEgg(e);
      }
      if (e.key === 'Escape' && terminalVisible) {
        hiddenTerminal.classList.remove('show');
        terminalVisible = false;
      }
    });

    // Real-time clock
    function updateTime() {
      const now = new Date();
      document.getElementById('currentTime').textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Random glitch effect
    setInterval(() => {
      const elements = document.querySelectorAll('.prompt');
      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      randomElement.classList.add('glitch');
      setTimeout(() => {
        randomElement.classList.remove('glitch');
      }, 300);
    }, 10000);

    // Window resize handler for matrix
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
