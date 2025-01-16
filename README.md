# Drag and Drop Html Builder ✨

## Tech

- Vue.js
- VueDraggable
- Vanilla CSS
- TypeScript

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Check `localhost:5173` in your Browser

## Features

- Text Block
- Image Block
- Export to JSON AST
- Duplicate, Reorder, Remove and Rename Blocks
- Mobile Friendly

## Notes

1. I built a simple AST-to-HTML parser in order to find what properties I would need to have in the "AST".
2. I moved to creating the UI on top of the AST. Before styling the UI I and make the code modular, I ensured that I had every required feature working.
3. I started doing some code optimizations such as having a single Edit Image Component Instance.
4. To the User Interface I chose a Mobile First approach then I adapted to the Desktop Size.
5. I noticed a TypeScript assertion failing in the dynamic component instanciation. As the props are bounded to the current node in the loop this should not be a problem.
