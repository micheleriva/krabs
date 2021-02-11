import { useRouter } from 'next/router';
import posts from '../../../data/veggies/posts';

export function getStaticPaths() {
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: true,
  };
}

export function getStaticProps(ctx) {
  return {
    props: {
      foo: 'bar',
    },
  },
};

function Slug() {
  const router = useRouter();
  const post = posts.find((post) => post.slug === router.query.slug);

  return (
    <div>
      <img src={post.image} alt={post.title} className="h-96 w-full object-cover" />
      <h1 className="font-bold text-5xl mt-10"> {post.title} </h1>
      <p className="mt-10 mb-10">{post.body}</p>
    </div>
  );
}

export default Slug;
