// ponytail: Hostinger's edge serves the static root index.html directly for
// "/", bypassing the .htaccess redirect to /es/. React's router already
// handles "/" client-side but via history.replaceState, which Google does
// NOT treat as a redirect. location.replace() is a real navigation Google
// follows, closing the soft-404 / duplicate-canonical gap for bare root.
if (location.pathname === "/") location.replace("/es/");
