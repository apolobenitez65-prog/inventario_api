
const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const path = require('path');

// Cargar el contrato Protobuf
const def = loader.loadSync(
    path.join(__dirname, 'producto.proto')
);

const api = grpc.loadPackageDefinition(def).inventario;

// Conectar con el servidor gRPC
const client = new api.ProductoService(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure()
);

// Solicitar el producto con ID 1
client.ObtenerProducto({ id: 1 }, (err, producto) => {
    if (err) {
        console.error('Error gRPC:', err.message);
    } else {
        console.log('Producto recibido:', producto);
    }

    client.close();
});
