## Overwatch Data
This web application displays information about Overwatch characters. Users can explore a dashboard view, click on individual characters to see detailed info, and view data visualizations that reveal trends and comparisons across the different characters.


Tech used: HTML, CSS, JavaScript, React, Vite, Recharts
This project was built using React and Vite, with character data fetched from an Overwatch-related dataset. The dashboard view includes interactive charts created using Recharts, giving users visual insight into different attributes across the characters.

Each character in the list links to a detail page with expanded information. The sidebar remains consistent across all pages, maintaining navigation and layout. Routing is handled via React Router, and each detail page has a unique URL.

Two distinct charts were added to the dashboard—each focused on a different aspect of the characters. The user can toggle visualizations to customize the view.

Lessons Learned:
I struggled a bit with setting up the charts and figuring out how to feed the fetched data into the Recharts components. Another challenge was making sure each character name linked correctly to its own detail page while keeping the sidebar visible. Once I figured out the data flow and layout structure, it became easier to piece the pages together.

