const Layout = ({ children }) => {
  return (
    <main className="lg:w-1/2 lg:mx-auto xl:w-1/3 p-3">
      {children}
    </main>
  );
};

export default Layout;