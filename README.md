CvSU Mini Store – Lab 3: React Props and Component Communication

A Mini Product Catalog built with React (Vite). A reusable `ProductCard`
receives data through props, and a callback prop lets each card tell the
parent when an item is added to the cart.

Run

bash
npm install
npm run dev


Guide Questions

1. What is the difference between props and state?
Props are values passed into a component from its parent, and the component
only reads them. State is data a component owns and manages itself, and it can
change over time (using `useState`). When state changes, the component re-renders.

2. Why can a child component not modify the props it receives?
Props are read-only so data flows in one direction, from parent to child. If a
child could change its props, the parent's data would change unexpectedly and
bugs would be hard to trace. Only the component that owns the data can change it.

3. How does the `onAddToCart` callback let data flow from child to parent?
The parent passes a function down as a prop. When the button is clicked, the
child calls that function and passes the product title as an argument. The
function runs in the parent, so the parent receives the data and can update its
own state (the cart count and last added item).

4. Why is the `key` prop required when rendering a list with `.map()`?
React uses the key to identify which item is which between renders. If keys are
missing or duplicated, React may re-use or re-order the wrong elements, which
can cause incorrect updates, lost input state, or warnings in the console.

5. What does the `children` prop allow that a normal prop does not?
It lets a parent put any content (text, elements, other components) between the
opening and closing tags of a component, like `<ProductCard><span>New</span></ProductCard>`.
A normal prop passes a named value, while `children` lets the component wrap and
display nested content, which is useful for flexible layouts like badges.
