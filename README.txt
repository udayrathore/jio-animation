JioStar concept — Osmo Supply Globe Gallery

Run: npm start
Open: http://127.0.0.1:4173/
No install/build required. Node.js and internet access for GSAP are needed.

The original custom spiral has been replaced with the supplied Osmo Globe Gallery.
Its 7 rows, 18 columns, seeded shuffle, taper, matrix3d projection, edge/back
opacity and GSAP ticker-driven rotation are retained. All data-globe-gallery-*
attributes are preserved. The page adds pause/turn/drag controls, an image index,
full-size viewer, and the existing center pin with 30% scroll enlargement.
The no-crop preference is retained via object-fit: contain.

10 recovered original assets are included. The earlier conversation referred to
11 attachments, but only 10 were available. Source cards are in index.html;
the index and viewer use images.json. Update both when adding an image.
The resource's duplicate cards remain inert as supplied; all images can be
opened through the index. Original cards also open the viewer.

Files: globe-gallery.js and globe-gallery.css contain the replacement resource
and scoped integration styles; app.js handles the surrounding page controls.
The menu, accessibility controls, search and no-language-selector header remain.

Verified: JavaScript syntax, desktop rendering, scroll pin/enlargement,
image index and viewer. Physical-device touch behavior has not been tested.

Adjust popup: use the bottom-right Adjust button for live row/column density,
globe scale, horizontal/vertical offset, and headline size. Fewer rows/columns
produce larger image cards. Settings save to this browser's localStorage;
Reset restores the original defaults. The fixed popup does not reflow the page.
Verified live density changes, sliders, reset, and persistence after reload.
