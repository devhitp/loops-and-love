// ==========================================
// PRODUCT MODAL
// ==========================================
import {
    addProduct,
    updateProduct,
    deleteProduct,
    listenToProducts
} from "../../firebase/firestore.js";
import {
    uploadProductImage
} from "../../firebase/cloudinary.js";


const addProductBtn =
    document.querySelector(".add-product-btn");


const productModal =
    document.querySelector("#product-modal");
const searchInput =
    document.querySelector("#product-search");

const closeModal =
    document.querySelector("#close-modal");
const deleteModal =
    document.querySelector("#delete-modal");

const deleteMessage =
    document.querySelector("#delete-message");

const cancelDelete =
    document.querySelector("#cancel-delete");

const confirmDelete =
    document.querySelector("#confirm-delete");

let deleteProductId = null;

const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toast-message");
const imageInput =
    document.querySelector("#product-image");

const imagePreview =
    document.querySelector("#image-preview");

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("active");

    setTimeout(() => {

        toast.classList.remove("active");

    }, 2500);

}


// OPEN MODAL

if (addProductBtn) {

    addProductBtn.addEventListener(
        "click",
        () => {

            productModal.classList.add(
                "active"
            );

        });

}




// CLOSE MODAL

if (closeModal) {

    closeModal.addEventListener(
        "click",
        () => {

            productModal.classList.remove(
                "active"
            );

        });

}



// CLOSE WHEN CLICKING OUTSIDE


if (productModal) {

    productModal.addEventListener(
        "click",
        (e) => {

            if (e.target === productModal) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );

}
// ==========================================
// ADD PRODUCT
// ==========================================


const productForm =
    document.querySelector("#product-form");
if (imageInput) {

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        imagePreview.src = URL.createObjectURL(file);

        imagePreview.style.display = "block";

        imagePreview.style.width = "150px";
        imagePreview.style.height = "150px";
        imagePreview.style.border = "2px solid red";

        console.log(imagePreview.src);

    });

}

if (productForm) {

    productForm.addEventListener(
        "submit",
        async function (e) {



            e.preventDefault();



            const editId =
                document.querySelector("#edit-product-id").value;


            const selectedFile = imageInput.files[0];

            let imageURL = "";

            try {

                if (selectedFile) {

                    imageURL = await uploadProductImage(selectedFile);

                    console.log("Uploaded Image:", imageURL);

                }

            }
            catch (error) {

                console.error(error);

                alert("Image upload failed.");

                return;

            }

            const product = {

                name:
                    document.querySelector("#product-name")
                        .value
                        .trim(),

                category:
                    document.querySelector("#product-category")
                        .value
                        .trim(),

                price:
                    Number(
                        document.querySelector("#product-price")
                            .value
                    ),

                image: imageURL,

                badge: "NEW",

                description:
                    document.querySelector("#product-description")
                        .value
                        .trim(),

                stock:
                    Number(
                        document.querySelector("#product-stock")
                            .value
                    )

            };





            // Get existing products






            // Add new product
            // const editId =
            //     document.querySelector("#edit-product-id").value;



            if (editId) {

                await updateProduct(
                    editId,
                    product
                );

            }
            else {

                await addProduct(
                    product
                );

            }





            showToast(
                editId
                    ? "Product updated successfully!"
                    : "Product added successfully!"
            );



            document.querySelector("#edit-product-id").value = "";

            document.querySelector("#modal-title").textContent =
                "Add Product";

            document.querySelector("#save-product-btn").textContent =
                "Save Product";

            productForm.reset();



            productModal.classList.remove(
                "active"
            );



        });
}

// ==========================================
// DISPLAY PRODUCTS
// ==========================================


const productsTable =
    document.querySelector(".products-table");

let allProducts = [];



function renderProducts(products) {



    // remove old rows

    document
        .querySelectorAll(".product-row")
        .forEach(row => row.remove());



    const emptyMessage =
        document.querySelector(".empty-products");



    if (products.length === 0) {

        emptyMessage.style.display =
            "block";

        return;

    }



    emptyMessage.style.display =
        "none";

    const keyword =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";

    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(keyword)
        );

    filteredProducts.forEach(product => {


        const row =
            document.createElement("div");


        row.className =
            "product-row";

        row.dataset.id = product.id;

        row.innerHTML = `


        <span>

        <img 
        src="${product.image}"
        class="admin-product-image"
        >

        </span>



        <span>

        ${product.name}

        </span>



        <span>

        ₹${product.price}

        </span>



        <span>

        ${product.stock}

        </span>



        <span class="action-buttons">

    <button
        class="edit-btn"
        title="Edit Product"
    >
        <i class="fa-solid fa-pen"></i>
    </button>

    <button
        class="delete-btn"
        title="Delete Product"
    >
        <i class="fa-solid fa-trash"></i>
    </button>

</span>


        `;



        productsTable.appendChild(row);



    });


}
// ==========================================
// DELETE PRODUCT
// ==========================================


document.addEventListener(
    "click",
    async function (e) {

        if (!e.target.closest(".delete-btn")) return;

        const row =
            e.target.closest(".product-row");

        deleteProductId =
            row.dataset.id;

        const productName =
            row.children[1].textContent.trim();

        deleteMessage.textContent =
            `Are you sure you want to delete "${productName}"?`;

        deleteModal.classList.add("active");

    }
);
if (cancelDelete) {

    cancelDelete.addEventListener(
        "click",
        () => {

            deleteModal.classList.remove("active");

            deleteProductId = null;

        }
    );

}


if (confirmDelete) {

    confirmDelete.addEventListener(
        "click",
        async () => {

            await deleteProduct(deleteProductId);



            showToast("Product deleted successfully!");

            deleteModal.classList.remove("active");

            deleteProductId = null;

        }
    );
}
// ==========================================
// EDIT PRODUCT
// ==========================================


document.addEventListener(
    "click",
    async function (e) {


        const editButton =
            e.target.closest(".edit-btn");

        if (!editButton) return; {


            const row =
                e.target.closest(".product-row");

            const productId =
                row.dataset.id;

            const product =
                allProducts.find(
                    p => p.id === productId
                );

            if (!product) return;




            document.querySelector("#modal-title")
                .textContent =
                "Edit Product";



            document.querySelector("#save-product-btn")
                .textContent =
                "Update Product";




            document.querySelector("#edit-product-id")
                .value =
                product.id;



            document.querySelector("#product-name")
                .value =
                product.name;



            document.querySelector("#product-category")
                .value =
                product.category;



            document.querySelector("#product-price")
                .value =
                product.price;



            document.querySelector("#product-image")
                .value =
                product.image;



            document.querySelector("#product-description")
                .value =
                product.description;



            document.querySelector("#product-stock")
                .value =
                product.stock;



            productModal.classList.add(
                "active"
            );

        }


    });
if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            renderProducts(allProducts);

        }
    );
}


listenToProducts((products) => {

    allProducts = products;

    renderProducts(allProducts);

});