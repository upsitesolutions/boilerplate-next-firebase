import { collection, getDocs, Firestore, doc, setDoc } from "firebase/firestore";

import { Category } from "../../../types/category";

export const getCategoriesCollection = (db: Firestore) =>
    collection(db, "categories").withConverter<Category>({
        toFirestore: (category) => ({
            ...category,
        }),
        fromFirestore: (snapshot) => {
            const data = snapshot.data();
            return data as Category;
        },
    });

export async function getCategories(db: Firestore) {
    const categoriesCollection = getCategoriesCollection(db);
    const querySnapshot = await getDocs(categoriesCollection);

    const categories: Category[] = [];
    querySnapshot.forEach((doc) => {
        categories.push(doc.data());
    });
    return categories;
}

export async function createCategory(db: Firestore, category: Category) {
    const categoriesCollection = getCategoriesCollection(db);
    const id = category.id;
    const docRef = doc(categoriesCollection, id);
    await setDoc(docRef, category, { merge: true });
}
