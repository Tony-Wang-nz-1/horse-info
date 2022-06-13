import React from "react";
import { useFormik } from "formik";
import { isEmpty, isNil } from "ramda";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import { ADD_HORSE, EDIT_HORSE } from "../../api/queries/horse";
import { Horse } from "./ListHorses";

import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

type AddOrEditHorseFormProps = {
  close: () => void;
  horse?: Horse;
};

const AddOrEditHorseForm: React.FC<AddOrEditHorseFormProps> = ({
  close,
  horse,
}) => {
  const { id, name, profile } = horse || {};
  const [addHorse] = useMutation(ADD_HORSE, {
    onCompleted: () => {
      close();
    },
    onError: (err) => {
      close();
    },
  });

  const [editHorse] = useMutation(EDIT_HORSE, {
    onCompleted: () => {
      close();
    },
    onError: (err) => {
      close();
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      favouriteFood: profile?.favouriteFood || "",
      height: profile?.physical?.height || 0,
      weight: profile?.physical?.weight || 0,
    },
    validationSchema,
    onSubmit: ({ name, favouriteFood, height, weight }) => {
      if (!isEmpty(horse) && !isNil(horse)) {
        editHorse({
          variables: {
            editHorseInput: {
              id,
              name,
              profile: {
                favouriteFood,
                physical: {
                  height,
                  weight,
                },
              },
            },
          },
        });
      } else {
        addHorse({
          variables: {
            addHorseInput: {
              name,
              profile: {
                favouriteFood,
                physical: {
                  height,
                  weight,
                },
              },
            },
          },
        });
      }
      close();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          id="name"
          name="name"
          type="text"
          label="name"
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          value={formik.values.name}
          data-testid="name-error"
        />
        <TextField
          id="favouriteFood"
          name="favouriteFood"
          type="text"
          label="favouriteFood"
          onChange={formik.handleChange}
          value={formik.values.favouriteFood}
        />
        <TextField
          id="height"
          name="height"
          type="text"
          label="height"
          onChange={formik.handleChange}
          value={formik.values.height}
        />
        <TextField
          id="weight"
          name="weight"
          type="text"
          label="weight"
          onChange={formik.handleChange}
          value={formik.values.weight}
        />
        <Button onClick={close}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default AddOrEditHorseForm;
