import { makeGetAllCategories } from "@/models/categories/factories/make-all-categories";
import { makeCreateCategory } from "@/models/categories/factories/make-create-category";

const initialCategories = [
  {
    name: "Smartphones",
    description: "Uma categoria dedicada a smartphones de última geração.",
  },
  {
    name: "Televisores",
    description:
      "Categoria de televisores com qualidade de imagem HD, 4K e superiores.",
  },
  {
    name: "Notebooks",
    description: "Notebooks de alto desempenho para trabalho e entretenimento.",
  },
  {
    name: "Tablets",
    description: "Tablets para estudo, leitura e entretenimento.",
  },
  {
    name: "Fones de Ouvido",
    description: "Fones de ouvido com e sem fio, com alta qualidade de som.",
  },
  {
    name: "Smartwatches",
    description: "Relógios inteligentes que monitoram saúde e conectividade.",
  },
];

export async function insertInitialCategories() {
  try {
    const createProduct = makeCreateCategory();
    const getAllCategories = makeGetAllCategories();

    const categories = await getAllCategories.execute();
    if (!categories || !(categories.length > 0)) {
      for (const category of initialCategories) {
        await createProduct.execute(category);
      }
    }
  } catch (error) {
    throw new Error(
      `Error inserting initial categories ${(error as Error).message}`,
    );
  }
}
