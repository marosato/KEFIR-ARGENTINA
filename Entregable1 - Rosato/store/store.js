// Constantes
// const CART_LIMIT = 10;
const DISCOUNT_PERCENTAGE = 10;

// Productos
const products = [
    {
        id: 1,
        name: "Frasco de Vidrio Mason 1L",
        price: 2500,
        description: "Frasco de vidrio estilo Mason con tapa hermética, ideal para fermentar kéfir.",
        capacity: "1L",
        image: "https://ambient21.com/cdn/shop/products/2415-2146_1.jpg?v=1749064372",
        stock: 10
    },
        {
        id: 2,
        name: "Frasco de Vidrio 1.5L",
        price: 3000,
        description: "Frasco de vidrio grande con tapa hermética, perfecto para fermentaciones más grandes.",
        capacity: "1.5L",
        image: "https://www.starplastic.com.ar/wp-content/uploads/2019/01/Fco-3050cc-10-Cuadrado-Presion.jpeg",
        stock: 8
    },
    {
        id: 3,
        name: "Frasco de Vidrio 2L",
        price: 3500,
        description: "Frasco de vidrio extra grande con tapa a rosca, ideal para familias o grupos.",
        capacity: "2L",
        image: "https://http2.mlstatic.com/D_Q_NP_605934-MLA86036042761_062025-O.webp",
        stock: 5
    },
    {
        id: 4,
        name: "Frasco Cuadrado 750ml",
        price: 2000,
        description: "Frasco cuadrado con tapa a rosca, perfecto para kéfir de agua.",
        capacity: "750ml",
        image: "https://f.fcdn.app/imgs/e94c49/www.elclon.com.uy/clonuy/df7d/original/catalogo/800045-1/1920-1200/frasco-vidrio-cuadrado-tapa-metal-plastico-frasco-vidrio-cuadrado-tapa-metal-plastico.jpg",
        stock: 15
    },
    {
        id: 5,
        name: "Frasco de Vidrio 500ml",
        price: 1500,
        description: "Frasco de vidrio con tapa metálica, ideal para porciones individuales de kéfir.",
        capacity: "500ml",
        image: "https://devotouy.vtexassets.com/arquivos/ids/1493277-800-450?v=638619218013400000&width=800&height=450&aspect=true",
        stock: 20
    },
    {
        id: 6,
        name: "Frasco de Vidrio 250ml",
        price: 1000,
        description: "Frasco de vidrio con tapa a rosca, ideal para pequeñas porciones de kéfir.",
        capacity: "250ml",
        image: "https://image.made-in-china.com/202f0j00AgbcyPHIMoqO/Wholesale-250ml-Round-Glass-Bottles-Food-Glass-Jars-with-Black-Metal-Lid-for-Honey-Candy-Packaging.webp",
        stock: 25
    }
];

// Estado global
let cart = [];
let totalOrders = 0;

function getField(prompt, validator, errorMessage) {
    let value;
    do {
        value = window.prompt(prompt);
        if (value === null) throw new Error('Operación cancelada.'); // Usuario presionó Cancelar
        if (validator(value)) break;
        alert(errorMessage);
    } while (true);
    return value;
}

// Utilidades
const logEvent = (message, type = 'info') => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
const showNotification = (message, _type = 'success') => alert(message);

// Funciones del carrito
function updateCartBadge() {
    document.getElementById('cartBadge').textContent = cart.length;
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let total = 0;

    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">&times;</button>
            </div>`;
    }).join('');

    cartTotal.textContent = total;
}

// Agregar y eliminar productos del carrito

function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) throw new Error('Producto no encontrado.');
        if (product.stock <= 0) throw new Error('Producto sin stock disponible.');
        // if (cart.length >= CART_LIMIT) throw new Error(`No puede agregar más de ${CART_LIMIT} productos al carrito.`);

        cart.push({ id: product.id, name: product.name, price: product.price });
        product.stock--;
        updateCartBadge();
        updateCartModal();
        loadProducts();
        logEvent(`Producto agregado al carrito: ${product.name}`);
        showNotification('Producto agregado al carrito.');
    } catch (error) {
        showNotification(error.message, 'error');
        logEvent(error.message, 'error');
    }
}

function removeFromCart(index) {
    try {
        if (index < 0 || index >= cart.length) throw new Error('Índice de producto inválido.');
        const productInCart = cart[index];
        const product = products.find(p => p.id === productInCart.id);
        if (product) product.stock++;
        cart.splice(index, 1);
        updateCartBadge();
        updateCartModal();
        loadProducts();
        logEvent(`Producto removido del carrito: ${productInCart.name}`);
        showNotification('Producto removido del carrito.');
    }
    catch (error) {
        showNotification(error.message, 'error');
        logEvent(error.message, 'error');
    }
}

// Proceso de compra

function getCustomerInfo() {
    try {
        const customer = {};

        // Validar nombre
        while (true) {
            try {
                customer.name = getField(
                    "Ingrese su nombre:",
                    name => name.length >= 2,
                    "El nombre debe tener al menos 2 caracteres."
                );
                break;
            } catch (error) {
                if (error.message === 'Operación cancelada.') throw error;
            }
        }

        // Validar email
        while (true) {
            try {
                customer.email = getField(
                    "Ingrese su email:",
                    validateEmail,
                    "Email inválido. Debe ser con formato: ejemplo@dominio.com"
                );
                break;
            } catch (error) {
                if (error.message === 'Operación cancelada.') throw error;
            }
        }

        // Validar teléfono
        while (true) {
            try {
                customer.phone = getField(
                    "Ingrese su teléfono:",
                    validatePhone,
                    "Teléfono inválido. Debe tener 10 dígitos."
                );
                break;
            } catch (error) {
                if (error.message === 'Operación cancelada.') throw error;
            }
        }

        return customer;

    } catch (error) {
        throw new Error(error.message);
    }
}

// Calcular total con posible descuento

function calculateTotal(subtotal) {
    let discount = 0;
    if (confirm(`¿Desea aplicar el descuento del ${DISCOUNT_PERCENTAGE}%?`)) {
        discount = subtotal * 0.10;
    }
    return { subtotal, discount, total: subtotal - discount };
}

function generateOrderSummary(customer, totals) {
    return `
        Resumen de su compra:
        ------------------------
        Cliente: ${customer.name}
        Email: ${customer.email}
        Teléfono: ${customer.phone}
        ------------------------
        Productos:
        ${cart.map(item => `- ${item.name}: $${item.price}`).join('\n')}
        ------------------------
        Subtotal: $${totals.subtotal}
        Descuento: $${totals.discount}
        Total Final: $${totals.total}
    `;
}

function checkout() {
    try {
        if (cart.length === 0) throw new Error('El carrito está vacío.');

        const customer = getCustomerInfo();
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const totals = calculateTotal(subtotal);
        const orderSummary = generateOrderSummary(customer, totals);

        if (confirm(orderSummary)) {
            totalOrders++;
            cart = [];
            updateCartBadge();
            updateCartModal();
            const modalElement = document.getElementById('cartModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();

            logEvent(`Compra #${totalOrders} completada por ${customer.name}`);
            showNotification('¡Gracias por su compra!');
        }
    } catch (error) {
        showNotification(error.message, 'error');
        logEvent(error.message, 'error');
    }
}

// Renderizado de productos
function loadProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) {
        logEvent('No se encontró el elemento product-list', 'error');
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="col">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">
                        ${product.name}
                    </h5>
                    <p class="card-text">
                        ${product.description}
                    </p>
                    <p class="card-text">
                        <strong>Capacidad:</strong> ${product.capacity}
                    </p>
                    <p class="card-text">
                        <strong>Precio:</strong> $${product.price}
                        <br>
                        <small>Stock disponible: ${product.stock}</small>
                    </p>
                    <button class="btn btn-primary ${product.stock === 0 ? 'disabled' : ''}" 
                            onclick="addToCart(${product.id})">
                        ${product.stock === 0 ? 'Sin Stock' : 'Comprar'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    logEvent('Aplicación iniciada');
});

document.getElementById('checkoutButton').addEventListener('click', checkout);
document.getElementById('clearCartButton').addEventListener('click', () => {
    if (confirm('¿Confirma que desea vaciar el carrito?')) {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) product.stock++;
        });
        cart = [];
        updateCartBadge();
        updateCartModal();
        loadProducts();
        logEvent('Carrito vaciado.');
    }
});
