function Header({ handler }) {
  return (
    <div id="header" className="flex flex-row justify-between px-10 py-5">
      <div className="flex flex-row gap-3">
        <img alt="extensionIcon" src="/assets/caticon.png" className="size-6" />
        <p>Chrome Extension Checker</p>
      </div>
      <div className="flex flex-row gap-3">
        <img
          id="extensionIcon"
          src="/assets/puzzle.png"
          alt="search"
          className="size-6 invert cursor-pointer"
          onClick={() => handler(false)}
          title="View Browser Extensions"
        />
        <img
          id="searchIcon"
          src="/assets/search.png"
          alt="search"
          className="size-6 invert cursor-pointer"
          onClick={() => handler(true)}
          title="Upload Extension Link"
        />
      </div>
    </div>
  );
}

export default Header;
