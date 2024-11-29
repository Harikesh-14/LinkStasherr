import { Scissors } from 'lucide-react';

export default function LinkInput() {
  return (
    <section className="w-full md:w-[35rem] mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[#6D28D9] dark:text-[#A78BFA]">Shorten Your Links</h1>
        <p className="text-gray-600 mt-2 dark:text-gray-400">
          Paste your link below to shorten it
        </p>
      </div>
      <form className="mt-8 flex flex-col md:flex-row items-center">
        <input
          type="text"
          placeholder="Paste your link here"
          className="w-full md:mr-3 md:w-3/4 rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-4 py-3 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED]"
          required
        />
        <button
          type="submit"
          className="flex gap-2 items-center justify-center w-full md:w-1/4 mt-4 md:mt-0 bg-[#6D28D9] text-white rounded-lg py-3 focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
        >
          <Scissors size={20} className="inline-block" />
          Shorten
        </button>
      </form>
    </section>
  );
}