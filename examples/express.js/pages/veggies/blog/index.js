import Post from '../../../components/Post';
import posts from '../../../data/veggies/posts';

function Blog() {
  return (
    <div className="grid gap-4 grid-cols-3">
      {posts.map((post) => (
        <Post key={post.title} {...post} />
      ))}
    </div>
  );
}

export default Blog;
