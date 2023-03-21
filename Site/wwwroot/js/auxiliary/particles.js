function createParticle() {
    let container = $('.particle-container');

    if (container.children().length > 50) {
        return;
    }

    for (var i = 0; i < 25; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = Math.random() * 70 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 'px';
        particle.style.height = particle.style.width;
        particle.style.filter = 'blur('+ Math.floor(Math.random() * 5)+'px);';
        container.append(particle);
    }
}

setInterval(createParticle, 500);