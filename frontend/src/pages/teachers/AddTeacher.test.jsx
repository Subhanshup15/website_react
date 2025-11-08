import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddTeacher from "./AddTeacher";
import api from "../../api/axios";

// Mock API and navigation
vi.mock("../../api/axios", () => ({
  default: { post: vi.fn() }
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe("AddTeacher Page", () => {
  it("submits form and redirects", async () => {

    render(
      <BrowserRouter>
        <AddTeacher />
      </BrowserRouter>
    );

    // Fill form
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Phone"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Qualification"), { target: { value: "BSc" } });
    fireEvent.change(screen.getByPlaceholderText("Department"), { target: { value: "Science" } });

    // Submit form
    fireEvent.click(screen.getByText("Save"));

    expect(api.post).toHaveBeenCalledWith("/teachers", {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      qualification: "BSc",
      department: "Science"
    });

    expect(mockNavigate).toHaveBeenCalledWith("/teachers");
  });
});
