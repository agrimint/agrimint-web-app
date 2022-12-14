const Layout = ({ padding = false, children }) => {
  return (
    <main className={`flex flex-col h-screen ${padding && `xl:w-1/3 lg:w-1/2 lg:mx-auto px-5 text-gray-900 bg-gray-100`}`}>
      {children}
    </main>
  );
};

export default Layout;