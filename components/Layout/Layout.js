const Layout = ({ children }) => {
  return (
    <main className="lg:w-1/2 lg:mx-auto xl:w-1/3 flex flex-col h-screen px-5">
      {children}
    </main>
  );
};

export default Layout;