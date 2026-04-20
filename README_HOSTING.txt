Turtle Tales - GoDaddy Ready Package

What this package is:
- A reorganized static export of your Wix-generated site.
- Homepage is in the root as index.html.
- Inner pages are in:
  /about-lana/
  /community-survey/
  /turtle-tales-story/
  /workshop-chapters/

Important limitation:
- This is still Wix-generated code, not clean hand-written source.
- Some media, forms, analytics, and dynamic features may still call Wix services.
- It is upload-ready for static hosting, but a fully independent non-Wix rebuild would be a separate job.

How to test locally in VS Code on Windows:
1. Extract this zip.
2. Open the folder in VS Code.
3. Install the Live Server extension.
4. Right-click index.html -> Open with Live Server.
5. Check all navigation links and forms.

How to upload to GoDaddy:
1. Buy/connect your domain in GoDaddy.
2. Open GoDaddy File Manager or FTP.
3. Upload all files and folders from this package into public_html.
4. Make sure index.html sits directly inside public_html.
5. Visit your domain and test each page.

What I changed:
- Flattened the homepage to root index.html.
- Renamed page entry files from resource_0.html to index.html.
- Organized page folders by page slug.
- Added a .htaccess helper for cleaner URLs.
- Replaced old Wix page URLs with relative local paths where possible.
