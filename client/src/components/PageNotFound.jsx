const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-muted">404</h1>
        <p className="mt-2 text-lg  text-muted">Page not found.</p>
        <p className="mt-4 text-sm  text-muted">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
