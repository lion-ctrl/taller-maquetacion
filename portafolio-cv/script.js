/* ****** Menu ****** */
((d) => {
  const $btnMenu = d.querySelector('.header-btn'),
    $menu = d.querySelector('.menu');

  d.addEventListener('click', (e) => {
    if (
      e.target.matches('.header-btn') ||
      e.target.matches('.header-btn svg') ||
      e.target.matches('.header-btn path')
    ) {
      $btnMenu.firstElementChild.classList.toggle('d-none');
      $btnMenu.lastElementChild.classList.toggle('d-none');
      $menu.classList.toggle('is-active');
    }

    if (e.target.matches('.menu a')) {
      $menu.classList.remove('is-active');
      $btnMenu.firstElementChild.classList.remove('d-none');
      $btnMenu.lastElementChild.classList.add('d-none');
    }
  });
})(document);

((d) => {
  const $form = d.querySelector('.contact-form'),
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    $loader.classList.remove('d-none');
    fetch('https://formsubmit.co/ajax/leonardo.novaro.ln@gmail.com', {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        console.log(data);
        location.hash = '#gracias';
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        const message =
          err.statusText || 'Ocurrio un error al enviar, intenta nuevamente';
        $response.querySelector(
          'h3'
        ).innerHTML = `Error ${err.status}: ${message}`;
        location.hash = '#gracias';
        $loader.classList.add('d-none');
      })
      .finally(() => {
        $loader.classList.add('d-none');
        setTimeout(() => {
          location.hash = '#close';
        }, 3000);
      });
  });
})(document);
