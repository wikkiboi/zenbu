export default function Footer() {
  return (
    <footer className="text-center min-h-[100px] py-4">
      <div>
        Powered by{" "}
        <a href="https://jikan.moe/" className="underline">
          Jikan API
        </a>
      </div>
      Deployed on{" "}
      <a href="https://netlify.com/" className="underline hover:text-white">
        Netlify
      </a>{" "}
      |{" "}
      <a
        href="https://github.com/wikkiboi/zenbu"
        className="underline hover:text-white"
      >
        GitHub
      </a>
    </footer>
  );
}
