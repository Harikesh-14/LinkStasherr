import Features from "@/components/features";

export default function About() {
  return (
    <main>
      <div className="relative mt-[4.3rem]">
        <div className="w-full bg-black dark:opacity-40">
          <img
            src="/about-us-hero-section.png"
            alt="About us hero section"
            className="w-full h-96 object-cover object-center"
          />
        </div>
        <div className="absolute w-full px-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-xl font-medium">About Us</h1>
          <p className="mt-2 text-4xl text-gray-300 font-bold leading-10 tracking-tight sm:text-5xl sm:leading-none">Learn more about our me</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-5 text-center">
        <p className="text-sm font-semibold tracking-wide uppercase">Who We Are</p>
        <h1
          className="mt-2 text-3xl font-bold leading-10 tracking-tight text-[#6D28D9] sm:text-4xl sm:leading-none">LinkStasherr.com</h1>
        <p className="mt-4 text-gray-500">
          LinkStasherr.com is a platform that allows you to store your links in one place. You can save, organize, and share your links with your friends and family. You can also discover new links from other users on the platform. It's a great way to keep track of all the links you come across on the internet.
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto flex flex-col justify-center items-center gap-5 md:flex-row mt-10 p-5 text-center">
        <div className="">
          <div className="border-8 border-[#6D28D9] rounded-full w-72 h-72 p-2 flex items-center justify-center">
            <img
              src="/my-photo.jpg"
              alt="My photo"
              className="w-72 h72 mx-auto rounded-full"
            />
          </div>
        </div>
        <div
          className="max-w-lg p-5 text-justify"
        >
          <h2 className="mt-5 text-2xl font-bold text-[#6D28D9]">Meet Harikesh Ranjan Sinha</h2>
          <h1 className="mt-2 text-3xl font-bold leading-10 tracking-tight  sm:text-4xl sm:leading-none">Full Stack Web Developer</h1>
          <p className="mt-2 text-gray-500">
            Hi, I'm Harikesh Ranjan Sinha, a Full Stack Web Developer based in India. I have a passion for web development and love to create websites and web applications that are user-friendly and visually appealing. I have experience working with a variety of technologies, including HTML, CSS, JavaScript, React, Node.js, and MongoDB. I'm always looking to learn new things and improve my skills as a developer.
          </p>
          <p className="mt-4 text-gray-500">
            I created LinkStasherr.com as a side project to showcase my skills and provide a useful tool for people to store and share their links. I hope you enjoy using the platform and find it helpful in organizing your links. If you have any feedback or suggestions, feel free to reach out to me. I'm always looking to improve the platform and make it better for users.
          </p>
          <p className="mt-4 text-gray-500">
            Stay tuned for more updates and new features coming soon to LinkStasherr.com. Thank you for your support and happy linking!
          </p>
        </div>
      </div>

      <Features title="What we offer" />
    </main>
  );
}