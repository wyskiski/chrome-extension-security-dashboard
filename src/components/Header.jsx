function Header() {
  return (
    <div id="header" className="flex flex-row justify-between px-10 py-5">
      <div className="flex flex-row gap-3">
        <img alt="extensionIcon" src="/assets/caticon.png" className="size-6" />
        <p>
          <b>Chrome Extension Checker</b>
        </p>
      </div>
      <img
        id="reloadIcon"
        src="/assets/reload.png"
        alt="reload"
        className="size-6 invert cursor-pointer"
        onClick={switchPage}
      />
    </div>
  );
}

export default Header;
