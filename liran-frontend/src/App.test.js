// import { render, screen } from "@testing-library/react";
// import App from "./components/App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react'
import FirstTest from './tests/FirstTest';

test("Example 1 renders successfully", () => {
    render(<FirstTest />);

    const element = screen.getByText(/first test/i);

    expect(element).toBeInTheDocument();
})
