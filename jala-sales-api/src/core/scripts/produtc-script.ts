import { makeGetAllCategories } from "@/models/categories/factories/make-all-categories";
import { makeCreateProduct } from "@/models/products/factories/make-create-product";
import { makeListSortProducts } from "@/models/products/factories/make-list-sort-products";
import { makeGetUserByEmail } from "@/models/users/factories/make-get-user-by-email";
import { makeRegisterUser } from "@/models/users/factories/make-register-user";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

const initialProducts = [
  {
    name: "iPhone 14 Pro",
    description:
      "Smartphone de última geração com 512GB de armazenamento e câmera de alta qualidade.",
    price: 1500,
    stock: 10,
    categoryId: "Smartphones",
    sellerId: "",
    image: "https://i.imgur.com/BqQJ7ct.png",
  },

  {
    name: "iPad Pro 11”",
    description:
      "Tablet da Apple com tela de 11 polegadas e suporte ao Apple Pencil.",
    price: 1100,
    stock: 12,
    categoryId: "Tablets",
    sellerId: "",
    image: "https://i.imgur.com/T82M05R.png",
  },

  {
    name: "AirPods Pro",
    description:
      "Fones de ouvido sem fio com cancelamento ativo de ruído da Apple.",
    price: 250,
    stock: 30,
    categoryId: "Fones de Ouvido",
    sellerId: "",
    image: "https://i.imgur.com/B2Ry3Hu.png",
  },

  {
    name: "HP Spectre x360",
    description:
      "Notebook conversível com tela touch de 13 polegadas e 512GB de SSD.",
    price: 1600,
    stock: 8,
    categoryId: "Notebooks",
    sellerId: "",
    image: "https://i.imgur.com/5CQyUYZ.png",
  },
  {
    name: "Asus ROG Zephyrus G14",
    description:
      "Notebook gamer com processador AMD Ryzen 9 e GPU Nvidia RTX 3060.",
    price: 2200,
    stock: 5,
    categoryId: "Notebooks",
    sellerId: "",
    image: "https://i.imgur.com/BGb5e1C.png",
  },

  {
    name: "Lenovo Tab P11 Pro",
    description:
      "Tablet Android com tela OLED de 11.5 polegadas e som Dolby Atmos.",
    price: 600,
    stock: 14,
    categoryId: "Tablets",
    sellerId: "",
    image: "https://i.imgur.com/WBjQo9f.png",
  },
  {
    name: "JBL Tune 750BTNC",
    description:
      "Fones de ouvido sem fio com cancelamento de ruído e até 15 horas de bateria.",
    price: 130,
    stock: 25,
    categoryId: "Fones de Ouvido",
    sellerId: "",
    image: "https://i.imgur.com/c6kaR1J.png",
  },
  {
    name: "Lenovo Tab P11 Pro",
    description:
      "Tablet Android com tela OLED de 11.5 polegadas e som Dolby Atmos.",
    price: 600,
    stock: 14,
    categoryId: "Tablets",
    sellerId: "",
    image: "https://i.imgur.com/WBjQo9f.png",
  },
  {
    name: "JBL Tune 750BTNC",
    description:
      "Fones de ouvido sem fio com cancelamento de ruído e até 15 horas de bateria.",
    price: 130,
    stock: 25,
    categoryId: "Fones de Ouvido",
    sellerId: "",
    image: "https://i.imgur.com/c6kaR1J.png",
  },
  {
    name: "Bose QuietComfort 35 II",
    description:
      "Fones de ouvido com cancelamento de ruído e som de alta qualidade da Bose.",
    price: 300,
    stock: 18,
    categoryId: "Fones de Ouvido",
    sellerId: "",
    image: "https://i.imgur.com/5oZbViC.png",
  },
  {
    name: "Fitbit Versa 3",
    description:
      "Relógio inteligente com GPS integrado e monitoramento contínuo de frequência cardíaca.",
    price: 230,
    stock: 22,
    categoryId: "Smartwatches",
    sellerId: "",
    image: "https://i.imgur.com/j4OMbxO.png",
  },
  {
    name: "Garmin Fenix 6",
    description:
      "Smartwatch resistente com funcionalidades avançadas para atividades ao ar livre.",
    price: 600,
    stock: 10,
    categoryId: "Smartwatches",
    sellerId: "",
    image: "https://i.imgur.com/XwsFEoN.png",
  },
  {
    name: "Huawei Mate 40 Pro",
    description:
      "Smartphone com câmera Leica e processador Kirin 9000 para alto desempenho.",
    price: 1300,
    stock: 12,
    categoryId: "Smartphones",
    sellerId: "",
    image: "https://i.imgur.com/8L1r7rV.png",
  },
  {
    name: "Lenovo Yoga C940",
    description:
      "Notebook 2 em 1 com tela de 14 polegadas, touch screen e 1TB de SSD.",
    price: 1700,
    stock: 7,
    categoryId: "Notebooks",
    sellerId: "",
    image: "https://i.imgur.com/pPChhJT.png",
  },
];

export async function insertInitialProducts() {
  try {
    let user: string;
    const getAllProducts = makeListSortProducts();
    const products = await getAllProducts.execute({
      query: "name",
      sort: "asc",
    });
    if (products.length > 0) return;

    const userRegister = makeRegisterUser();
    const getUser = makeGetUserByEmail();
    const getUserByEmail = await getUser.execute("john@gmail.com");

    if (getUserByEmail) {
      user = getUserByEmail.id;
    } else {
      const createdUser = await userRegister.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "passwd123",
      });
      await db
        .update(users)
        .set({ role: "seller" })
        .where(eq(users.id, createdUser.userId));
      user = createdUser.userId;
    }

    const getAllCategories = makeGetAllCategories();
    const categories = await getAllCategories.execute();
    const createProduct = makeCreateProduct();

    for (const product of initialProducts) {
      const categoryId = categories?.find((c) => c.name === product.categoryId);
      if (!categoryId) continue;

      const currentProduct = {
        ...product,
        sellerId: user,
        categoryId: categoryId.id,
      };

      await createProduct.execute(currentProduct);
    }
  } catch (error) {
    throw new Error("Error inserting initial categories");
  }
}
