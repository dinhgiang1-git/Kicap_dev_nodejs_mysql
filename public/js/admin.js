// Hàm lấy danh sách sản phẩm
const fetchProducts = async () => {
    try {
        const response = await fetch('/admin/get-all');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        const productTable = document.getElementById("productTable");
        productTable.innerHTML = ''; // Xóa dữ liệu cũ trước khi render mới

        // Trong hàm fetchProducts
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.setAttribute("data-id", product.id); // Thêm data-id để xác định sản phẩm
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString("vi-VN")} đ</td>
                <td>${product.old_price.toLocaleString("vi-VN")} đ</td>
                <td><img src="${product.img}" alt="${product.name}" width="50"></td>
                <td>${product.slug}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            `;
            productTable.appendChild(row);
        });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
};

// Hàm thêm sản phẩm
const addProduct = async () => {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const oldPrice = document.getElementById("productOldPrice").value;
    const img = document.getElementById("productImage").value;
    const slug = document.getElementById("productSlug").value;

    try {
        const response = await fetch('/admin/add-keycap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                old_price: oldPrice,
                img,
                slug,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        showToast("Thêm sản phẩm thành công!", 'success');
        fetchProducts();
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
    }
};

// Hàm xóa sản phẩm
const deleteProduct = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
        const response = await fetch(`/admin/delete-keycap/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        showToast("Thêm sản phẩm thành công!", 'success');
        fetchProducts(); // Cập nhật lại danh sách sản phẩm
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
    }
};

// Hàm hiển thị modal sửa sản phẩm
const editProduct = (id) => {
    // Lấy thông tin sản phẩm hiện tại từ bảng
    const productRow = document.querySelector(`#productTable tr[data-id="${id}"]`); // Sử dụng data-id để tìm đúng hàng
    if (!productRow) {
        console.error("Không tìm thấy sản phẩm");
        return;
    }

    const productId = id; // Lưu ID sản phẩm
    const productName = productRow.children[1].innerText;
    const productPrice = productRow.children[2].innerText.replace(/\D/g, '');
    const productOldPrice = productRow.children[3].innerText.replace(/\D/g, '');
    const productImage = productRow.children[4].querySelector("img").src;
    const productSlug = productRow.children[5].innerText;

    // Điền thông tin vào form trong modal
    document.getElementById("editProductId").value = productId;
    document.getElementById("editProductName").value = productName;
    document.getElementById("editProductPrice").value = productPrice;
    document.getElementById("editProductOldPrice").value = productOldPrice;
    document.getElementById("editProductImage").value = productImage;
    document.getElementById("editProductSlug").value = productSlug;

    // Hiển thị modal
    const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    editModal.show();
};

// Hàm cập nhật sản phẩm
const updateProduct = async (id, name, price, oldPrice, img, slug) => {
    try {
        const response = await fetch('/admin/update-keycap', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                name,
                price,
                old_price: oldPrice,
                img,
                slug,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        showToast("Cập nhật sản phẩm thành công!", 'success');
        fetchProducts(); // Cập nhật lại danh sách sản phẩm
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        showToast(`Đã xảy ra lỗi: ${error.message}`, 'error');
    }
};


// Hàm lưu thay đổi sản phẩm
const saveProductChanges = async () => {
    const id = document.getElementById("editProductId").value;
    const name = document.getElementById("editProductName").value;
    const price = document.getElementById("editProductPrice").value;
    const oldPrice = document.getElementById("editProductOldPrice").value;
    const img = document.getElementById("editProductImage").value;
    const slug = document.getElementById("editProductSlug").value;

    if (!name || !price || !oldPrice || !img || !slug) {
        showToast("Thông tin không được để trống!", 'warning');
        return;
    }

    await updateProduct(id, name, price, oldPrice, img, slug);

    // Đóng modal sau khi lưu
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
    editModal.hide();
};

// Gọi hàm khi tải trang
document.addEventListener("DOMContentLoaded", fetchProducts);

// Thêm sự kiện cho nút thêm sản phẩm
document.getElementById("addProductForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    addProduct();
});

// Hàm hiển thị toast message
const showToast = (message, type = 'info') => {
    const toastBody = document.getElementById('toastBody');
    const toastMessage = document.getElementById('toastMessage');

    // Đặt nội dung thông báo
    toastBody.textContent = message;

    // Thêm màu sắc tùy theo loại thông báo
    toastMessage.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    switch (type) {
        case 'success':
            toastMessage.classList.add('bg-success', 'text-white');
            break;
        case 'error':
            toastMessage.classList.add('bg-danger', 'text-white');
            break;
        case 'warning':
            toastMessage.classList.add('bg-warning', 'text-dark');
            break;
        default:
            toastMessage.classList.add('bg-info', 'text-white');
    }

    // Hiển thị toast
    const toast = new bootstrap.Toast(toastMessage, {
        autohide: true, // Tự động ẩn
        delay: 2000,    // Thời gian ẩn sau 2 giây
    });
    toast.show();
};
