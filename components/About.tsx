import Head from 'next/head';

export function About() {
  return (
    <>
      <Head>
        <title className='text-white'>About | My Website</title>
        <meta name="description" content="Learn more about our website and team." />
      </Head>
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4 text-white">About Us</h1>
        <p className="mb-4 text-white">Welcome to our website! We are a team of developers passionate about creating high-quality web applications.</p>
        <p className="mb-4 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel purus vitae mauris scelerisque congue. Praesent iaculis, felis quis volutpat tristique, arcu lorem auctor nulla, in feugiat diam justo quis velit.</p>
        <p className="mb-4 text-white">Donec at semper nisi. Vestibulum eu leo auctor, pretium magna ac, iaculis dolor. Sed bibendum sollicitudin est, non gravida sem euismod ac. Nam sit amet mi orci. Cras nec mauris eu diam aliquet luctus ut eu elit.</p>
      </div>
    </>
  );
}
