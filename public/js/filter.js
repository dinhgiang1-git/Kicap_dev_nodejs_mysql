document.addEventListener("DOMContentLoaded", () => {
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    const searchInput = document.querySelector('input[placeholder="Từ khóa ..."]');
    const resetFiltersButton = document.getElementById("reset-filters");
    const productGrid = document.querySelector(".product-grid");

    // Cập nhật danh sách sản phẩm
    const updateProductGrid = (products) => {
        productGrid.innerHTML = "";
        if (products.length === 0) {
            productGrid.innerHTML = "<p>Không có sản phẩm nào phù hợp.</p>";
            return;
        }
        products.forEach((product) => {
            productGrid.innerHTML += `
                <div class="product-card">
                    <a href="/keycaps/${product.id}">
                        <img src="${product.img}" alt="${product.name}">
                    </a>
                    <div class="product-info">
                        <p class="product-title">KEYCAP BỘ</p>
                        <a href="/keycaps/${product.id}" style="text-decoration: none;">
                            <p class="product-name">${product.name}</p>
                        </a>
                        <p class="product-price">
                            ${product.price} <span class="old-price">${product.old_price || ""}</span>
                        </p>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}" data-price="${product.price}" data-name="${product.name}" data-img="${product.img}">THÊM VÀO GIỎ HÀNG</button>
                </div>
            `;
        });

        // Gọi lại sự kiện "add-to-cart"
        if (typeof attachAddToCartEvents === "function") {
            attachAddToCartEvents(); // Hàm từ add-to-cart.js
        }
    };

    // Xử lý tìm kiếm
    const handleSearch = (query) => {
        fetch(`http://localhost:3000/keycaps/list/search?search=${query}`)
            .then((response) => response.json())
            .then((data) => updateProductGrid(data))
            .catch((err) => console.error("Error searching products:", err));
    };

    const loadInitialProducts = () => {
        fetch(`http://localhost:3000/keycaps/list`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => updateProductGrid(data))
            .catch((err) => {
                console.error("Error loading initial products:", err);
                productGrid.innerHTML = "<p>Đã xảy ra lỗi khi tải sản phẩm.</p>";
            });
    };

    // Xử lý sắp xếp
    const handleSort = (sortValue) => {
        fetch(`http://localhost:3000/keycaps/list/filter?sort=${sortValue}`)
            .then((response) => response.json())
            .then((data) => updateProductGrid(data))
            .catch((err) => console.error("Error fetching filtered products:", err));
    };

    // Lắng nghe sự kiện tìm kiếm
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.trim();
        if (searchQuery.length > 0) {
            handleSearch(searchQuery);
        } else {
            loadInitialProducts();
        }
    });

    // Lắng nghe sự kiện sắp xếp
    sortRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            const sortValue = radio.value;
            handleSort(sortValue);
        });
    });

    // Lắng nghe sự kiện đặt lại bộ lọc
    resetFiltersButton.addEventListener("click", () => {
        searchInput.value = ""; // Đặt lại giá trị tìm kiếm
        sortRadios.forEach((radio) => (radio.checked = false)); // Bỏ chọn tất cả các radio button
        loadInitialProducts(); // Tải lại danh sách sản phẩm ban đầu
    });

    // Tải sản phẩm ban đầu khi trang được tải
    loadInitialProducts();
});