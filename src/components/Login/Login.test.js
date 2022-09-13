import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("<Login />", () => {
	it("renders correctly.", () => {
		render(<Login />);

		const headerText = screen.getByText(/smart mirror/i);
		expect(headerText).toBeDefined();

		const btns = screen.getAllByRole("button");
		expect(btns).toHaveLength(2);
	});
});
