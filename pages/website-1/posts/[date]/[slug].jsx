function Slug({ params }) {
  return (
    <div>
      Slug: {params.slug}, date: {params.date}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default Slug;
