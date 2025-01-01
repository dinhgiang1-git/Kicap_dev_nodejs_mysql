document.addEventListener("DOMContentLoaded", () => {
    const quantitySpan = document.querySelector(".quantity");
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.querySelector(".d-flex.border-top .fw-bold.mb-0:last-child");
    const cartLink = document.querySelector('[data-bs-target="#cartModal"]');

    // Định dạng giá tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0 }).format(price) + 'đ';
    };

    // Lấy giỏ hàng từ localStorage
    const getCartFromLocalStorage = () => {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    };

    // Lưu giỏ hàng vào localStorage
    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Cập nhật tổng số lượng sản phẩm hiển thị
    const updateQuantity = () => {
        const cart = getCartFromLocalStorage();
        const uniqueProductCount = cart.length; // Số lượng sản phẩm khác nhau trong giỏ hàng
        quantitySpan.textContent = uniqueProductCount;
    };

    // Cập nhật tổng giá trị sản phẩm hiển thị
    const updateTotalPrice = () => {
        const cart = getCartFromLocalStorage();
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = formatPrice(totalPrice);
    };

    // Hiển thị danh sách sản phẩm trong giỏ hàng
    const renderCartItems = () => {
        const cart = getCartFromLocalStorage();
        cartItemsContainer.innerHTML = ""; // Xóa nội dung cũ

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="text-center">Giỏ hàng của bạn đang trống.</p>`;
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item", "d-flex", "align-items-center", "mb-3");

            // Ảnh sản phẩm
            const image = document.createElement("img");
            image.src = item.image;
            image.alt = item.name;
            image.classList.add("img-thumbnail", "me-3");
            image.style.width = "80px";
            image.style.height = "80px";

            // Thông tin sản phẩm
            const cartDetails = document.createElement("div");
            cartDetails.classList.add("cart-details", "flex-grow-1");

            const name = document.createElement("p");
            name.classList.add("mb-1");
            name.textContent = item.name;

            const price = document.createElement("p");
            price.classList.add("mb-1", "text-muted");
            price.textContent = formatPrice(item.price);

            const quantityContainer = document.createElement("div");
            quantityContainer.classList.add("d-flex", "align-items-center");

            // Nút giảm số lượng
            const decreaseButton = document.createElement("button");
            decreaseButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "me-2");
            decreaseButton.textContent = "-";
            decreaseButton.onclick = () => {
                decreaseQuantity(item.id);
            };

            // Hiển thị số lượng
            const quantity = document.createElement("span");
            quantity.textContent = item.quantity;

            // Nút tăng số lượng
            const increaseButton = document.createElement("button");
            increaseButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "ms-2");
            increaseButton.textContent = "+";
            increaseButton.onclick = () => {
                increaseQuantity(item.id);
            };

            // Nút xóa sản phẩm
            const removeButton = document.createElement("button");
            removeButton.classList.add("btn", "btn-sm", "btn-danger", "ms-3");
            removeButton.textContent = "Xóa";
            removeButton.onclick = () => {
                removeItem(item.id);
            };

            // Gắn các thành phần vào container
            quantityContainer.appendChild(decreaseButton);
            quantityContainer.appendChild(quantity);
            quantityContainer.appendChild(increaseButton);

            cartDetails.appendChild(name);
            cartDetails.appendChild(price);
            cartDetails.appendChild(quantityContainer);

            cartItem.appendChild(image);
            cartItem.appendChild(cartDetails);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);
        });
    };

    // Hàm giảm số lượng sản phẩm
    const decreaseQuantity = (id) => {
        const cart = getCartFromLocalStorage();
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            saveCartToLocalStorage(cart);
            renderCartItems();
            updateQuantity();
            updateTotalPrice();
        }
    };

    // Hàm tăng số lượng sản phẩm
    const increaseQuantity = (id) => {
        const cart = getCartFromLocalStorage();
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
            saveCartToLocalStorage(cart);
            renderCartItems();
            updateQuantity();
            updateTotalPrice();
        }
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id) => {
        const cart = getCartFromLocalStorage().filter(item => item.id !== id);
        saveCartToLocalStorage(cart);
        renderCartItems();
        updateQuantity();
        updateTotalPrice();
    };

    const addToCart = (productId, productName, productPrice, productImg) => {
        const cart = getCartFromLocalStorage();
    
        // Kiểm tra nếu sản phẩm đã tồn tại
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: parseInt(productPrice, 10),
                image: productImg,
                quantity: 1,
            });
        }
    
        saveCartToLocalStorage(cart);
        renderCartItems();
        updateQuantity();
        updateTotalPrice();
    };

    // Hàm gắn sự kiện cho nút "THÊM VÀO GIỎ HÀNG"
    const attachAddToCartEvents = () => {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                console.log("Add to cart button clicked"); // Log khi nút được nhấn
                const productId = button.dataset.id;
                const productName = button.dataset.name;
                const productPrice = button.dataset.price.replace(/[^\d]/g, "");
                const productImg = button.dataset.img;

                console.log("Product ID:", productId); // Log ID sản phẩm
                console.log("Product Name:", productName); // Log tên sản phẩm
                console.log("Product Price:", productPrice); // Log giá sản phẩm
                console.log("Product Image:", productImg); // Log hình ảnh sản phẩm

                addToCart(productId, productName, productPrice, productImg);

                // Hiển thị thông báo Toast
                const toastElement = document.getElementById("cartToast");
                const toast = new bootstrap.Toast(toastElement, {
                    autohide: true,
                    delay: 3000,
                });
                toast.show();
            });
        });
    };

    // Gắn sự kiện khi trang được tải
    attachAddToCartEvents();

    // Gắn vào `window` để sử dụng ở các file khác
    window.attachAddToCartEvents = attachAddToCartEvents;

    // Lắng nghe sự kiện click vào nút "Giỏ hàng"
    cartLink.addEventListener("click", () => {
        renderCartItems();
        updateTotalPrice();
    });

    // Khởi tạo hiển thị khi tải trang
    updateQuantity();
    renderCartItems();
    updateTotalPrice();
});