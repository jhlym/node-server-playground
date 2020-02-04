import { Service } from "typedi";
import { Category } from "../models/Category";

@Service()
export class CategoryService {
  private categories = [new Category(1, "Society"), new Category(2, "Technology"), new Category(3, "Politics"), new Category(4, "Economy"), new Category(5, "Sports")];

  findAll() {
    return Promise.resolve(this.categories);
  }

  findOne(id: number) {
    let foundCategory: any = undefined;
    this.categories.forEach(category => {
      if (category.id === id) foundCategory = category;
    });
    return foundCategory;
  }

  save(category: Category) {
    this.categories.push(category);
    return category;
  }

  remove(id: number) {
    const category = this.findOne(id);
    if (category) this.categories.splice(this.categories.indexOf(category), 1);

    return category;
  }
}
