import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ADD_HORSE } from "../api/queries/horse";

import AddOrEditHorseForm from "../component/organisms/AddOrEditHorseForm";

it("should show validation on blur", async () => {
  const { findByText, getByText } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <AddOrEditHorseForm close={() => {}} />
    </MockedProvider>
  );

  const button = getByText("Submit");
  fireEvent.click(button);

  const name = await findByText("Name is required");

  expect(name).toBeInTheDocument();
});
