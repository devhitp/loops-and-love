// ==========================================
// PRODUCT MODAL
// ==========================================


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


productModal.addEventListener(
    "click",
    (e) => {


        if (e.target === productModal) {

            productModal.classList.remove(
                "active"
            );

        }


    });
// ==========================================
// ADD PRODUCT
// ==========================================


const productForm =
    document.querySelector("#product-form");


if (productForm) {

    productForm.addEventListener(
        "submit",
        function (e) {



            e.preventDefault();



            const editId =
                document.querySelector("#edit-product-id").value;



            const product = {

                id: editId || Date.now(),


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



                image:
                    document.querySelector("#product-image")
                        .value
                        .trim(),

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

            let products =
                JSON.parse(
                    localStorage.getItem("products")
                ) || [];





            // Add new product
            // const editId =
            //     document.querySelector("#edit-product-id").value;



            if (editId) {


                const index =
                    products.findIndex(
                        p => p.id == editId
                    );


                products[index] = product;


            }
            else {


                products.push(product);


            }




            // Save

            localStorage.setItem(

                "products",

                JSON.stringify(products)

            );
            renderProducts();




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



function renderProducts() {


    const products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];



    const emptyMessage =
        document.querySelector(".empty-products");



    if (products.length === 0) {

        emptyMessage.style.display =
            "block";

        return;

    }



    emptyMessage.style.display =
        "none";




    // remove old rows

    document
        .querySelectorAll(".product-row")
        .forEach(row => row.remove());





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
    function (e) {

        if (!e.target.closest(".delete-btn")) return;

        const row =
            e.target.closest(".product-row");

        const name =
            row.children[1].textContent.trim();

        const products =
            JSON.parse(
                localStorage.getItem("products")
            ) || [];

        const product =
            products.find(
                p => p.name === name
            );

        if (!product) return;

        deleteProductId = product.id;

        deleteMessage.textContent =
            `Are you sure you want to delete "${product.name}"?`;

        deleteModal.classList.add("active");

    }
);
cancelDelete.addEventListener(
    "click",
    () => {

        deleteModal.classList.remove("active");

        deleteProductId = null;

    }
);


confirmDelete.addEventListener(
    "click",
    () => {

        let products =
            JSON.parse(
                localStorage.getItem("products")
            ) || [];

        products =
            products.filter(
                product => product.id != deleteProductId
            );

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        renderProducts();

        showToast("Product deleted successfully!");

        deleteModal.classList.remove("active");

        deleteProductId = null;

    }
);
// ==========================================
// EDIT PRODUCT
// ==========================================


document.addEventListener(
    "click",
    function (e) {


        if (
            e.target.classList.contains(
                "edit-btn"
            )
        ) {


            const row =
                e.target.closest(".product-row");



            const name =
                row.children[1]
                    .textContent
                    .trim();



            const products =
                JSON.parse(
                    localStorage.getItem("products")
                ) || [];



            const product =
                products.find(
                    p => p.name === name
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
if(searchInput){

    searchInput.addEventListener(
        "input",
        renderProducts
    );

}


renderProducts();