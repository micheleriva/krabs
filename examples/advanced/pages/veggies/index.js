const getImage = (tenant) => {
  switch (tenant) {
    case 'local.cabbage.eat.com':
    case 'cabbage.krabs.eat.micheleriva.com':
      return 'https://images.unsplash.com/photo-1592587828054-10f56e3350db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80';
    case 'local.pumpkin.eat.com':
    case 'pumpkin.krabs.eat.micheleriva.com':
      return 'https://images.unsplash.com/photo-1506917728037-b6af01a7d403?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80';
    default:
      return 'https://images.unsplash.com/photo-1567306295427-94503f8300d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1326&q=80';
  }
};

function Index(props) {
  const image = getImage(props.tenant);

  return (
    <div>
      <div>
        <img src={image} className="w-4/6" />
      </div>
      <p className="mt-10 mb-10">
        Praesent auctor dui vitae magna aliquam, eu pretium nulla volutpat. Sed quis orci id lorem
        tempus pharetra. Aenean nec nisl eu felis dignissim porttitor. Nunc hendrerit ut risus sed
        hendrerit. Ut faucibus maximus leo, feugiat volutpat felis hendrerit ut. Vivamus molestie
        augue in tortor aliquet, et vulputate elit iaculis. Mauris eu euismod turpis. Vivamus
        commodo maximus leo, consectetur efficitur velit suscipit non. Fusce eu maximus justo. Etiam
        accumsan risus in est dignissim fermentum. Duis sodales purus sed efficitur facilisis. Sed
        et sem iaculis, cursus nulla et, hendrerit lorem. Morbi lacinia risus in ornare pretium.
        Fusce ac hendrerit turpis. Donec placerat, elit non laoreet tempor, velit odio gravida
        tortor, quis vehicula sapien ante eget ligula. Aenean efficitur nunc sit amet maximus
        eleifend. Maecenas cursus fermentum tellus, sodales commodo dui cursus et. Pellentesque
        tempor iaculis lectus ut malesuada. Morbi ornare lectus ut massa vestibulum, in pellentesque
        arcu scelerisque. Aenean nec metus condimentum, sagittis lacus sollicitudin, cursus mauris.
        Quisque in cursus turpis. In urna metus, consequat id lacus sed, ultrices feugiat diam.
        Fusce eu consequat lacus. Sed ac semper massa. Nullam vestibulum maximus viverra. Phasellus
        a dui et mauris lobortis vehicula vitae ac leo. Integer tincidunt felis leo, quis mattis ex
        posuere nec.
      </p>
    </div>
  );
}

export default Index;
