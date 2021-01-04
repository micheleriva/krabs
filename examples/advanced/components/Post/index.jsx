import Link from 'next/link';

function Post({ title, image, subtitle, slug }) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="cursor-pointer">
        <div>
          {' '}
          <img src={image} />{' '}
        </div>
        <div className="font-bold text-2xl mt-2 mb-2"> {title} </div>
        <div> {subtitle} </div>
      </div>
    </Link>
  );
}

export default Post;
