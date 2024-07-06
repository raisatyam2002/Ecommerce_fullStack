import { Request, Response } from "express";

import slugify from "slugify";
import categoryModel from "../models/categoryModel";
import category from "../models/categoryModel";
export const categoryController = async (req: Request, res: Response) => {
  console.log("accesing");

  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(201).send({
        success: "true",
        message: "category already exist",
      });
    } else {
      const category = await new categoryModel({
        name: name,
        slug: slugify(name),
      }).save();
      console.log(category);
      res.status(201).send({
        success: false,
        message: "new catgegory created",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: true,
      error: error,
      message: "error in category",
    });
  }
};
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { updateName } = req.body;
    console.log(updateName);

    const id = req.params.id.trim();
    console.log(id);

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name: updateName, slug: slugify(updateName) },
      { new: true }
    );

    console.log(category);

    res.status(201).send({
      success: true,
      message: "updated category successfully",
      category: category,
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "error while updating",
      error: error,
    });
  }
};
export const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const allCatgeory = await categoryModel.find({});
    console.log(allCatgeory);
    res.status(200).send({
      success: true,
      message: "got all category",
      category: allCatgeory,
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "error while getting all category",
      error: error,
    });
  }
};
export const singleCategoryConroller = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug.trim();
    console.log(slug);
    const singleCategory = await categoryModel.findOne({ slug: slug });
    res.status(200).send({
      success: true,
      message: "got single category",
      category: singleCategory,
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "error while getting single category",
      error: error,
    });
  }
};
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "deleted category successfully",
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "error while deleting category",
      error: error,
    });
  }
};
