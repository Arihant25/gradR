import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen animate-gradient-flow bg-gradient-to-r from-gay-blue via-indigo-500 to-dark-cerulean">
      {/* GitHub link */}
      <div className="fixed top-0 right-0 m-4 sm:m-6 md:m-8">
        <a
          href="https://github.com/Arihant25/grades-calculator-iiith"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-gray-600 font-semibold py-2 px-4 rounded-md hover:bg-vivid-cerulean hover:text-white transition-colors duration-200 flex items-center"
        >
          {/* GitHub logo SVG */}
          <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Contribute on GitHub
        </a>
      </div>

      {/* Hero */}
      <div className="flex-grow flex flex-col justify-around items-center px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-3xl md:text-5xl font-bold text-white mb-2">
            Welcome to
          </h2>
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white">
            GradR
          </h1>
          <div className="text-center my-6">
            <Link
              href="/sem"
              className="bg-white text-l text-gray-600 font-bold py-3 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-vivid-cerulean hover:text-white transition-colors duration-200 p-63"
            >
              Calculate Course Percentage
            </Link>
          </div>
          <div className='my-10'>
            <Link
              href="/sgpa"
              className="bg-white text-l text-gray-600 font-bold py-3 sm:py-3 px-2 mx-4 sm:px-12 rounded-md hover:bg-vivid-cerulean hover:text-white transition-colors duration-200 p-63"
            >
              Calculate SGPA
            </Link>
            <Link
              href="/cgpa"
              className="bg-white text-l text-gray-600 font-bold py-3 sm:py-3 px-2 mx-4 sm:px-6 rounded-md hover:bg-vivid-cerulean hover:text-white transition-colors duration-200 p-63"
            >
              Calculate CGPA
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-4 text-center px-4 sm:px-8 md:px-12 lg:px-16">
        <p>
          Made with 💖 by Arihant25, AviLOL and{' '}
          <a
            href="https://github.com/Arihant25/grades-calculator-iiith/graphs/contributors"
            className="text-yellow-200 hover:text-yellow-500 transition-colors duration-200"
          >
            others
          </a>
        </p>
      </footer>
    </div>
  );
}