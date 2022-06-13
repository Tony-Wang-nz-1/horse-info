import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import ListHorse from "../component/organisms/ListHorses";
import { GET_HORSE } from "../api/queries/horse";

it("renders without error", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]} addTypename={false}>
      <ListHorse />
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree.children).toContain("Loading...");
});

it("should render horse", async () => {
  const mocks = [
    {
      request: {
        query: GET_HORSE,
      },
      result: {
        data: {
          horse: [
            {
              id: "501c0910-ff31-4b1c-808b-906b02b4dec6",
              name: "Thunderdash",
              profile: {
                favouriteFood: "Hot Chips",
                physical: { height: 200, weight: 450 },
              },
            },
          ],
        },
      },
    },
  ];

  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ListHorse />
    </MockedProvider>
  );

  const name = await findByText("Thunderdash");

  expect(name).toBeInTheDocument();
});
