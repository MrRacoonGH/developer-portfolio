document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const wrapper = document.querySelector('.card-wrapper');
      if (!wrapper) {
        console.error('Élément .card-wrapper introuvable dans le HTML.');
        return;
      }

      data.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Image
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        card.appendChild(img);

        // Titre + technologies
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');

        const h2 = document.createElement('h2');
        h2.textContent = project.title;
        titleDiv.appendChild(h2);

        const techDiv = document.createElement('div');
        techDiv.classList.add('language');
        project.technologies.forEach(tech => {
          const p = document.createElement('p');
          p.textContent = tech;
          techDiv.appendChild(p);
        });
        titleDiv.appendChild(techDiv);
        card.appendChild(titleDiv);

        // Liens
        const viewDiv = document.createElement('div');
        viewDiv.classList.add('view-project');

        const liLive = document.createElement('li');
        const aLive = document.createElement('a');
        aLive.href = project.links.live;
        aLive.textContent = 'View project';
        aLive.target = '_blank';
        liLive.appendChild(aLive);

        const liCode = document.createElement('li');
        const aCode = document.createElement('a');
        aCode.href = project.links.code;
        aCode.textContent = 'View code';
        aCode.target = '_blank';
        liCode.appendChild(aCode);

        viewDiv.appendChild(liLive);
        viewDiv.appendChild(liCode);
        card.appendChild(viewDiv);

        wrapper.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement ou du traitement du JSON :', error);
    });
});