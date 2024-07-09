import * as React from "react";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import { log } from "console";

export default function SelectFormSubmission({
  categories,
  category,
  setCategory,
}: any) {
  console.log("category is ", category);

  return (
    <div>
      <Stack spacing={2} alignItems="flex-start">
        <Select
          placeholder="Select a category"
          name="category"
          required
          sx={{ width: 700 }}
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue);
          }}
        >
          {categories.map((category: any) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Stack>
    </div>
  );
}
