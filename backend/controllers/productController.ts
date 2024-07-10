import productModel from "../models/productModel";
import { Request, Response } from "express";
import fs from "fs";
import slugify from "slugify";

interface CustomFields {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  shipping?: string;
}

interface CustomFiles {
  photo?: {
    path: string;
    type: string;
  };
}

interface ProductPhoto {
  data: Buffer;
  contentType: string;
}

export const createProductController = async (req: Request, res: Response) => {
  try {
    const fields = req.fields as unknown as CustomFields;
    const files = req.files as unknown as CustomFiles;
    const { name, description, category, price, quantity, shipping } = fields;
    const photo = files?.photo;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(400).send({ error: "Description is required" });
    }
    if (!price) {
      return res.status(400).send({ error: "Price is required" });
    }
    if (!category) {
      return res.status(400).send({ error: "Category is required" });
    }
    if (!quantity) {
      return res.status(400).send({ error: "Quantity is required" });
    }

    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      category,
      price,
      quantity,
      shipping,
    }) as unknown as any;

    if (photo) {
      product.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }
    // console.log("product is ", product);

    await product.save();
    // const allProducts = await productModel.find({});
    // console.log("all ", allProducts);

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error: error,
    });
  }
};
export const getProductsController = async (req: Request, res: Response) => {
  try {
    const allProducts = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      countTotal: allProducts.length,
      message: "all products deatils",
      products: allProducts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while getting all the products ",
      error: error,
    });
  }
};

export const getSingleProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    console.log("single product is", product);

    return res.status(200).send({
      success: true,
      message: "product details succesfull",
      product: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while getting all the products ",
      error: error,
    });
  }
};
export const productPhotoController = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product?.photo?.data) {
      res.set("Content-type", product?.photo?.contentType || "");
      return res.status(200).send({
        success: true,
        data: product?.photo?.data,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while getting prodcut photo ",
      error: error,
    });
  }
};
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
export const updateProductController = async (req: Request, res: Response) => {
  try {
    console.log("logging accesing", req.params.pid);

    const fields = req.fields as unknown as CustomFields;
    const files = req.files as unknown as CustomFiles;

    console.log("Fields received:", fields);
    console.log("Files received:", files);

    if (!fields) {
      return res.status(400).send({ error: "No fields provided" });
    }
    const { name, description, category, price, quantity, shipping } = fields;
    const photo = files?.photo;
    console.log("fields are", fields);

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(400).send({ error: "Description is required" });
    }
    if (!price) {
      return res.status(400).send({ error: "Price is required" });
    }
    if (!category) {
      return res.status(400).send({ error: "Category is required" });
    }
    if (!quantity) {
      return res.status(400).send({ error: "Quantity is required" });
    }

    const product = (await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    )) as unknown as any;

    if (photo) {
      product.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

export const productFiltersController = async (req: Request, res: Response) => {
  console.log("hii deoeo");

  try {
    const { checked, radio } = req.body;
    console.log(req.body);

    let args: any = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args).select("-photo");
    console.log(":products are detail", products);

    if (products) {
      res.status(200).send({
        success: true,
        message: "product filter succesfully",
        products: products,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: "error by filtering product",
      });
    }
  } catch (error) {
    return res.status(501).send({
      success: false,
      error: error,
      message: "error by filtering product",
    });
  }
};
